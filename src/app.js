const express = require("express");
const sequelize = require("./database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const app = express();


const profilesRouter = require("./routes/profiles");
const technologiesRouter = require("./routes/technologies");
const projectsRouter = require("./routes/projects");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/profiles", profilesRouter);
app.use("/api/technologies", technologiesRouter);
app.use("/api/projects", projectsRouter);

app.get("/", (req, res) => {
  res.send("API DevShowcase rodando!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON inválido" });
  }
  if (err.name === "ValidationError" || err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Dados inválidos", details: err.errors.map(error => error.message) });
  }

  const status = err.statusCode || 500;
  return res.status(status).json({
    error: status === 500 ? "Erro interno do servidor" : err.message,
    ...(err.details?.length ? { details: err.details } : {})
  });
});

async function start() {
  try {
    await sequelize.authenticate();
      require("./models");
    await sequelize.sync({ alter: true });
    console.log("Banco conectado e modelos sincronizados");

    app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Não foi possível iniciar a API:", error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) start();

module.exports = { app, start };

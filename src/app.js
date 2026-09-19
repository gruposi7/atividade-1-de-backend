const express = require("express");
const sequelize = require("./database");
const app = express();


const profilesRouter = require("./routes/profiles");
const technologiesRouter = require("./routes/technologies");
const projectsRouter = require("./routes/projects");

app.use(express.json());


app.use("/api/profiles", profilesRouter);
app.use("/api/technologies", technologiesRouter);
app.use("/api/projects", projectsRouter);

app.get("/", (req, res) => {
  res.send("API DevShowcase rodando!");
});

async function start() {
  try {
    await sequelize.authenticate();
      require("./models");
    await sequelize.sync({ alter: true });
    console.log("Banco conectado e modelos sincronizados");

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Não foi possível iniciar a API:", error.message);
    process.exitCode = 1;
  }
}

start();

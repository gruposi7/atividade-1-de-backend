const sequelize = require("./database");

sequelize.authenticate()
  .then(() => console.log("Conexão com Supabase/Postgres OK"))
  .catch(err => console.error("Erro ao conectar:", err));

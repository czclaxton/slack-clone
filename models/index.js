require("dotenv").config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("slack", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const models = {
  user: sequelize.import("./users"),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

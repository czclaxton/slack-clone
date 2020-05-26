import Sequelize from "sequelize";

const sequelize = new Sequelize(
  // process.env.DB_LOCAL,
  // process.env.DB_LOCAL_USER,
  // process.env.DB_LOCAL_PASSWORD,
  "postgres://postgres:husqvt352@localhost/postgres",
  {
    // host: process.env.DB_LOCAL_HOST,
    dialect: "postgres",
  }
);

const models = {
  User: sequelize.import("./user"),
  Channel: sequelize.import("./channel"),
  Message: sequelize.import("./message"),
  Team: sequelize.import("./team"),
};

// connect foreign keys
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

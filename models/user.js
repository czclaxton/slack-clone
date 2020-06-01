export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Username can only contain letters and numbers",
        },
        len: {
          args: [3, 25],
          msg: "Username must be between 3 and 25 characters in length",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [8, 100],
          msg: "Invalid Email",
        },
      },
    },
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: {
        name: "userId",
        field: "user_id",
      },
    });
    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: {
        name: "userId",
        field: "user_id",
      },
    });
  };

  return User;
};

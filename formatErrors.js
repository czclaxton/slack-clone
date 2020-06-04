import _ from "lodash";

export default (err, models) => {
  if (err instanceof models.Sequelize.ValidationError) {
    return err.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: "Something went wrong" }];
};

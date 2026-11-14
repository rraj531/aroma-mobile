const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

async function migrate() {
  try {
    await sequelize.authenticate();
    const queryInterface = sequelize.getQueryInterface();
    const columns = await queryInterface.describeTable("Users");

    if (!columns.mobile) {
      throw new Error("Users.mobile column was not found");
    }

    if (columns.mobile.allowNull) {
      console.log("Users.mobile is already nullable.");
      return;
    }

    await queryInterface.changeColumn("Users", "mobile", {
      type: DataTypes.STRING(15),
      allowNull: true,
    });
    console.log("Updated Users.mobile to allow NULL values.");
  } finally {
    await sequelize.close();
  }
}

migrate().catch((error) => {
  console.error("Unable to update Users.mobile:", error.message);
  process.exitCode = 1;
});

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const { User, sequelize } = require("./models");

async function createAdmin() {
  try {
    await sequelize.authenticate();

    const email = "admin@aroma.com";
    const existingAdmin = await User.findOne({ where: { email } });

    if (existingAdmin) {
      console.log("Admin account already exists; no changes made.");
      return;
    }

    await User.create({
      name: "Aroma Admin",
      email,
      password: "Admin@1234",
      role: "admin",
    });

    console.log("Admin account created successfully.");
  } finally {
    await sequelize.close();
  }
}

createAdmin().catch((error) => {
  console.error("Unable to create admin account:", error.message);
  process.exitCode = 1;
});

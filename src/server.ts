import app from "./app.js";
import { prisma } from "./utils/prisma.js";


const PORT = 5000;

async function main() {
  try {
    await prisma.$connect();

    console.log("Database connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });

  } catch (error) {
    console.log("Database connection failed ❌", error);
    process.exit(1);
  }
}

main();
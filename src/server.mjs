import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Lỗi khi chạy server:", error.message);
    process.exit(1);
  }
};

startServer();

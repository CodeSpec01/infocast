import express from "express";
// import { userRouter } from "./routes/user.routes.js";
import { connectDB } from "./utils/connectDB.utils.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import { Esp } from "./models/esp.model.js";
// import { profileRouter } from "./routes/profile.routes.js";
// import cookieParser from "cookie-parser";

configDotenv({
  path: "./.env",
});

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", userRouter);
// app.use("/profile", profileRouter);
app.post("/register", async (req, res) => {
  try {
    onsole.log("Registering ESP...");
    const { espId, espPassword, espIp } = req.body;

    if (!espId && !espPassword && !espIp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const esp = await Esp.findOne({ espId });

    if (esp) {
      esp.espIp = espIp;
      await esp.save();
      return res.status(200).json({ message: "ESP updated successfully" });
    }

    const newEsp = new Esp({
      espId,
      espPassword,
      espIp,
    });
    await newEsp.save();
    return res.status(201).json({ message: "ESP registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

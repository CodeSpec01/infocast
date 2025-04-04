import { connectDB } from "../utils/connectDB.utils.js";
import { Esp } from "../models/esp.model.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectDB();

  try {
    console.log("Registering ESP...");
    const { espId, espPassword, espIp } = req.body;

    if (!espId || !espPassword || !espIp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const esp = await Esp.findOne({ espId });

    if (esp) {
      esp.espIp = espIp;
      await esp.save();
      return res.status(200).json({ message: "ESP updated successfully" });
    }

    const newEsp = new Esp({ espId, espPassword, espIp });
    await newEsp.save();

    return res.status(201).json({ message: "ESP registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

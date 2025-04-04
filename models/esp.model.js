import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const espSchema = new mongoose.Schema(
  {
    espId: {
      type: String,
      required: true,
      unique: true,
    },
    espPassword: {
      type: String,
      required: true,
    },
    espIp: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// espSchema.pre("save", async function (next) {
//   if (!this.isModified("espPassword")) return next();

//   const salt = process.env.SALT;

//   this.espPassword = await bcrypt.hash(salt + this.password, 10);
//   next();
// });

// espSchema.methods.ispasswordcorrect = async function (password) {
//   const salt = process.env.SALT;

//   const result = await bcrypt.compare(salt + password, this.espPassword);
//   return result;
// };

// espSchema.methods.generateToken = async function () {
//   return jwt.sign(
//     {
//       espId: this.espIP,
//       espPassword: this.espPassword,
//       espIp: this.espIP,
//     },
//     process.env.TOKEN_SECRET,
//     {
//       expiresIn: process.env.TOKEN_EXPIRY,
//     }
//   );
// };

const Esp = mongoose.models.esp || mongoose.model("esp", espSchema);

export { Esp };

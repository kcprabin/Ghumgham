import { UserType } from "../Schema/user.schema.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String,  unique: true },
    Username: { type: String, required: true, unique: true ,index: true},
    password: { type: String, required: true },
    Name: { type: String, required: true },

  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateJWT = function () {
  const payload = { id: this._id, email: this.email };
  const secret: string = process.env.JWT_SECRET as string;
  const data = process.env.JWT_EXPIRES_IN as string;

  return jwt.sign(payload, secret, { expiresIn: "1D" });
};

// problem of ts cannnolt give expires in as process.env.JWT_EXPIRES_IN as string so we have to hardcode it here
//

export const UserModel = mongoose.model<UserType>("User", UserSchema);

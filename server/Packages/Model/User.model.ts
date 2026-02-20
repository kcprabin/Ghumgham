import { UserType } from "@packages/Schema/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateJWT(): string;
}

// Create model type
type UserModel = mongoose.Model<UserType, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserType, UserModel, UserMethods>(
  {
    email: { type: String, unique: true },
    Username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: false },
    Name: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin", "hotelOwner", "editor"],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  // Skip hashing for OAuth users
  if (this.password === "oauth_google_user") {
    return;
  }

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
  // OAuth users cannot login with password
  if (this.password === "oauth_google_user") {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateJWT = function () {
  const payload = { id: this._id, email: this.email, role: this.role };
  const secret: string = process.env.JWT_SECRET as string;
  const data = process.env.JWT_EXPIRES_IN as string;

  return jwt.sign(payload, secret, { expiresIn: "1D" });
};

// problem of ts cannnolt give expires in as process.env.JWT_EXPIRES_IN as string so we have to hardcode it here

export const UserModel = mongoose.model<UserType, UserModel>(
  "User",
  UserSchema,
);

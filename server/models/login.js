import { Schema, model } from "mongoose";

const LoginSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const NoteModel = model("Login", LoginSchema, "users");

module.exports = NoteModel;

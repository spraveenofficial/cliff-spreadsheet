import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
      },
    }
  }
);

// Checker to check the username does not contain any special characters
AuthSchema.pre("save", async function (next) {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(this.username)) {
    return next(new Error("Username should not contain any special characters"));
  }
  next();
})

// Ecrypt Password
AuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match Password
AuthSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("Authentication", AuthSchema);

export default UserModel;

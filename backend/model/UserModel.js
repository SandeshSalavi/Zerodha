const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      sparse: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false, // Don't return password by default
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

// ✅ Hash password before saving
UserSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// ✅ Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// ✅ Get user without sensitive data
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = model("User", UserSchema);

module.exports = { UserModel };

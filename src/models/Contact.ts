import mongoose, { Document, Schema } from "mongoose";

export interface IContactDocument extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  needsNDA: "yes" | "no";
  marketingConsent: boolean;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    needsNDA: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },

    marketingConsent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IContactDocument>(
  "Contact",
  ContactSchema
);
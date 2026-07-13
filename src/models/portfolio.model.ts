import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  client: string;
  industry: string;
  image: string;
  images: string[];
  technologies: string[];
  features: string[];
  category: string;
  completedAt: Date;
  serviceId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required']
    },
    client: {
      type: String,
      required: [true, 'Client name is required']
    },
    industry: {
      type: String,
      required: [true, 'Industry is required']
    },
    image: {
      type: String,
      default: ''
    },
    images: [{
      type: String
    }],
    technologies: [{
      type: String
    }],
    features: [{
      type: String
    }],
    category: {
      type: String,
      default: 'Web App'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    serviceId: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);

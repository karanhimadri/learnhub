import mongoose, { Schema, Document, models, Types } from "mongoose";

export interface ICourse extends Document {
  title: string;
  instructor: Types.ObjectId;
  skills: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;

  price: number; // 0 = Free
  isPublic: boolean;

  rating: number;
  ratingCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 120,
    },

    instructor: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
      default: "Beginner",
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0, // 0 = Free
    },

    isPublic: {
      type: Boolean,
      default: false, // Admin / Instructor must publish
      index: true,
    },

    rating: {
      type: Number,
      default: 4.7,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

CourseSchema.index({ isPublic: 1, category: 1 });
CourseSchema.index({ rating: -1 });
CourseSchema.index({ price: 1 });

export default models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);

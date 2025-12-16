import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  enrolledAt: Date;
  isComplete: boolean;
  isActive: boolean;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.models.Enrollment ||
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);

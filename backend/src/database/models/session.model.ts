import mongoose, { Document, Schema } from "mongoose";
import { config } from "../../config/app.config";
import { thirtyDaysFromNow } from "../../common/utils/date-time";

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiredAt: Date;
  createdAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  userAgent: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
    // default: thirtyDaysFromNow,
    default: config.SESSION_EXPIRES_IN ? new Date(Date.now() + parseInt(config.SESSION_EXPIRES_IN)) : thirtyDaysFromNow(),
  },
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;

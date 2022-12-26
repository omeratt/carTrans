import moment from "moment";
import mongoose, { Schema, model, Document } from "mongoose";
export interface ContractType extends Document {
  _id?: string;
  name?: string;
  done?: boolean;
  expires?: Date;
  details?: string;
}
const ContractSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    expires: {
      type: Date,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetDate: {
      type: String,
      required: false,
      default: moment().format("DD/MM/YYYY"),
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pet ||
  mongoose.model("Contract", ContractSchema);

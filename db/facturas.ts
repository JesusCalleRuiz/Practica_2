import mongoose from "npm:mongoose@7.6.3";
import { Factura } from "../types.ts";

const Schema = mongoose.Schema;

const facturaSchema = new Schema(
  {
    client: { type: String, required: true,unique: true },
    products:[{ type: String, required: true }],
    total:{type: Number,required: false}
  },
  { timestamps: true }
);

export type facturaModelType = mongoose.Document & Omit<Factura, "id">;

export default mongoose.model<facturaModelType>("Factura", facturaSchema);
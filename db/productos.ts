import mongoose from "npm:mongoose@7.6.3";
import { Producto } from "../types.ts";

const Schema = mongoose.Schema;

const ProductoSchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: false},
    description: { type: String, required: false },
    price: { type: Number, required: true},
  },
  { timestamps: true }
);

export type productoModelType = mongoose.Document & Omit<Producto, "id">;

export default mongoose.model<productoModelType>("Producto", ProductoSchema);
import { Request, Response } from "npm:express@4.18.2";
import ProductModel from "../db/productos.ts";

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name,description, price } = req.body;
    const stock = req.body.stock || 0;
    if (!name || !price) {
      res.status(400).send("Name and price are required");
      return;
    }

    const newProduct = new ProductModel({ name, stock, description,price });
    await newProduct.save();

    res.status(200).send({
      name: newProduct.name,
      stock: newProduct.stock,
      description: newProduct.description,
      price: newProduct.price,
      id: newProduct._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addProduct;
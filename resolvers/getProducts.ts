import { Request, Response } from "npm:express@4.18.2";
import ProductModel from "../db/productos.ts";

const getPerson = async (req: Request, res: Response) => {
  try {
    
    const products = await ProductModel.find().exec();
    if (!products) {
      res.status(404).send("Product not found");
      return;
    }

    const productList = products.map((product) => ({
      name: product.name,
      stock: product.stock,
      description: product.description,
      price: product.price,
    }));

    res.status(200).send(productList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPerson;

import { Request, Response } from "npm:express@4.18.2";
import FacturaModel from "../db/facturas.ts";
import ClientModel from "../db/clientes.ts";
import ProductModel from "../db/productos.ts";

const calculateTotal = (products) => {
  let total = 0;
  products.forEach((product) => {
    if (typeof product.price === 'number' && !isNaN(product.price)) {
      total += product.price;
    }
  });
  return total;
};


const addInvoice = async (req: Request, res: Response) => {
  try {
    const { client, products} = req.body;

    if (!client || !products) {
      res.status(400).send("client and products are required");
      return;
    }

    const existingClient = await ClientModel.findById(client).exec();

    if (!existingClient) {
      return res.status(404).send("Client not found"); 
    }

    for (const product_id of products) {
      const existingProduct = await ProductModel.findById(product_id).exec();
      if (!existingProduct) {
        return res.status(404).send("Product not found");
      }
    }

    const total = calculateTotal(products);

    const newFactura = new FacturaModel({ client, products,total});
    await newFactura.save();

    res.status(200).send({
      client: newFactura.client,
      products: newFactura.products,
      total: newFactura.total,
      id: newFactura._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addInvoice;
import { Request, Response } from "npm:express@4.18.2";
import FacturaModel from "../db/facturas.ts";

const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await FacturaModel.findOne({ _id: id}).exec();
    if (!factura) {
      res.status(404).send("Invoice not found");
      return;
    }
    res.status(200).send({
      client: factura.client,
      products: factura.products,
      total: factura.total,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getInvoice;
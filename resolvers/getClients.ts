import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/clientes.ts";

const getClient = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.find().exec();
    if (!clients) {
      res.status(404).send("Client not found");
    return;
    }

    const productList = clients.map((client) => ({
      name: client.name,
      cif: client.cif,
    }));

    res.status(200).send(productList);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getClient;
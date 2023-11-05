import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/clientes.ts";

const addClient = async (req: Request, res: Response) => {
  try {
    const { name, cif } = req.body;
    if (!name || !cif) {
      res.status(400).send("Name and cif are required");
      return;
    }

    const newPerson = new ClientModel({ name, cif });
    await newPerson.save();

    res.status(200).send({
      name: newPerson.name,
      cif: newPerson.cif,
      id: newPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addClient;
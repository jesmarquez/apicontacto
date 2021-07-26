import express, {Request, Response} from "express";
import * as contactoModel from "../models/contacto";
import { Contacto, BasicContacto } from "../types/contacto";
const contactoRouter = express.Router();

contactoRouter.get("/", async (req: Request, res: Response) => {
    contactoModel.findAll((err: Error, contactos: Contacto[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": contactos});
  });
});

contactoRouter.post("/", async (req: Request, res: Response) => {
  const newContacto: Contacto = req.body;
  console.log(req.body);
  contactoModel.create(newContacto, (err: Error, contactoId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"contactoId": contactoId});
  });
});

export { contactoRouter };
import { Router } from "express";
import { methods as archivoROController } from "./../controller/archivoRO.controller";

const router = Router();

router.get("/", archivoROController.getArchivo);

export default router;

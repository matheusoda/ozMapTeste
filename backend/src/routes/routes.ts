import { Router } from "express";
import { userController } from "../controller/userController";
import { RegionController } from "../controller/regionController";

const router = Router();

// Rotas de usuarios
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Rotas de regioes
router.post("/regions", RegionController.createRegion);
router.get("/regions", RegionController.getRegions);
router.get("/regions/:id", RegionController.getRegionById);
router.put("/regions/:id", RegionController.updateRegion);
router.delete("/regions/:id", RegionController.deleteRegion);

export default router;

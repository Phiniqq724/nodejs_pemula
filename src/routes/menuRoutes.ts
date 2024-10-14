import express from "express";
import {
  createMenu,
  getMenu,
  getMenuID,
  updateMenu,
  deleteMenu,
  changePicture,
} from "../controllers/menuController";
import { verifyAddMenu, verifyEditMenu } from "../middlewares/verifyMenu";
import uploadFile from "../middlewares/verifyUpload";
import { verifyToken, verifyRole } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.get("/", [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getMenu);
app.get(
  "/:idMenu",
  [verifyToken, verifyRole(["MANAGER", "CASHIER"])],
  getMenuID
);
app.post(
  "/",
  [verifyAddMenu, verifyToken, verifyRole(["MANAGER"])],
  createMenu
);
app.put(
  "/:idMenu",
  [verifyEditMenu, verifyToken, verifyRole(["MANAGER"])],
  updateMenu
);
app.delete("/:idMenu", [verifyToken, verifyRole(["MANAGER"])], deleteMenu);
app.put(
  "/pic/:idMenu",
  [uploadFile.single("Picture"), verifyToken, verifyRole(["MANAGER"])],
  changePicture
);

export default app;

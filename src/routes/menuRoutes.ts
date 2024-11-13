import express from "express";
import {
  createMenu,
  getMenu,
  getMenuID,
  updateMenu,
  deleteMenu,
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
  [
    verifyToken,
    verifyRole(["MANAGER"]),
    uploadFile.single("picture"),
    verifyAddMenu,
  ],
  createMenu
);
app.put(
  "/:idMenu",
  [
    verifyToken,
    verifyRole(["MANAGER"]),
    uploadFile.single("picture"),
    verifyEditMenu,
  ],
  updateMenu
);
app.delete("/:idMenu", [verifyToken, verifyRole(["MANAGER"])], deleteMenu);

export default app;

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

const app = express();
app.use(express.json());

app.get("/", getMenu);
app.get("/:idMenu", getMenuID);
app.post("/", [verifyAddMenu], createMenu);
app.put("/:idMenu", [verifyEditMenu], updateMenu);
app.delete("/:idMenu", deleteMenu);
app.put("/pic/:idMenu", [uploadFile.single("Picture")], changePicture);

export default app;

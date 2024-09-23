import express from "express";
import {
  getMenuID,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController";
import { verifyAddMenu, verifyEditMenu } from "../middlewares/verifyMenu";

const app = express();
app.use(express.json());

app.get("/", getMenu);
app.get("/:idMenu", getMenuID);
app.post("/", [verifyAddMenu], createMenu);
app.put("/:idMenu", [verifyEditMenu], updateMenu);
app.delete("/:idMenu", deleteMenu);

export default app;

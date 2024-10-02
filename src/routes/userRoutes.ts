import express from "express";
import {
  getUser,
  getUserID,
  createUser,
  deleteUser,
  updateUser,
  profileUser,
  authentication as login,
} from "../controllers/userController";
import { verifyAddUser, verifyEditUser } from "../middlewares/verifyUser";
import uploadProfile from "../middlewares/verifyUploadProfile";
import { validateUser } from "../middlewares/validateUser";

const app = express();
app.use(express.json());

app.get("/", getUser);
app.get("/:idUser", getUserID);
app.post("/", [verifyAddUser], createUser);
app.put("/:idUser", [verifyEditUser], updateUser);
app.delete("/:idUser", deleteUser);
app.put("/profile/:idUser", [uploadProfile.single("Picture")], profileUser);
app.post("/login", [validateUser], login);

export default app;

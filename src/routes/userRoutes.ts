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
import { verifyToken, verifyRole } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.get("/", [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getUser);
app.get(
  "/:idUser",
  [verifyToken, verifyRole(["CASHIER", "MANAGER"])],
  getUserID
);
app.post(
  "/",
  [verifyAddUser, verifyToken, verifyRole(["MANAGER", "CASHIER"])],
  createUser
);
app.put(
  "/:idUser",
  [verifyEditUser, verifyToken, verifyRole(["MANAGER"])],
  updateUser
);
app.delete("/:idUser", [verifyToken, verifyRole(["MANAGER"])], deleteUser);
app.put(
  "/profile/:idUser",
  [uploadProfile.single("Picture"), verifyToken, verifyRole(["MANAGER"])],
  profileUser
);
app.post("/login", [validateUser], login);

export default app;

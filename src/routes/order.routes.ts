import express from "express";
import {
  getOrders,
  createOrder,
  statusOrder,
  deleteOrder,
} from "../controllers/orderController";
import { verifyAddOrder, verifyEditStatus } from "../middlewares/verifyOrder";
import { verifyRole, verifyToken } from "../middlewares/authorization";

const app = express();
app.use(express.json());
app.get(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getOrders);
app.post(
  `/`,
  [verifyToken, verifyRole(["CASHIER"]), verifyAddOrder],
  createOrder
);
app.put(
  `/:id`,
  [verifyToken, verifyRole(["CASHIER"]), verifyEditStatus],
  statusOrder
);
app.delete(`/:idOrder`, [verifyToken, verifyRole(["MANAGER"])], deleteOrder);

export default app;

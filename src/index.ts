import express from "express";
import cors from "cors";
import menuRoute from "./routes/menuRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/order.routes";
import { PORT } from "./global";

const app = express();
app.use(cors());

app.use("/menu", menuRoute);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

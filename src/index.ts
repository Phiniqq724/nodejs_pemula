import express from "express";
import cors from "cors";
import menuRoute from "./routes/menuRoutes";
import userRoutes from "./routes/userRoutes";
import { PORT } from "./global";

const app = express();
app.use(cors());

app.use("/menu", menuRoute);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

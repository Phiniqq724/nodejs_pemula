import express from "express";
import cors from "cors";
import menuRoute from "./routes/menuRoutes";

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.use("/menu", menuRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

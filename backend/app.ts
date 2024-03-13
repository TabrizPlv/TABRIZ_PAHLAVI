import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(cors());
routes(app);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

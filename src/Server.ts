import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

import Configuration from "./configuration/configuration";

// make the express app
const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

//Application requirements
app.use(helmet()); // security
app.use(morgan("common")); // looging

Configuration.connectToDatabase();
Configuration.connectToPort(app);

userRoutes.routes(app);

export default app;

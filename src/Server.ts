import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import bugRoutes from "./routes/bugRoutes";
import Configuration from "./configuration/configuration";
import commentRoutes from "./routes/commentRoutes";

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
projectRoutes.routes(app);
bugRoutes.routes(app);
commentRoutes.routes(app);

export default app;

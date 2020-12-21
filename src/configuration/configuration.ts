import moongose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async (): Promise<any> => {
  try {
    const DB_URL: any = process.env.DATABASE_URL;
    await moongose.connect(DB_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Successfully connected to the DB wohooo!!!!");
  } catch {
    (error: string) => {
      console.log("Error while try to connect to database", error);
      process.exit;
    };
  }
};

const connectToPort = (app: any) => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

export default {
  connectToDatabase,
  connectToPort,
};

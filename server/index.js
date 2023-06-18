import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";

/* DATA IMPORTS */
import { dataShipments } from './data/index.js';
import Shipments from "./models/Shipments.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("hit");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("here");
    /* ONLY ADD DATA ONE TIME */
    Shipments.insertMany(dataShipments);
  })
  .catch((error) => console.log(`${error} Did not connect`));
 

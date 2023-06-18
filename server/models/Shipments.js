import mongoose from "mongoose";

// Data columns : ID, Seller, Material, Amount, Unit, Date, Status

const ShipmentsSchema = new mongoose.Schema(
  {
    id: String,
    coordinates:[mongoose.Types.Decimal128],
    name: String,
    country_code: String
  },
  { timestamps: true }
);

const Shipments = mongoose.model("DummyShipments", ShipmentsSchema);
export default Shipments;

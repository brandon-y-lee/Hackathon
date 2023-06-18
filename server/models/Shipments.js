import mongoose from "mongoose";

// Data columns : ID, Seller, Material, Amount, Unit, Date, Status

const ShipmentsSchema = new mongoose.Schema(
  {
    id: String,
    // sellerName: String,
    // recipientName: String,
    name: String,
    material: String,
    amount: Number,
    unit: String,
    // products: {
    //   type: [mongoose.Types.ObjectId],
    //   of: Number,
    // },
    coordinates:[mongoose.Types.Decimal128],
    prev: [String],
    next: String,
    shipmentID: String
  },
  { timestamps: true }
);

const Shipments = mongoose.model("DummyShipments", ShipmentsSchema);
export default Shipments;

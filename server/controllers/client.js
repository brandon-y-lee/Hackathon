import Shipments from "../models/Shipments.js";


export const getTransactions = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
  
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const transactions = await Shipments.find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
      // const transactions = transactionsDummy;
  
  
      const total = await Shipments.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        transactions,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
export const getChainOfShipments = async (req, res) => {
try {
    const chainID = req.query;
    console.log("This is the place where chainID is printed");
    console.log(chainID);   

    const shipmentChain = await Shipments.find({
    $or: [
        { shipmentID: chainID.chainId },
        // { shipmentID: "Shipment1" },
    ],
    });
    // const transactions = transactionsDummy;

    console.log(shipmentChain);
    res.status(200).json({
    shipmentChain,
    });
} catch (error) {
    res.status(404).json({ message: error.message });
}
};
  
  
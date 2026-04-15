require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const {HoldingsModel}=require("./model/HoldingsModel");
const {PositionsModel}=require("./model/PositionsModel");
const {OrdersModel}= require("./model/Ordersmodel");
const bodyParser=require("body-parser");
const cors=require("cors");
const AuthRoutes = require("./routes/AuthRoutes");
const { authMiddleware } = require("./middleware/AuthMiddleware");


const PORT=process.env.PORT||3002;
const uri=process.env.MONGO_URL;



const app=express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Authentication Routes (Public)
app.use("/auth", AuthRoutes);

app.get("/allHoldings",async(req,res)=>{
    let allHoldings=await HoldingsModel.find({});
    res.json(allHoldings);
    
    
});
app.get("/allPositions",async(req,res)=>{
    let allPositions=await PositionsModel.find({});
    res.json(allPositions);
    
    
});

// ✅ Protected Routes (require authentication)
app.post("/newOrder", authMiddleware, async (req, res) => {
    try {
        if (!req.body.name || !req.body.qty || !req.body.price) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const qty = parseInt(req.body.qty);
        const price = parseFloat(req.body.price);

        if (isNaN(qty) || isNaN(price) || qty <= 0 || price <= 0) {
            return res.status(400).json({ error: "Invalid quantity or price" });
        }

        let newOrder = new OrdersModel({
            name: req.body.name,
            qty: qty,
            price: price,
            mode: req.body.mode,
        });
        await newOrder.save();
        console.log(`✓ Order saved: ${req.body.name} | Qty: ${qty} | Price: ${price}`);

        if (req.body.mode === "BUY") {
            let existingHolding = await HoldingsModel.findOne({ name: req.body.name });
            if (existingHolding) {
                existingHolding.qty += qty;
                existingHolding.price = price;
                await existingHolding.save();
                console.log(`✓ Holdings updated: ${req.body.name} | New Qty: ${existingHolding.qty}`);
            } else {
                let newHolding = new HoldingsModel({
                    name: req.body.name,
                    qty: qty,
                    price: price,
                    avg: price,
                    net: "0%",
                    day: "0%"
                });
                await newHolding.save();
                console.log(`✓ New holding created: ${req.body.name}`);
            }

            let existingPosition = await PositionsModel.findOne({ name: req.body.name });
            if (existingPosition) {
                existingPosition.qty += qty;
                existingPosition.avg = price;
                existingPosition.price = price;
                await existingPosition.save();
                console.log(`✓ Position updated: ${req.body.name}`);
            } else {
                let newPosition = new PositionsModel({
                    product: "CNC",
                    name: req.body.name,
                    qty: qty,
                    avg: price,
                    price: price,
                    net: "0%",
                    day: "0%",
                    isLoss: false
                });
                await newPosition.save();
                console.log(`✓ New position created: ${req.body.name}`);
            }
        }

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: error.message });
    }

});

// ✅ Protected Route - Sell Order
app.post("/sellOrder", authMiddleware, async (req, res) => {
    try {
        if (!req.body.name || !req.body.qty || !req.body.price) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const qty = parseInt(req.body.qty);
        const price = parseFloat(req.body.price);

        if (isNaN(qty) || isNaN(price) || qty <= 0 || price <= 0) {
            return res.status(400).json({ error: "Invalid quantity or price" });
        }

        // Check if stock exists in Holdings
        let existingHolding = await HoldingsModel.findOne({ name: req.body.name });
        if (!existingHolding || existingHolding.qty < qty) {
            return res.status(400).json({ error: "Insufficient holdings" });
        }

        // Save the sell order
        let sellOrder = new OrdersModel({
            name: req.body.name,
            qty: qty,
            price: price,
            mode: "SELL",
        });
        await sellOrder.save();
        console.log(`✓ Sell order saved: ${req.body.name} | Qty: ${qty} | Price: ${price}`);

        // Update Holdings - reduce quantity
        existingHolding.qty -= qty;
        if (existingHolding.qty === 0) {
            await HoldingsModel.deleteOne({ name: req.body.name });
            console.log(`✓ Holding deleted: ${req.body.name} (qty = 0)`);
        } else {
            await existingHolding.save();
            console.log(`✓ Holdings updated: ${req.body.name} | New Qty: ${existingHolding.qty}`);
        }

        // Update Positions - reduce quantity
        let existingPosition = await PositionsModel.findOne({ name: req.body.name });
        if (existingPosition) {
            existingPosition.qty -= qty;
            if (existingPosition.qty === 0) {
                await PositionsModel.deleteOne({ name: req.body.name });
                console.log(`✓ Position deleted: ${req.body.name} (qty = 0)`);
            } else {
                await existingPosition.save();
                console.log(`✓ Position updated: ${req.body.name} | New Qty: ${existingPosition.qty}`);
            }
        }

        res.json({ success: true, message: "Stock sold successfully" });
    } catch (error) {
        console.error("❌ Sell Error:", error);
        res.status(500).json({ error: error.message });
    }

});
 






// app.get("/addPositions",async(req,res)=>{

//     let tempPositions=[
//    {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
  
  
// ];
// tempPositions.forEach((item)=>{
//     let newPosition=new PositionsModel({
//          product: item.product,
//          name: item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net:item.day,
//     day: item.day,
//     isLoss: item.isLoss,


    
   
//     });
//     newPosition.save();

// });
// res.send("done");

// });


// app.get("/addHoldings",async(req,res)=>{

//     let tempHoldings=[
//   {
//     name: "INFY",
//     price: 1555.45,
//     percent: "-1.60%",
//     isDown: true,
//   },
//   {
//     name: "ONGC",
//     price: 116.8,
//     percent: "-0.09%",
//     isDown: true,
//   },
//   {
//     name: "TCS",
//     price: 3194.8,
//     percent: "-0.25%",
//     isDown: true,
//   },
  
  
// ];
// tempHoldings.forEach((item)=>{
//     let newHolding=new HoldingsModel({
//          name: item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net:item.day,
//     day: item.day,
//     });
//     newHolding.save();

// });
// res.send("done");

// });



// MongoDB Connection with error handling
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✓ MongoDB Atlas connected successfully");
    } catch (err) {
        console.log("✗ MongoDB Atlas connection failed");
        console.log("  Error details:", err.message);
        console.log("  Connection string:", uri.substring(0, 50) + "...");
        console.log("  Trying local MongoDB...");
        try {
            await mongoose.connect("mongodb://localhost:27017/zerodha", {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("✓ Local MongoDB connected successfully");
        } catch (localErr) {
            console.log("✗ Local MongoDB also failed");
            console.log("  Error:", localErr.message);
            console.log("  Make sure MongoDB is running on localhost:27017");
        }
    }
};

app.listen(PORT, async () => {
    await connectDB();
    console.log(`✓ Backend server running on port ${PORT}`);
});
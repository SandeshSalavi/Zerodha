const {model}=require("mongoose");

const { OrdersSchema } = require('../schemas/OrdersSchema');

const OrdersModel=new model("orderpnot",OrdersSchema);

module.exports={OrdersModel};
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{
        type:String,
        required:true,
        enum:["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"]
    },
})

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;
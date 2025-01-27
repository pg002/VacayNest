const mongoose=require("mongoose");
const schema=mongoose.Schema;

const listingSchema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
            //required:true,
            default: "default.jpg", 
            
        },
        url:{
        type:String,
        default:"https://www.google.com/imgres?q=villa%20images&imgurl=https%3A%2F%2Fwww.houseofhiranandani.com%2Fvlogs%2Fstorage%2F2019%2F01%2F35.png&imgrefurl=https%3A%2F%2Fwww.houseofhiranandani.com%2Fvlogs%2Fmy-villa-my-space%2F&docid=yd9Icnm3K2zSdM&tbnid=OnPMtSqq2-sGhM&vet=12ahUKEwiw5rXJtcqKAxWlyzgGHVAHC_QQM3oECDQQAA..i&w=602&h=304&hcb=2&ved=2ahUKEwiw5rXJtcqKAxWlyzgGHVAHC_QQM3oECDQQAA",
        set:(v)=>v==="" || v===undefined?"https://www.google.com/imgres?q=villa%20images&imgurl=https%3A%2F%2Fwww.houseofhiranandani.com%2Fvlogs%2Fstorage%2F2019%2F01%2F35.png&imgrefurl=https%3A%2F%2Fwww.houseofhiranandani.com%2Fvlogs%2Fmy-villa-my-space%2F&docid=yd9Icnm3K2zSdM&tbnid=OnPMtSqq2-sGhM&vet=12ahUKEwiw5rXJtcqKAxWlyzgGHVAHC_QQM3oECDQQAA..i&w=602&h=304&hcb=2&ved=2ahUKEwiw5rXJtcqKAxWlyzgGHVAHC_QQM3oECDQQAA":v,
    }}, 
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

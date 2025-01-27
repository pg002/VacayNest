const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const path =require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js")

main()
 .then(()=>{
    console.log("connected to DB");
 })
 .catch((err)=>{
    console.log(err);
 });
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.listen(8080,()=>{
    console.log("Server is listening to port 8080")
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
})

//index Route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
});
// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

})
wrapAsync
// Create Route
app.post("/listings",wrapAsync(async (req,res,next)=>{
    // try{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // }
    // catch(err){
    //     next(err);
    // }
}));

// edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//Update route
// app.put("/listings/:id",async(req,res)=>{
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// })
app.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price, location, country } = req.body.listing;

        // Ensure the 'image' field has the URL
        const updatedListing = {
            title,
            description,
            image: {
                url: image // Ensure image URL is properly passed
            },
            price,
            location,
            country
        };

        // Update the listing in the database
        await Listing.findByIdAndUpdate(id, updatedListing);
        
        // Redirect to the updated listing page
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating listing');
    }
});


//Delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.use((err,req,res,nextr)=>{
  res.send("Something went wrong!");
});
// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });
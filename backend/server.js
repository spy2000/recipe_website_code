const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")
const db = require("./db")
const recipeRoutes = require("./routes/recipesRoutes");

const app = express();

app.use(bodyParser.json())
app.use(cors())


//test api for database
app.get("/", async(req,res)=>{
    try {
          const row = await db.query("select * from recipes");
          console.log(row);
          res.send("server connected");
    } catch (error) {
        console.log(error)
         res.send("server");
    }
  
})

// static path for upload
app.use("/uploads", express.static("uploads"));


// recipe routes
app.use("/recipes", recipeRoutes);



app.listen(4000,()=>console.log("server running on localhost 4000"))
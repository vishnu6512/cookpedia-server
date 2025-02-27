const mongoose = require("mongoose");
const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected with Cookpedia server");
}).catch((err)=>{
    console.log(err)
})

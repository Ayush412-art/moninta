const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/"

app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect(url , {
    dbName : "course"
}).then(()=>{
    console.log("db connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//dotenv
require('dotenv').config();
const app = require("./app");

//connect DB
const { connectDB } = require('./configs/db')
connectDB();

//port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
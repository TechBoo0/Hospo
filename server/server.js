const express = require("express");
const app = express();
const htp=require("http").createServer(app)
const socket=require("socket.io")
const io=socket(htp,{cors:"*"})
const cors=require("cors")
const mongoose=require("mongoose");
const  route = require("./routes");

app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome to Hospo!");
});
let rooms=[]
app.use(express.json())
app.use("/",route)
io.on("connection",(socket)=>{
    socket.on("join",(id)=>{
        console.log(id)
        if(!rooms.includes(id)){
            rooms.push(id)
        }
        socket.join(id)
    })
    socket.on("check",(id)=>{
        console.log(rooms)
        if(rooms.includes(id)){
            socket.emit("conform","yes")
        }
    })
    socket.on('updateLocation', (data) => {
        console.log('Location update received:', data);
        
        io.emit('deliveryLocationUpdate', data);
    });
    socket.on("mylocation",(log,lat)=>{
        io.emit("customerloc",log,lat)
    })


})

htp.listen(6001,async ()=>{
    await mongoose.connect("mongodb+srv://mohanavamsi14:vamsi@cluster0.bk07f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("http://localhost:6001")
})
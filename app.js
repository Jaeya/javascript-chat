const express = require("express") // node_modules에서 가져옴
const http = require("http")
const app = express(); // express를 실행한 내용을 app에 담는다
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);


//보여줄 폴더 지정
// console.log(__dirname) // 프로젝트 폴더

app.use(express.static(path.join(__dirname, "src"))) //  public 폴더 지정

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>console.log(`server is running ${PORT}`))

io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{ 
        const {name, msg} = data;

        io.emit("chatting",{
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm A")
        })
    })
    console.log('연결이 이루어 졌습니다')
})
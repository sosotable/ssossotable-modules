const port=process.env.PORT||3000

/**서버**/
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/**
 * 데이터베이스
 * 보안 문제로 인해 config안의 db_info정보는 * 처리했어요
 * 깃의 데이터베이스 정보 확인하고 로컬에서 작업하세요
 * **/
let connection=null
const sql=require('./modules/db_conn')()

/**
 * 외부 모듈 require
 * DAO module
 * **/
const DAO=require('./modules/dao')

io.on('connection', async (socket) => {
    console.log('socket connected');
    socket.on('disconnect',async ()=>{
        console.log('socket disconnected')
    })

    socket.on('insert', async (msg) => {
        const result=await DAO.daoInsert(
            msg.tableName,
            msg.field,
            msg.value,
            connection
        )
        socket.emit('insert',result)
    })
    socket.on('select', async (msg) => {
        const result=await DAO.daoSelect(
            msg.tableName,
            msg.field,
            msg.whereParameter,
            connection
        )
        socket.emit('select',result)
    })
    socket.on('update', async (msg) => {
        const result=await DAO.daoUpdate(
            msg.tableName,
            msg.setParameter,
            msg.whereParameter,
            connection
        )
        socket.emit('update',result)
    })
    socket.on('delete', async (msg) => {
        const result=await DAO.daoDelete(
            msg.tableName,
            msg.whereParameter,
            connection
        )
        socket.emit('delete',result)
    })
});

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html')
})

server.listen(port, async () => {
    try {
        connection=await sql.init()
        console.log('database connected on',port)
    }
    catch (e) {
        console.log(e)
    } finally {
        console.log('server listening on',port);
    }
});
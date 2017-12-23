var express =require('express');           //引入express模块
var app = express();
var path = require('path');
var server = require('http').Server(app);   //引入http模块
var io = require('socket.io')(server);      //引入socket.io模块
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');     //引入serialport模块

var servos = {},serialPortConnected = false ,portName = 'COM4', baudRate = 9600;

var sport = new SerialPort(portName,{
  baudRate:baudRate,    //设置波特率
  autoOpen:false        //设置端口非自动打开
});


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

//路由
app.use(express.static(path.join(__dirname, 'public')));


//socket与客户端连接成功时发送消息
io.on('connection', function (socket) {

  socket.emit('server succeed', { server: 'succeed',status:serialPortConnected });
  socket.on('client succeed', function (data) {
    console.log(data);
  });

  //接收客户端发送的串口设置信息
  socket.on('serialPortConnect',function (serialPortMessage){
  	console.log(serialPortMessage);
  	portName = serialPortMessage.portName;
    baudRate = parseInt(serialPortMessage.baudRate);
    console.log(baudRate,portName);

    //连接arduino，更新连接状态，发送连接成功信息
      //打开串口，连接arduino
      sport = new SerialPort(portName,{
        baudRate:baudRate,    //设置波特率
        autoOpen:false        //设置端口非自动打开
      });

      sport.open(function(err){
        //打开失败报错
        if(err){
            return console.log('failed to open: ',arr.message);
            serialPortConnected = false;
            socket.emit('spIsConnected',{status: false});
            //发送失败消息

        }
        //打开成功
        else{
          //更新连接状态
            console.log('open success');
            serialPortConnected = true;
            socket.emit('spIsConnected',{status: true});
        }
      });


  }); //socket.on


  //断开连接
 /*  socket.on('disconnect',function(data){
    if(data.disconnect){
      sport.close(function(){
        console.log('close success');
      });
      serialPortConnected = false;
    }
  }) */
  //接收舵机数据
  socket.on('servosUpdata', function(servoData){
    //判断是否连接
      if(serialPortConnected){
        // console.log(servos);
        var servoMessage = servoData.number+","+servoData.pos+"s";
        console.log(servoMessage);
        //通过串口发送新数据
        sport.write(servoMessage);
    }else{

    }
  });


})
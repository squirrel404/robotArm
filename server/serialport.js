var SerialPort = require('serialport');
var port = new SerialPort('COM4',{
    bandrate:9600,//设置波特率为9600
    autoOpen:false//设置端口非自动打开
});
 

port.open(function(err){
    //打开失败报错
    if(err){
        return console.log('failed to open: ',arr.message);
    }
    //打开成功
    else{
    console.log('open success');
    //使用以下代码获取串口数据的更新
    port.on('data',function(data){
        console.log('数据接收: ' + data);
        port.write("1300,400,500,600,700,800s");
    });
    }
    
});
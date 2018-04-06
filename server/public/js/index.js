
    var servos=[];
    var a=document.getElementById("servo_control");
    var slider = a.getElementsByTagName('input');
    var connected = false;
    
    var connect_btn = document.getElementById("connect");
    var disconnect_btn = document.getElementById("disconnect");
    var portName = document.getElementById("item1").value;
    var baudRate = document.getElementById("item2").value;
    var connectStatus = document.getElementById('status1');
    
    
    var init = function(){
        for(var i=0;i<6;i++){
            servos[i]={
                number: i,
                pos: slider[i].value
            };
        };
        
        if(connected){
            connect_btn.setAttribute('disabled',true);
            connectStatus.innerText = '已连接';
        }

        
    } 
    

        
        
        //连接服务器
	  var socket = io.connect('http://localhost:8080');
	  socket.on('server succeed', function (data) {
        console.log(data);
        if(data.status){
            connected = true;
        }
        socket.emit('client succeed', { client: 'succeed' });
        //初始化
        init();

        
	    //发送串口信息
	    connect_btn.addEventListener('click', function () {
            console.log(portName);
            console.log(baudRate);
	    	socket.emit('serialPortConnect',{portName: portName, baudRate: baudRate});
	    });
        //接收串口连接成功的消息
        socket.on('spIsConnected',function(data){
            console.log(data);
            if(data.status = true){
                connected = true;
                connectStatus.innerText = '已连接';
                connect_btn.setAttribute('disabled',true);
            }else{
                connectStatus.innerText = '未连接';
            }
            
            //如果已经连接成功,调整端口选择框，把连接按钮置为不可点击状态
        });

        //断开连接
        /* disconnect_btn.addEventListener('click', function () {
            if(connected){
                socket.emit('disconnect',{disconnect:true});
                connected = false;
                connect_btn.setAttribute('disabled',false);
                connectStatus.innerText = '未连接';
            }else{
                alert('当前未连接！');
            }
        });
 */

        //监测滑块实时变化，每次滑动都向服务发送舵机角度数据
        for(let i=0;i<6;i++){
            slider[i].onmousedown = function (evt) {
                var that = this;
                document.onmouseup = function (evt) {
                    if(connected){
                        console.log(i,that.value);
                        window.servos[i].pos = that.value;
                        socket.emit('servosUpdata', servos[i]); 
                        document.onmouseup = null;
                    }else{
                        alert("当前未连接串口！请重试")
                    }
                   
                }
            }
        }
        
	    
	  });
	      
   
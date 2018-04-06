# Web Page+Node实现的机械臂控制程序

- 一个实时控制机械臂运动的webAPP
- 技术实现：Material UI+WebSocket+SerialPort+Arduino
- web端使用Websocket与后端通信，Node通过串口与Arduino通信
- Arduino开发板为UNO
- [演示](https://tyanbiao.github.io/robotArm/server/public/)

### install
- clone到本地，进入server文件夹
- 安装依赖
```javascript
npm install
```
- 启动服务
```JavaScript
node app.js
```

### Screenshot
![screenshot](http://blog-1252366546.file.myqcloud.com/picture/screenshot.png)

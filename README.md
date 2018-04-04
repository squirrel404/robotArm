# robotArm

期末设计，多平台控制的机械臂系统。因为想尝试一下用 JavaScript来完成，所以使用node.js做了机械臂的
上位机，node.js创建服务器，使用串口与 arduino 连接通信，使用 WebSocket 协议
与浏览器通信，实现数据的实时同步，从而实现在web端控制机械臂

/*
 多平台控制的智能机械臂系统下位机程序
 arduino uno
 */


#include <Servo.h>
Servo myservo[6];//调用Servo库
int i = 0;
int oldpos = 0;    //上一次的角度
int pos[6] = {90,170,30,45,20,90}; //存储6个舵机的角度
int data[2] = {0,90}; //存储串口发送过来的单个舵机的位置数据
char tem = 'b';    
int IsRunning = 0; //运行状态

//初始化
void setup(){
    Serial.begin(9600);
    Serial.println("start");
    for(i=2;i<8;i++){
        myservo[i-2].attach(i);//绑定arduino开发板io口，开发板上是从2开始的
    }
    
    for(i=2;i<8;i++){
        myservo[i-2].write(pos[i-2]);
    }
}


void loop(){
    while (Serial.available() > 0) {
        i = 0;
        while(i<2){
            //接收串口发送过来的数据，格式为"1,120s"第一位表示舵机编号，第二位是角度，以字母s作为结束符
            data[i] = Serial.parseInt();
            i++;
        }
        //读取结束符
        tem = Serial.read();
        // Serial.print("I have read:"); 
        //Serial.println(tem);
        
        //如果读到's'就表示数据读取完毕
        if (tem == 's' && IsRunning ==0) { //数据读取完毕且舵机没有在运行
          IsRunning = 1;      //设置舵机运行状态
          pos[data[0]] = data[1]; //把角度存到数组里
         
           //舵机编号为0到5

           //读取上一次写入舵机的角度
                oldpos = myservo[data[0]].read();
                if(oldpos > pos[data[0]]){    //判断两次角度的大小，确定舵机旋转的方向
                    while(oldpos > pos[data[0]]){
                        oldpos -= 1;                   //每次旋转一度
                        myservo[data[0]].write(oldpos); //把数据写入舵机
                        delay(15); //延时，等待舵机转到指定位置
                    }
                }else{
                    if(oldpos == pos[data[0]]){
                       //如果两次角度一样，不做任何操作
                    }
                    while(oldpos < pos[data[0]]){
                        oldpos += 1;
                        myservo[data[0]].write(oldpos);
                        delay(15);
                    }
                }
        
            IsRunning = 0;   //设置舵机运行状态为false
        }// end of if
    } //end of while
} //end of loop()

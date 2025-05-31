// components/MqttDataDisplay.tsx
'use client'; // Đây là chỉ thị quan trọng để biến component này thành Client Component

import React, { useEffect, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt'; // Import MqttClient để có kiểu dữ liệu chính xác

// Cấu hình MQTT Broker
// Sử dụng 'ws://' cho kết nối WebSocket.
// broker.hivemq.com thường có sẵn port 8000 cho WebSocket.
const MQTT_BROKER_URL: string = 'mqtt://192.168.0.102:1883';
const MQTT_TOPIC_SUB: string = 'esp32/counter'; // Chủ đề bạn muốn đăng ký

// Định nghĩa kiểu dữ liệu cho message nhận được (tùy thuộc vào dữ liệu bạn gửi)
interface MqttMessageData {
  temperature: number;
  // Bạn có thể thêm các trường khác nếu dữ liệu của bạn có
}

export default function MqttDataDisplay() {
  const [temperature, setTemperature] = useState<string | number>('N/A');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    // Chỉ khởi tạo kết nối nếu chưa có client
    if (!client) {
      try {
        // Kết nối tới broker qua WebSockets
        const mqttClient: MqttClient = mqtt.connect(MQTT_BROKER_URL);

        mqttClient.on('connect', () => {
          console.log('Connected to MQTT Broker (Client-side)');
          setIsConnected(true);
          mqttClient.subscribe(MQTT_TOPIC_SUB, (err) => {
            if (err) {
              console.error('Subscription error:', err);
            } else {
              console.log(`Subscribed to topic: ${MQTT_TOPIC_SUB}`);
            }
          });
        });

        mqttClient.on('message', (topic: string, message: Buffer) => {
          console.log(`Received message: ${message.toString()} from topic: ${topic}`);
          try {
            // Cố gắng phân tích cú pháp JSON
            const data: MqttMessageData = JSON.parse(message.toString());
            if (topic === MQTT_TOPIC_SUB && typeof data.temperature === 'number') {
              setTemperature(data.temperature.toFixed(2)); // Hiển thị 2 chữ số thập phân
            }
          } catch (e) {
            console.error('Error parsing JSON or invalid message format:', e);
            setTemperature('Lỗi dữ liệu'); // Cập nhật trạng thái lỗi
          }
        });

        mqttClient.on('error', (err) => {
          console.error('MQTT client error:', err);
          setIsConnected(false);
          if (mqttClient) {
            mqttClient.end(); // Đóng kết nối
          }
          setClient(null); // Đặt lại client để có thể thử kết nối lại
        });

        mqttClient.on('close', () => {
          console.log('Disconnected from MQTT Broker');
          setIsConnected(false);
          setClient(null); // Đặt lại client
        });

        setClient(mqttClient); // Lưu client vào state để có thể quản lý ngắt kết nối

      } catch (e) {
        console.error('Failed to connect to MQTT broker:', e);
        setIsConnected(false);
      }
    }

    // Cleanup function: Ngắt kết nối khi component bị loại bỏ (unmount)
    return () => {
      if (client) {
        console.log('Cleaning up MQTT client...');
        client.end(); // Đóng kết nối MQTT
        setClient(null);
      }
    };
  }, [client]); // `client` trong dependency array để đảm bảo useEffect chỉ chạy khi `client` thay đổi (ban đầu là null)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dữ liệu thời gian thực từ MQTT</h1>
      <p>
        Trạng thái kết nối:{' '}
        <span style={{ color: isConnected ? 'green' : 'red', fontWeight: 'bold' }}>
          {isConnected ? 'Đã kết nối' : 'Đang ngắt kết nối'}
        </span>
      </p>
      <p>
        Nhiệt độ hiện tại:{' '}
        <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'blue' }}>
          {temperature}
        </span>{' '}
        °C
      </p>
      <p style={{ fontSize: '0.8em', color: '#666' }}>
        (Dữ liệu được cập nhật trực tiếp từ MQTT Broker)
      </p>
    </div>
  );
}
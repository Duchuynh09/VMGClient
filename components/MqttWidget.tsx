'use client';

import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
// const MQTT_BROKER_URL = `mqtt://${process.env.NEXT_PUBLIC_MQTT_IP}:${process.env.NEXT_PUBLIC_MQTT_PORT}`;
const MQTT_BROKER_URL = `mqtt://${process.env.NEXT_PUBLIC_MQTT_IP}:9001`;
const TOPIC = 'nextjs/demo'

export default function MqttWidget() {
 
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER_URL);
    mqttClient.on('connect', () => {
      console.log('✅ Connected to MQTT broker');
      setConnected(true);
      mqttClient.subscribe(TOPIC, (err) => {
        if (err) console.error('Subscription error:', err);
      });
    });

    mqttClient.on('message', (topic, payload) => {
      setMessages((prev) => [...prev, payload.toString()]);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const publishMessage = () => {
    if (client) {
      client.publish(TOPIC, `Hello from Next.js at ${new Date().toISOString()}`);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow">
      <h2 className="text-xl font-bold">MQTT Client Widget</h2>
      <p>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      <button onClick={publishMessage} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
        Gửi tin nhắn
      </button>
      <div className="mt-4">
        <h3 className="font-semibold">Messages:</h3>
        <ul className="list-disc ml-5 mt-2">
          {messages.map((msg, index) => (
            <li key={index} className="text-sm">{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

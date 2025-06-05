import MqttWidget from "@/components/MqttWidget";
import { title } from "@/components/primitives";

export default function MqttPage() {
  return (
    <div>
      <h1 className={title()}>MQTT</h1>
      <MqttWidget/>
    </div>
  );
}

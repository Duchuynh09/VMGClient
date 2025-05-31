import { title } from "@/components/primitives";
import MqttDataDisplay from '../../components/MqttDataDisplay'; 
export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Bảng sản lượng</h1>
      <MqttDataDisplay></MqttDataDisplay>
    </div>
  );
}

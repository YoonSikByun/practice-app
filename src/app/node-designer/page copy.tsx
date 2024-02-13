import NodeDesigner from "@/app/node-designer/NodeDesigner";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";

export default function Page() {
  return <NodeDesigner padding={{top: mainLayoutSize['topGNB'].height, left:0, right: 0, bottom:0}}/>;
}

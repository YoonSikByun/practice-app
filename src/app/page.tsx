import GNB from "./main/component/gnb";
import ReactflowMain from "@/app/node-editor/ReactflowMain";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";

export default function Home() {
  return (
    <div>
      <GNB/>
      <ReactflowMain padding={{top: mainLayoutSize['topGNB'].height, left:0, right: 0, bottom:0}}/>
    </div>
  )
}

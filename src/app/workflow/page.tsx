import SideNav from "../../ui/workflow/navi";
import '../../css/workflow/layout.scss'

import ReactFlowApp from "./reactflow"
export default function Page() {
  return (
    <div className="hanaflow">
      <div className="head">
        Head
      </div>
      <div className="grid-container">
        <div className="sidebar-nodes">
          <SideNav />
        </div>
        <div className="main">
          <ReactFlowApp/>
        </div>
        <div className="sidebar-property">
          Right
        </div>
      </div>
    </div>
    );
}

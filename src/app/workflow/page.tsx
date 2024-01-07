'use client'

import SideNav from "../../ui/workflow/navi";
import '../../css/workflow/layout.scss';
import Boundary from './boundary';
import { useState, useRef, useEffect } from "react";
import registMouseEvent from "./utils";

import ReactFlowApp from "./reactflow"
export default function Page() {
  const bottom_sheet_def_height = 300;
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(bottom_sheet_def_height);

  useEffect(() => {
    const rect = boundaryRef.current?.getBoundingClientRect();
    if(rect == null) return;
    setBottomSheetHeight(rect.height);
  }, []);
 
  return (
    <div className="hanaflow">
      <div className="head">
        Head
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateRows: `calc((100vh - 50px) - ${bottomSheetHeight}px) ${bottomSheetHeight}px`
        }}
      >
        <div className="sidebar-nodes">
          <SideNav />
        </div>
        <div className="main">
          <ReactFlowApp/>
        </div>
        <div className="sidebar-property">
          Right
        </div>
        <Boundary className="bottom-sheet" ref={boundaryRef}>
          <div className="resize-bar"
          {...registMouseEvent((deltaX, deltaY) => {
            if(!boundaryRef.current) return;

            const rect = boundaryRef.current?.getBoundingClientRect();
            console.log(`deltaY : ${deltaY}`);

            let change_size = bottomSheetHeight - deltaY;
            let bottom_sheet_height = (change_size < bottom_sheet_def_height) ? bottom_sheet_def_height : change_size;

            setBottomSheetHeight(bottom_sheet_height);
          })}
           />
          Bottom
        </Boundary>
      </div>
    </div>
  );
}

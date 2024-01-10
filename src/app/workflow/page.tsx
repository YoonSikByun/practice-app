'use client'

import SideNav from "../../ui/workflow/navi";
import '../../css/workflow/layout.scss';
import Boundary from './ui/boundary';
import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "./utils";

import ReactFlowApp from "./reactflow"
export default function Page() {
  const minBottomSheetHeight = 300;
  const mainBoundaryRef = useRef<HTMLDivElement>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const [maxBottomSheetHeight, setMaxBottomSheetHeight] = useState(0);
  const [curBottomSheetHeight, setCurBottomSheetHeight] = useState(minBottomSheetHeight);

  useEffect(() => {
    const bottomRect = bottomBoundaryRef.current?.getBoundingClientRect();
    if(bottomRect != null)
      setCurBottomSheetHeight(bottomRect.height);
    const mainRect = mainBoundaryRef.current?.getBoundingClientRect();
    if(mainRect != null)
      setMaxBottomSheetHeight(mainRect.height);
  }, []);
 
  return (
    <div className="hanaflow">
      <div className="head">
        Head
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`
        }}
      >
        <div className="sidebar-nodes">
          <SideNav />
        </div>
        <Boundary className="main" ref={mainBoundaryRef}>
          <ReactFlowApp/>
        </Boundary>
        <div className="sidebar-property">
          Right
        </div>
        <Boundary className="bottom-sheet" ref={bottomBoundaryRef}>
          <div className="resize-bar"
            {...registMouseEvent((deltaX, deltaY) => {
              if(!bottomBoundaryRef.current) return;

              const rect = bottomBoundaryRef.current?.getBoundingClientRect();
              console.log(`deltaY : ${deltaY}`);

              let change_size = curBottomSheetHeight - deltaY;
              console.log(`change_size : ${change_size}, curBottomSheetHeight : ${curBottomSheetHeight}, maxBottomSheetHeight : ${maxBottomSheetHeight}, minBottomSheetHeight : ${minBottomSheetHeight}`);
              const {size, limited} = inRange(change_size, minBottomSheetHeight, maxBottomSheetHeight * 0.8);

              setCurBottomSheetHeight(size);
            })}
           />
          Bottom
        </Boundary>
      </div>
    </div>
  );
}

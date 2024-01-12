'use client'

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "./utils";

import '@/css/workflow/layout.scss';
import { AccordionData } from "./ui/accordion";

import ReactFlowApp from "./reactflow"
import Boundary from './ui/boundary';
import VerticalMenu, {MenuItem} from "./ui/vertical-menu";
// import Accordion from './ui/accordion';

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
 
  const accordItems : AccordionData[] = [
    {title : 'title1...', content : 'content....'},
    {title : 'title2...', content : 'content....'},
    {title : 'title3...', content : 'content....'}
  ];

  const menuItems : MenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수설정', link : ''}
  ];

  return (
    <div className="hanaflow">
      <Boundary className="head">
        Head
      </Boundary>
      <Boundary
        className="grid-container"
        style={{
          gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`
        }}
      >
        <Boundary className="sidebar-nodes">
          {/* <Accordion accordItems={accordItems}/> */}
          <VerticalMenu menuItems={menuItems}/>
        </Boundary>
        <Boundary className="main" ref={mainBoundaryRef}>
          <ReactFlowApp/>
        </Boundary>
        <Boundary className="sidebar-property">
          Right
        </Boundary>
        <Boundary className="bottom-sheet" ref={bottomBoundaryRef}>
          <Boundary className="resize-bar"
            {...registMouseEvent((deltaX, deltaY) => {
              if(!bottomBoundaryRef.current) return;

              const rect = bottomBoundaryRef.current?.getBoundingClientRect();
              // console.log(`deltaY : ${deltaY}`);

              let change_size = curBottomSheetHeight - deltaY;
              // console.log(`change_size : ${change_size}, curBottomSheetHeight : ${curBottomSheetHeight}, maxBottomSheetHeight : ${maxBottomSheetHeight}, minBottomSheetHeight : ${minBottomSheetHeight}`);
              const {size, limited} = inRange(change_size, minBottomSheetHeight, maxBottomSheetHeight * 0.8);

              setCurBottomSheetHeight(size);
            })}
          />
          Bottom
        </Boundary>
      </Boundary>
    </div>
  );
}

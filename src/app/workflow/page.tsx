'use client'

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "./utils";

import '@/css/workflow/layout.scss';
import { AccordionData } from "./ui/accordion";

import ReactFlowApp from "./reactflow"
import Boundary from './ui/boundary';
import Accordion from './ui/accordion';

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
          <Accordion accordItems={accordItems}/>
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

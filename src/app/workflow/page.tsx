'use client'

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "./utils";

import '@/css/workflow/layout.scss';
import { AccordionData } from "./ui/accordion";

import ReactFlowApp from "./reactflow"
import Boundary from './ui/boundary';
import VerticalTabMenu, {MenuItem} from "./ui/vertical-tabmenu";
import Accordion from './ui/accordion';
import NodeContainer, { NodeItem } from "./ui/nodeContainer";
import { v4 as uuid } from "uuid";

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

  const nodeItems : NodeItem[] = [
    {id: uuid(), node_kind: 'Kind0'},
    {id: uuid(), node_kind: 'Kind1'},
    {id: uuid(), node_kind: 'Kind2'},
    {id: uuid(), node_kind: 'Kind3'},
    {id: uuid(), node_kind: 'Kind4'},
    {id: uuid(), node_kind: 'Kind5'},
    {id: uuid(), node_kind: 'Kind6'},
    {id: uuid(), node_kind: 'Kind7'},
    {id: uuid(), node_kind: 'Kind8'},
    {id: uuid(), node_kind: 'Kind9'},
    {id: uuid(), node_kind: 'Kind10'},
    {id: uuid(), node_kind: 'Kind11'},
    {id: uuid(), node_kind: 'Kind12'},
    {id: uuid(), node_kind: 'Kind13'},
    {id: uuid(), node_kind: 'Kind14'},
    {id: uuid(), node_kind: 'Kind15'},
    {id: uuid(), node_kind: 'Kind16'},
    {id: uuid(), node_kind: 'Kind17'}
  ];

  const node_width_px = 150;
  const node_height_px = 55;
  const container_height = 374;

  const nodeContainerComponet = () => (
    <NodeContainer
      nodeItems={nodeItems}
      node_width_px={node_width_px}
      node_height_px={node_height_px}
      container_height={container_height}
      className='bg-white overflow-auto'
    />
  );
  const emptyComponet = () => (<div className="bg-white h-[100px]"/>);

  const accordNodeItems : AccordionData[] = [
    {title : 'Nodes', component : nodeContainerComponet},
    {title : 'title2...', component : emptyComponet},
    {title : 'title3...', component : emptyComponet}];

  let tabMenus : boolean[] = [];
  accordNodeItems.map((accordItem) => {tabMenus.push(false);});

  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);
  const [tabVisible, setVTabVisible] = useState<boolean[]>(tabMenus);

  const menuItems : MenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수 설정', link : ''}];

  return (
    <div className="hanaflow">
      <Boundary className="head">
        Head
      </Boundary>
      <Boundary
        className="grid-container"
        style={{gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`}}
      >
        <Boundary className="sidebar-nodes">
          <VerticalTabMenu
           menuItems={menuItems}
           indexClicked={vTabMenuIndexClicked}
           setVTabIndexClicked={setVTabIndexClicked}
           setVTabVisible={setVTabVisible}
          />
            <Accordion accordItems={accordNodeItems} show={tabVisible[0]}/>
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

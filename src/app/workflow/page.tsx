'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import {registMouseEvent, inRange} from "../util/moudeMove";

import '@/css/workflow/layout.scss';
import { AccordionData } from "./ui/accordion";

import ReactFlowApp from "./reactflow"
import Boundary from './ui/boundary';
import VerticalTabMenu, {MenuItem} from "./ui/vertical-tabmenu";
import Accordion from './ui/accordion';
import NodeContainer, { NodeItem, DropZone, DraggingNodeProps, NodeDragOverlay } from "./ui/nodeContainer";
import { v4 as uuid } from "uuid";
import { DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";

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

  const nodeItems1 : NodeItem[] = [
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

  const nodeItems2 : NodeItem[] = [
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

  const node_width_px = 130;
  const node_height_px = 50;

  const nodeContainerComponet1 = () => (
    <NodeContainer
      id='nc1'
      nodeItems={nodeItems1}
      node_width_px={node_width_px}
      node_height_px={node_height_px}
    />
  );
  const nodeContainerComponet2 = () => (
    <NodeContainer
      id='nc2'
      nodeItems={nodeItems2}
      node_width_px={node_width_px}
      node_height_px={node_height_px}
    />
  );

  const accordNodeItems : AccordionData[] = [
    {title : '노드종류1', component : nodeContainerComponet1},
    {title : '노드종류2', component : nodeContainerComponet2}]

  let tabMenus : boolean[] = [];
  accordNodeItems.map((accordItem) => {tabMenus.push(false);});

  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);
  const [tabVisible, setVTabVisible] = useState<boolean[]>(tabMenus);

  const menuItems : MenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수 설정', link : ''}
  ];

  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', height: 0, nodeKind: '', designMode: false});

  function onDragStart(e: DragStartEvent) {
    const startKey = e.active.data.current?.drag_key
    const startHeight = e.active.data.current?.height
    console.log(`draggingNode.key : ${draggingNode.key},  startKey : ${startKey}, startHeight : ${startHeight}`);
    setDraggingNode((prev => ({...prev, 
      key: e.active.data.current?.drag_key,
      width: e.active.data.current?.width,
      height: e.active.data.current?.height,
      nodeKind: e.active.data.current?.nodeKind,
      designMode: e.active.data.current?.designMode})));
  }

  const onDragEnd = (e: DragEndEvent) => {
    const endKey = e.active.data.current?.drag_key;
    console.log(`draggingNode.key : ${draggingNode.key}, endKey : ${endKey}`);
    setDraggingNode((prev => ({...prev, 
      drag_key: '',
      width: 0,
      height: 0,
      nodeKind: '',
      designMode: false})));
  }

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
           setVTabVisible={setVTabVisible}/>
             <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Accordion accordItems={accordNodeItems} show={tabVisible[0]}/>
              <NodeDragOverlay draggingNode={draggingNode}/>
              {/* <DropZone/> */}
            </DndContext>
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
              let change_size = curBottomSheetHeight - deltaY;
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

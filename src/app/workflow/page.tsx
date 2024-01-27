'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import {registMouseEvent, inRange} from "../util/moudeMove";

import '@/css/workflow/layout.scss';
import { AccordionData } from "./ui/accordion";

import ReactFlowApp from "./reactflow"
import Boundary from './ui/boundary';
import VerticalTabMenu, {MenuItem} from "./ui/vertical-tabmenu";
import Accordion from './ui/accordion';
import NodeContainer, { NodeItem, DraggingNodeProps, NodeDragOverlay } from "./ui/nodeContainer";
import { v4 as uuid } from "uuid";
import NodeDndContext, {ComponentRegionSize} from "@/app/util/dnd-kit-node-dnd-context";

export default function Page() {

  // 하단시트 사이즈를 마우스 드래그로 조정할 때 필요한 값들
  const minBottomSheetHeight = 300;
  const mainBoundaryRef = useRef<HTMLDivElement>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const [maxBottomSheetHeight, setMaxBottomSheetHeight] = useState(0);
  const [curBottomSheetHeight, setCurBottomSheetHeight] = useState(minBottomSheetHeight);

  // 초기 하단시트 크기와 Reactflow영역 크기를 구해서 저장해 놓는다. 초기 1회만 호출된다.
  useEffect(() => {
    const bottomRect = bottomBoundaryRef.current?.getBoundingClientRect();
    if(bottomRect != null)
      setCurBottomSheetHeight(bottomRect.height);
    const mainRect = mainBoundaryRef.current?.getBoundingClientRect();
    if(mainRect != null)
      setMaxBottomSheetHeight(mainRect.height);
    console.log('useEffect..........')
  }, []);

  //좌측 아코디언 메뉴 패널에 표시될 항목들
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

  //좌측 아코디언 메뉴 패널에 표시될 항목들
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

  // 노드 너비와 높이 크기
  const node_width_px = 130;
  const node_height_px = 50;

  // 아코디언 메뉴 패널에 표시될 컨퍼넌트
  const nodeContainerComponet1 = () => (
    <NodeContainer
      id='nc1'
      nodeItems={nodeItems1}
      node_width_px={node_width_px}
      node_height_px={node_height_px}
    />
  );

  // 아코디언 메뉴 패널에 표시될 컨퍼넌트
  const nodeContainerComponet2 = () => (
    <NodeContainer
      id='nc2'
      nodeItems={nodeItems2}
      node_width_px={node_width_px}
      node_height_px={node_height_px}
    />
  );

  //아코디언 메뉴 구성 설정
  const accordNodeItems : AccordionData[] = [
    {title : '노드종류1', component : nodeContainerComponet1},
    {title : '노드종류2', component : nodeContainerComponet2}]

  //좌측 세로탭 메뉴 토글 시에 보임/숨김 설정하기 위한 변수
  let tabMenus : boolean[] = Array(accordNodeItems.length).fill(false);
 
  //좌측 세로탭 메뉴 중에 현제 선택된 탭 index 저장 및 렌더링 반영 위한 useState 
  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);
  // 좌측 새로탭 메뉴 토글 시에 보임/숨김 설정을 컨퍼넌트에 렌더링에 반영하기 위한 useState
  const [tabVisible, setVTabVisible] = useState<boolean[]>(tabMenus);

  //세로탭 메뉴 구성 설정
  const menuItems : MenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수 설정', link : ''}];

  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', designMode: false});

  // React-flow 영역에 노드 끌어다 놓을 때 영역 계산을 위해 컨퍼넌트 위치과 크기 정보 제공
  const getComponentRegionSize = () => {
    let showMenuPanelHeight : number = 0;
    let showMenuPanelWidth : number = 0;

    //현재 보이는 메뉴 너비와 폭 크기
    if(tabVisible[0])
    {
      const accordion : any = document.getElementById('accordion-container');
      const accordionRect : any = accordion.getBoundingClientRect();
      console.log(`----top : ${accordionRect.top}, left : ${accordionRect.left}, right : ${accordionRect.right}, bottom : ${accordionRect.bottom}`);
      showMenuPanelHeight = accordionRect.bottom - accordionRect.top;
      showMenuPanelWidth = accordionRect.right - accordionRect.left;
      const top : number = accordionRect.top;
      console.log(`---- top : ${top}, showMenuPanelHeight : ${showMenuPanelHeight}, showMenuPanelWidth : ${showMenuPanelWidth}`);

    }

    //React-flow 영역
    const reactflowdom : any = document.getElementById('React-DropZone');
    const reactFlowRect : any = reactflowdom.getBoundingClientRect();
    
    const size : ComponentRegionSize = {
      reactFlowRect : reactFlowRect, //React-flow 영역 rect 정보
      curBottomSheetHeight : curBottomSheetHeight, //하단시크 현재 높이 크기
      showMenuPanelHeight : showMenuPanelHeight, //현제 보여지는 메뉴 높이
      showMenuPanelWidth : showMenuPanelWidth //현재 보여지는 메뉴 너비
    };

    console.log(`----showMenuPanelWidth : ${showMenuPanelWidth}, showMenuPanelWidth : ${showMenuPanelWidth}`);

    return size;
  }

  return (
    <div className="hanaflow">
      <Boundary className="head">
        Head
      </Boundary>
      <Boundary
        className="grid-container"
        style={{gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`}}>
        <Boundary className="sidebar-nodes">
          <VerticalTabMenu
           menuItems={menuItems}
           indexClicked={vTabMenuIndexClicked}
           setVTabIndexClicked={setVTabIndexClicked}
           setVTabVisible={setVTabVisible}/>
            <NodeDndContext setDraggingNode={setDraggingNode} getComponentRegionSize={getComponentRegionSize}>
              <Accordion accordItems={accordNodeItems} show={tabVisible[0]}/>
              <NodeDragOverlay draggingNode={draggingNode}/>
            </NodeDndContext>
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
            })}/>
          Bottom
        </Boundary>
      </Boundary>
    </div>
  );
}

'use client'

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "@/app/util/moudeMove";

import '@/css/node-editor/layout.scss';

import ReactFlowApp from "@/app/node-editor/component/react-flow/reactflow"
import Boundary from '@/app/node-editor/component/boundary';
import VerticalTabMenu from "@/app/node-editor/component/menu/vertical-tabmenu";
import Accordion from '@/app/node-editor/component/menu/accordion';
import { DraggingNodeProps, NodeDragOverlay } from "@/app/node-editor/component/node/nodeContainer";
// import { v4 as uuid } from "uuid";
import NodeDndContext, {ComponentRegionSize} from "@/app/node-editor/component/dnd-kit/dnd-kit-node-dnd-context";
import {minBottomSheetHeight} from '@/app/node-editor/config/common'
import {verticalTablMenuItems, accordionPanelItems} from '@/app/node-editor/config/menu'

export default function Page() {

  // 하단시트 사이즈를 마우스 드래그로 조정할 때 필요한 값들
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
  }, []);

  //좌측 세로탭 메뉴 중에 현제 선택된 탭 index 저장 및 렌더링 반영 위한 useState 
  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);

  // 좌측 새로탭 메뉴 토글 시에 보임/숨김 설정을 컨퍼넌트에 렌더링에 반영하기 위한 useState
  const [tabVisible, setVTabVisible] = useState<boolean[]>(Array(verticalTablMenuItems.length).fill(false));

  // 메뉴에서 노드를 드래그할 땔 선택되어 드래중인 노드정보 보관한다.
  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', className: ''});

  // React-flow 영역에 노드 끌어다 놓을 때 영역 계산을 위해 컨퍼넌트 위치과 크기 정보 제공
  const getComponentRegionSize = () => {
    let showMenuPanelHeight : number = 0;
    let showMenuPanelWidth : number = 0;

    //현재 보이는 메뉴 너비와 폭 크기
    if(tabVisible[0])
    {
      const accordion : any = document.getElementById('accordion-container');
      const accordionRect : any = accordion.getBoundingClientRect();
      showMenuPanelHeight = accordionRect.bottom - accordionRect.top;
      showMenuPanelWidth = accordionRect.right - accordionRect.left;
    }

    //React-flow 영역
    const reactflowdom : any = document.getElementById('React-DropZone');
    const reactFlowRect : any = reactflowdom.getBoundingClientRect();

    const componentRegionsize : ComponentRegionSize = {
      reactFlowRect : reactFlowRect, //React-flow 영역 rect 정보
      curBottomSheetHeight : curBottomSheetHeight, //하단시크 현재 높이 크기
      showMenuPanelHeight : showMenuPanelHeight, //현제 보여지는 메뉴 높이
      showMenuPanelWidth : showMenuPanelWidth //현재 보여지는 메뉴 너비
    };

    return componentRegionsize;
  }

  return (
    <div className="node-editor">
      <Boundary className="head">
        Head
      </Boundary>
      <Boundary
        className="grid-container"
        style={{gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`}}>
        <Boundary className="sidebar-nodes">
          <VerticalTabMenu
           menuItems={verticalTablMenuItems}
           indexClicked={vTabMenuIndexClicked}
           setVTabIndexClicked={setVTabIndexClicked}
           setVTabVisible={setVTabVisible}/>
            <NodeDndContext setDraggingNode={setDraggingNode} getComponentRegionSize={getComponentRegionSize}>
              <Accordion accordItems={accordionPanelItems} show={tabVisible[0]}/>
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

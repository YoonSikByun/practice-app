'use client'

import '@/app/node-editor/css/layout.scss';

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "@/app/node-editor/util/moudeMove";

import ReactFlowApp from "@/app/node-editor/component/react-flow/reactflow"
import Boundary from '@/app/node-editor/component/boundary';
import VerticalTabMenu from "@/app/node-editor/component/menu/vertical-tabmenu";
import Accordion from '@/app/node-editor/component/menu/accordion';
import { DraggingNodeProps, NodeDragOverlay } from "@/app/node-editor/component/node/nodeContainer";
// import { v4 as uuid } from "uuid";
import NodeDndContext, {LayoutRegionSIze} from "@/app/node-editor/component/dnd-kit/dnd-kit-node-dnd-context";
import {layoutSize} from '@/app/node-editor/config/layoutFrame'
import {verticalTablMenuItems, accordionPanelItems} from '@/app/node-editor/config/menu'

export default function Page() {

  // 하단시트 사이즈를 마우스 드래그로 조정할 때 필요한 값들
  const reactFlowRegionBoundaryRef = useRef<HTMLDivElement>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const [maxBottomSheetHeight, setMaxBottomSheetHeight] = useState(0);
  const [curBottomSheetHeight, setCurBottomSheetHeight] = useState(layoutSize['minBottomSheet'].height);

  // 초기 하단시트 크기와 Reactflow영역 크기를 구해서 저장해 놓는다. 초기 1회만 호출된다.
  useEffect(() => {
    const bottomRect = bottomBoundaryRef.current?.getBoundingClientRect();
    if(bottomRect != null)
      setCurBottomSheetHeight(bottomRect.height);
    const reactFlowRegionRect = reactFlowRegionBoundaryRef.current?.getBoundingClientRect();
    if(reactFlowRegionRect != null)
      setMaxBottomSheetHeight(reactFlowRegionRect.height * 0.8);
  }, []);

  //좌측 세로탭 메뉴 중에 현제 선택된 탭 index 저장 및 렌더링 반영 위한 useState 
  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);

  // 좌측 새로탭 메뉴 토글 시에 보임/숨김 설정을 컨퍼넌트에 렌더링에 반영하기 위한 useState
  const [tabVisible, setVTabVisible] = useState<boolean[]>(Array(verticalTablMenuItems.length).fill(false));

  // 메뉴에서 노드를 드래그할 땔 선택되어 드래중인 노드정보 보관한다.
  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', className: ''});

  // React-flow 영역에 노드 끌어다 놓을 때 영역 계산을 위해 컨퍼넌트 위치과 크기 정보 제공
  const getLayoutRegionSIze = () => {
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

    const layoutRegionSIze : LayoutRegionSIze = {
      reactFlowRect : reactFlowRect, //React-flow 영역 rect 정보
      curBottomSheetHeight : curBottomSheetHeight, //하단시크 현재 높이 크기
      showMenuPanelHeight : showMenuPanelHeight, //현제 보여지는 메뉴 높이
      showMenuPanelWidth : showMenuPanelWidth //현재 보여지는 메뉴 너비
    };

    return layoutRegionSIze;
  }

  return (
    <div className="node-editor">
      <Boundary className="head"
       style={{height: `${layoutSize['topHead'].height}`}}>
        Head
      </Boundary>
      <Boundary
        style={{
          gridTemplateColumns: `30px auto ${layoutSize['sidebarProperty'].width}`,
          gridTemplateRows: `calc((100vh - 50px) - ${curBottomSheetHeight}px) ${curBottomSheetHeight}px`
        }}
        className="main-container"
        >
        <Boundary className="vertical-menu"
         style={{height: `calc(100vh - ${layoutSize['topHead'].height})`}}>
          <VerticalTabMenu
           menuItems={verticalTablMenuItems}
           indexClicked={vTabMenuIndexClicked}
           setVTabIndexClicked={setVTabIndexClicked}
           setVTabVisible={setVTabVisible}/>
            <NodeDndContext setDraggingNode={setDraggingNode} getLayoutRegionSIze={getLayoutRegionSIze}>
              <Accordion accordItems={accordionPanelItems} show={tabVisible[0]}/>
              <NodeDragOverlay draggingNode={draggingNode}/>
            </NodeDndContext>
        </Boundary>
        <Boundary className="reactFlow-Region" ref={reactFlowRegionBoundaryRef}
         style={{height: `calc(100vh - ${layoutSize['topHead'].height})`}}>
          <ReactFlowApp/>
        </Boundary>
        <Boundary className="sidebar-property"
         style={{height: `calc(100vh - ${layoutSize['topHead'].height})`}}>
          Right
        </Boundary>
        <Boundary className="bottom-sheet" ref={bottomBoundaryRef}>
          <Boundary className="resize-bar"
            {...registMouseEvent((deltaX, deltaY) => {
              if(!bottomBoundaryRef.current) return;
              let change_size = curBottomSheetHeight - deltaY;
              const {size, limited} = inRange(change_size, layoutSize['minBottomSheet'].height, maxBottomSheetHeight);
              setCurBottomSheetHeight(size);
            })}/>
          Bottom
        </Boundary>
      </Boundary>
    </div>
  );
}

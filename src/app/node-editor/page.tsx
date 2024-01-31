'use client'

import '@/app/node-editor/css/layout.scss';

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "@/app/node-editor/util/moudeMove";

import ReactFlowApp from "@/app/node-editor/component/react-flow/reactflow"
import Boundary from '@/app/node-editor/component/boundary';
import VerticalTabMenu from "@/app/node-editor/component/menu/verticalTabmenu";
import Accordion from '@/app/node-editor/component/menu/accordion';
import { DraggingNodeProps, NodeDragOverlay } from "@/app/node-editor/component/node/nodeContainer";
// import { v4 as uuid } from "uuid";
import NodeDndContext from "@/app/node-editor/component/dnd-kit/dnd-kit-node-dnd-context";
import {verticalTablMenuItems, accordionPanelItems} from '@/app/node-editor/config/menu'
import {layoutSize, ShowingPanelSize, Size} from '@/app/node-editor/config/layoutFrame'
import { calcStyle, getElementSize } from '@/app/node-editor/util/calcStyleRegion';
import clsx from 'clsx';

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

  const [panelVisible, setPanelVisible] = useState({bottomSheet: true, property: true});

  // 메뉴에서 노드를 드래그할 땔 선택되어 드래중인 노드정보 보관한다.
  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', className: ''});


  // React-flow 영역에 노드 끌어다 놓을 때 영역 계산을 위해 컨퍼넌트 위치와 크기 정보 제공
  const getShowingPanelSize = () => {
    let showingMenuSize : Size = {width: 0, height: 0};
    let showingPropertySize : Size = {width: 0, height: 0};
    let showingBottomSheetSize : Size = {width: 0, height: 0};
    
    if(tabVisible[0])
      showingMenuSize = getElementSize('accordion-container');

    if(panelVisible['property'])
      showingPropertySize = getElementSize('sidebar-property');

    if(panelVisible['bottomSheet'])
      showingBottomSheetSize = getElementSize('bottom-sheet');

      //React-flow 영역
    const reactflowdom : any = document.getElementById('React-DropZone');
    const reactFlowRect : any = reactflowdom.getBoundingClientRect();

    const showingPanelSize : ShowingPanelSize = {
      reactFlowRect : reactFlowRect, //React-flow 영역 rect 정보
      showingMenuSize : showingMenuSize, //하단시크 현재 높이 크기
      showingPropertySize : showingPropertySize, //현제 보여지는 메뉴 높이
      showingBottomSheetSize : showingBottomSheetSize //현재 보여지는 메뉴 너비
    };

    return showingPanelSize;
  }

  return (
  <div className="node-editor">
    <Boundary className='head'
      style={{height: calcStyle.topHeadHeight()}}>
      Head
    </Boundary>
    <Boundary className="main-container">
      <Boundary className="vertical-menu"
        style={{width: calcStyle.verticalMenuWidth(),
        height: calcStyle.verticalMenuHeight()}}>
        <VerticalTabMenu
          menuItems={verticalTablMenuItems}
          indexClicked={vTabMenuIndexClicked}
          setVTabIndexClicked={setVTabIndexClicked}
          setVTabVisible={setVTabVisible}/>
          <NodeDndContext setDraggingNode={setDraggingNode}
            getShowingPanelSize={getShowingPanelSize}>
            <Accordion accordItems={accordionPanelItems} show={tabVisible[0]}/>
            <NodeDragOverlay draggingNode={draggingNode}/>
          </NodeDndContext>
      </Boundary>
      <Boundary className="reactFlow-Region" ref={reactFlowRegionBoundaryRef}
        style={{left: calcStyle.leftMargin(),
         height: calcStyle.reactFlowHeight(),
         width: calcStyle.reactFlowWidth()}}>
        <ReactFlowApp/>
      </Boundary>
      <Boundary id='sidebar-property'
        className={clsx('sidebar-property',
          {'invisible' : !panelVisible['property']})}
        style={{top: calcStyle.topMargin(),
          left: calcStyle.sidePropertyLeftMargin(),
          height: calcStyle.sidePropertyHeight(),
          width: calcStyle.sidePropertyWidth()}}>
        Right
      </Boundary>
      <Boundary id='bottom-sheet'
        className={clsx('bottom-sheet',
        {'invisible' : !panelVisible['bottomSheet']} )}
      style={{
        top: calcStyle.bottomSheetCurTopMargin(curBottomSheetHeight),
        height: calcStyle.bottomSheetCurHeight(curBottomSheetHeight),
        width: `100vw`}}
      ref={bottomBoundaryRef}>
        <Boundary className="resize-bar"
          {...registMouseEvent((deltaX, deltaY) => {
            if(!bottomBoundaryRef.current) return;
            let change_size = curBottomSheetHeight - deltaY;
            const {size, limited} = inRange(change_size, layoutSize['minBottomSheet'].height, maxBottomSheetHeight);
            setCurBottomSheetHeight(size);
          })}
          />
        Bottom
      </Boundary>
    </Boundary>
  </div>
  );
}

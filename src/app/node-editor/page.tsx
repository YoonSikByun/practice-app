'use client'

import '@/app/node-editor/css/layout.scss';

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "@/app/node-editor/util/moudeMove";

import ReactFlowApp from "@/app/node-editor/component/react-flow/reactflow"
import Boundary from '@/app/node-editor/component/boundary';
import VerticalTabMenu from "@/app/node-editor/component/menu/verticalTabmenu";
import Accordion from '@/app/node-editor/component/menu/accordion';
import { DraggingNodeProps, NodeDragOverlay } from "@/app/node-editor/component/node/nodeContainer";
import NodeDndContext from "@/app/node-editor/component/dnd-kit/dnd-kit-node-dnd-context";
import {verticalTablMenuItems, accordionPanelItems} from '@/app/node-editor/config/menu'
import {layoutSize, PanelVisible, Rect} from '@/app/node-editor/config/layoutFrame'
import {calcStyle} from '@/app/node-editor/util/calcStyleRegion';
import clsx from 'clsx';

export default function Page() {

  // div dom 현재 크기를 구하기 위한 ref를 생성한다.
  const rectFlowRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 하단시트 마우스 드래그로 크기 조정 위한 최대 크기와 현재 변경된 크기 저장용 useState 생성
  const [maxBottomSheetHeight, setMaxBottomSheetHeight] = useState(0);
  const [curBottomSheetHeight, setCurBottomSheetHeight] = useState(layoutSize['minBottomSheet'].height);

  //좌측 세로탭 메뉴 중에 현제 선택된 탭 index 저장 및 렌더링 반영 위한 useState 
  const [vTabMenuIndexClicked, setVTabIndexClicked] = useState<number>(-1);

  // 좌측 새로탭 메뉴들 마우스 클릭 토글 시에 보임/숨김 상태를 렌더링 하긴 위햔 useState
  const [tabVisible, setVTabVisible] = useState<boolean[]>(Array(verticalTablMenuItems.length).fill(false));

  //하단시트(패널)와 우측 패널 보임/숨김 상태 변경 렌터링 하긴 위한 useState
  const [panelVisible, setPanelVisible] = useState<PanelVisible>({bottomSheet: true, sideProperty: true});

  // 메뉴에서 선택되어 드래중인 컨퍼넌트 렌더링위한 값들
  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', className: ''});

  const getRefRect = (ref : any) => {
    const r : Rect = ref.current?.getBoundingClientRect() as Rect;
    if(r) return r; else  return {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0};}

  const getValidReactFlowRect = () => {
    const r = getRefRect(rectFlowRef);
    let sr = {
      top : r.top,
      left : r.left + calcStyle.getShowingMenuWidth(tabVisible),
      right: r.right - (panelVisible['sideProperty'] ? layoutSize['sidebarProperty'].width : 0),
      bottom: r.bottom - (panelVisible['bottomSheet'] ? curBottomSheetHeight : 0),
      width: 0, height: 0};
    sr['height'] = sr['bottom'] - sr['top'];
    sr['width'] = sr['right'] - sr['left'];
    return sr;}

  // 초기 렌더링 직후 1회만 호출하기 위해 useEffect 사용
  useEffect(() => {
    //초기 하단시트 높이 구하기
    setCurBottomSheetHeight(getRefRect(bottomRef).height);
    //하단시크 최대 높이는 ReactFlow 영역 80%까지로 제한
    setMaxBottomSheetHeight(getRefRect(rectFlowRef).height * 0.8);
  }, []);

  const closeBottomSheet = () => (setPanelVisible((prev : PanelVisible) => ({...prev, bottomSheet: false})));
  const closeSideProperty = () => (setPanelVisible((prev : PanelVisible) => ({...prev, sideProperty: false})));

  return (
  <div className="node-editor">
    <Boundary className='head'
      style={{height: calcStyle.topHeadHeight()}}
    >
      Head
    </Boundary>
    <Boundary className="main-container">
      <Boundary className="vertical-menu"
        style={{width: calcStyle.verticalMenuWidth(),
        height: calcStyle.verticalMenuHeight()}}
      >
        <VerticalTabMenu
          menuItems={verticalTablMenuItems}
          indexClicked={vTabMenuIndexClicked}
          setVTabIndexClicked={setVTabIndexClicked}
          setVTabVisible={setVTabVisible}/>
          <NodeDndContext setDraggingNode={setDraggingNode}
            targetValidRect={getValidReactFlowRect()}
          >
            <Accordion accordItems={accordionPanelItems} show={tabVisible[0]}/>
            <NodeDragOverlay draggingNode={draggingNode}/>
          </NodeDndContext>
      </Boundary>
      <Boundary className="reactFlow-Region" ref={rectFlowRef}
        style={{left: calcStyle.leftMargin(),
         height: calcStyle.reactFlowHeight(),
         width: calcStyle.reactFlowWidth()}}>
        <ReactFlowApp/>
      </Boundary>
      <Boundary
        className={clsx('sidebar-property',
          {'invisible' : !panelVisible['sideProperty']})}
        style={{top: calcStyle.topMargin(),
          left: calcStyle.sidePropertyLeftMargin(),
          height: calcStyle.sidePropertyHeight(),
          width: calcStyle.sidePropertyWidth()}}
      >
        <p>Side property</p><button className={clsx('border-solid border-2 border-indigo-600')} onClick={closeSideProperty}>Close X</button>
      </Boundary>
      <Boundary className={clsx('bottom-sheet',
        {'invisible' : !panelVisible['bottomSheet']} )}
        style={{
          top: calcStyle.bottomSheetCurTopMargin(curBottomSheetHeight),
          left: calcStyle.bottomSheetCurLeftMargin(tabVisible),
          height: calcStyle.bottomSheetCurHeight(curBottomSheetHeight),
          width: calcStyle.bottomSheetCurWidth(tabVisible, panelVisible['sideProperty'])}}
        ref={bottomRef}
      >
        <Boundary className="resize-bar"
          {...registMouseEvent((deltaX, deltaY) => {
            if(!bottomRef.current) return;
            let change_size = curBottomSheetHeight - deltaY;
            const {size, limited} = inRange(change_size, layoutSize['minBottomSheet'].height, maxBottomSheetHeight);
            setCurBottomSheetHeight(size);
          })}
        />
          <p>Bottom</p><button className={clsx('border-solid border-2 border-indigo-600')} onClick={closeBottomSheet}>Close X</button>
      </Boundary>
    </Boundary>
  </div>
  );
}

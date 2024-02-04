'use client'

import '@/app/node-editor/css/layout.scss';

import { useState, useRef, useEffect, useCallback } from "react";
import {registMouseEvent, inRange} from "@/app/node-editor/util/moudeMove";

import ReactFlowApp from "@/app/node-editor/component/react-flow/reactflow"
import Boundary from '@/app/node-editor/component/boundary';
import VerticalTabMenu from "@/app/node-editor/component/menu/verticalTabmenu";
import Accordion from '@/app/node-editor/component/menu/accordion';
import {verticalTablMenuItems, accordionPanelItems} from '@/app/node-editor/config/menu'
import {layoutSize, Rect} from '@/app/node-editor/config/layoutFrame'
import {calcStyle} from '@/app/node-editor/util/calcStyleRegion';
import clsx from 'clsx';
import BottomSheet from "@/app/node-editor/component/bottomSheet/BottomSheet";


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
  const [sidePropertyVisible, setSidePropertyVisible] = useState<boolean>(true);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(true);

  const getRefRect = (ref : any) => {
    const r : Rect = ref.current?.getBoundingClientRect() as Rect;
    if(r) return r; else  return {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0};}

  // 초기 렌더링 직후 1회만 호출하기 위해 useEffect 사용
  useEffect(() => {
    //초기 하단시트 높이 구하기
    setCurBottomSheetHeight(getRefRect(bottomRef).height);
    //하단시크 최대 높이는 ReactFlow 영역 80%까지로 제한
    setMaxBottomSheetHeight(getRefRect(rectFlowRef).height * 0.8);
  }, []);

  // 패널들 보여짐 상태 변경 렌더링 위해
  
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  
  const callBackReactFlowChanges = useCallback((nodes : string[], edges : string[]) => {
    setSelectedNodes(nodes);
    setSelectedEdges(edges);
    console.log(`----- Selected nodes: ${nodes.join(', ')}`);
    console.log(`----- Selected edges: ${edges.join(', ')}`);
    setBottomSheetVisible(nodes.length === 1);
  }, [setSelectedNodes, setSelectedEdges]);

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
            <Accordion accordItems={accordionPanelItems} show={tabVisible[0]}/>
      </Boundary>
      <Boundary className="reactFlow-Region" ref={rectFlowRef}
        style={{left: calcStyle.leftMargin(),
         height: calcStyle.reactFlowHeight(),
         width: calcStyle.reactFlowWidth()}}>
        <ReactFlowApp callBackReactFlowChanges={callBackReactFlowChanges}/>
      </Boundary>
      <Boundary
        className={clsx('sidebar-property',
          {'invisible' : !sidePropertyVisible})}
        style={{top: calcStyle.topMargin(),
          left: calcStyle.sidePropertyLeftMargin(),
          height: calcStyle.sidePropertyHeight(),
          width: calcStyle.sidePropertyWidth()}}
      >
        <p>Side property</p><button className={clsx('border-solid border-2 border-indigo-600')} onClick={()=>setSidePropertyVisible(false)}>Close X</button>
      </Boundary>
      <Boundary className={clsx('bottom-sheet',
        {'invisible' : !bottomSheetVisible} )}
        style={{
          top: calcStyle.bottomSheetCurTopMargin(curBottomSheetHeight),
          left: calcStyle.bottomSheetCurLeftMargin(tabVisible),
          height: calcStyle.bottomSheetCurHeight(curBottomSheetHeight),
          width: calcStyle.bottomSheetCurWidth(tabVisible, sidePropertyVisible)}}
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
        {/* <BottomSheet
        selectedNodes={selectedNodes}
        showBottomSheet={showBottomSheet} /> */}
          <p>Bottom</p><button className={clsx('border-solid border-2 border-indigo-600')} onClick={() => setBottomSheetVisible(false)}>Close X</button>
      </Boundary>
    </Boundary>
  </div>
  );
}

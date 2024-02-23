'use client'

import '@/app/node-designer/scss/layout.scss';

import { useState, useRef, useEffect } from "react";
import {registMouseEvent, inRange} from "@/app/common/util/moudeMove";

import ReactFlowApp from "@/app/node-designer/component/react-flow/reactflow"
import Boundary from '@/app/common/util/Boundary';
import VerticalTabMenu from "@/app/node-designer/component/menu/verticalTabmenu";
import NodesAccordion from '@/app/node-designer/component/menu/nodesMenu';
import {verticalTablMenuItems, nodesAccordionPanelItems} from '@/app/node-designer/config/menu'
import {layoutSize, outSidePadding} from '@/app/node-designer/config/layoutFrame'
import { Rect } from "@/app/common/util/definition";
import {calcStyle} from '@/app/node-designer/util/calcStyleRegion';
import clsx from 'clsx';
import BottomSheet from "@/app/node-designer/component/bottomSheet/BottomSheet";
import Variables from './component/menu/variables';

export default function NodeDesigner(
  {
    id,
    padding = {top: 0, left: 0, right: 0, bottom: 0},

  } : {
    id : string,
    padding? : {top: number; left: number; right: number; bottom: number},
  }) {
  // 외부에서 NodeDesginer 컨퍼넌트를 사용을 고려해 외부에 사용중인 상하좌우 여백 크기를 설정해준다.
  outSidePadding.set(padding);

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
  const [bottomsheetNodeId, setBottomsheetNodeId] = useState<string>('');

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

  return (
  <div className={clsx("node-designer")} id={id}>
    {/* 최 상단 툴바 */}
    <Boundary className='toolbar bg-hanablue-300 border-hanablue-500 border-b-[2px]'
      style={{top: calcStyle.topOutsideMargin(), height: calcStyle.topToolbarHeight()}}
    >
      Toolbar
    </Boundary>
    {/* 메인 바디 */}
    <Boundary className="main-container">
      {/* 좌측 세로 메뉴 */}
      <Boundary className="vertical-menu"
        style={{top: calcStyle.topMargin(), width: calcStyle.verticalMenuWidth(),
        height: calcStyle.verticalMenuHeight()}}
      >
        {/* 세로 메뉴 탭헤더 */}
        <VerticalTabMenu
          menuItems={verticalTablMenuItems}
          indexClicked={vTabMenuIndexClicked}
          setVTabIndexClicked={setVTabIndexClicked}
          setVTabVisible={setVTabVisible}/>
            {/* 노드 선택 메뉴 */}
            <NodesAccordion accordItems={nodesAccordionPanelItems} show={tabVisible[0]}/>
            {/* 변수 설정 메뉴 */}
            <Variables show={tabVisible[1]}/>
      </Boundary>
      {/* Reactflow 영역 */}
      <Boundary className="reactFlow-Region" ref={rectFlowRef}
        style={{
          top: calcStyle.topMargin(),
          left: calcStyle.reactFlowCurLeftMargin(tabVisible),
          height: calcStyle.reactFlowCurHeight(bottomsheetNodeId !== '' ? curBottomSheetHeight : 0),
          width: calcStyle.reactFlowCurWidth(tabVisible, sidePropertyVisible)}}
      >
        <ReactFlowApp id={id} setBottomsheetNodeId={setBottomsheetNodeId}/>
      </Boundary>
      {/* 우측 세로 속성창 영역 */}
      <Boundary
        className={clsx('sidebar-property',
          {'invisible' : !sidePropertyVisible})}
        style={{
          top: calcStyle.topMargin(),
          left: calcStyle.sidePropertyLeftMargin(),
          height: calcStyle.sidePropertyHeight(),
          width: calcStyle.sidePropertyWidth()}}
      >
        <p>Side property</p>
        <button className={clsx('border-solid', 'border-2', 'border-indigo-600')} onClick={()=>setSidePropertyVisible(false)}>
          Close X
        </button>
      </Boundary>
      {/* 하단 노드 Sheet editor */}
      <Boundary className={clsx('bottom-sheet',
        {'invisible' : bottomsheetNodeId === ''} )}
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
        <p>Bottom</p>
        <button
          className={clsx('border-solid border-2', 'border-indigo-600')}
          onClick={() => setBottomsheetNodeId('')}
        >
          Close X
        </button>
        <BottomSheet selectedNodes={bottomsheetNodeId} />
      </Boundary>
    </Boundary>
  </div>
  );
}

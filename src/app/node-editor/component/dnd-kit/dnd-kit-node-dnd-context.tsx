import { DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { DraggingNodeProps } from "@/app/node-editor/component/node/nodeContainer";
import {Rect} from '@/app/node-editor/config/layoutFrame';
import { CreateReactFlowNewNode } from "@/app/node-editor/component/react-flow/reactflow";

type ElapsedTime = {
  id : string;
  startDragTime : number;
  endDragTime: number;
  clickCount : number;
}

//메뉴에서 디자인노드를 더블클릭하면 노드 생성을 위한 관리자 클래스
class DbClickMngr {
  elapsedTime: ElapsedTime;

  constructor( value : ElapsedTime) { this.elapsedTime = value; }

  //첫 번째 클릭인지 확인
  isFirstClick() {
    if(this.elapsedTime['startDragTime'] > 0) return false;
    return true; }

  //두 번째 클릭인지 확인
  isSecondClick(id : string) {
    if(this.elapsedTime['startDragTime'] <= 0) return false;

    const timeDiff = performance.now() - this.elapsedTime['startDragTime']; //in ms
    const secDiff = timeDiff / 1000; // strip the ms 

    if(0 < secDiff &&  1 >= secDiff)
      if(this.elapsedTime['id'] == id) return true;
    
    return false; }

  //첫 번째 클릭 처리
  firstClick(id : string) {
    this.elapsedTime['startDragTime'] = performance.now();
    this.elapsedTime['id'] = id;
    this.elapsedTime['clickCount'] = 1; }

  //두 번째 클릭 처리
  secondClick() { this.elapsedTime['clickCount']++; }

  //더블 클릭되었는지 확인
  isDoubleClick() {
    if(this.elapsedTime['clickCount'] > 1) return true;
    return false; }

  //클릭 상태 초기화
  clear() {
    this.elapsedTime['startDragTime'] = 0;
    this.elapsedTime['id'] = '';
    this.elapsedTime['clickCount'] = 0;}
}

const dblClickMngr = new DbClickMngr({id : "", startDragTime : 0, endDragTime: 0, clickCount : 0});

export default function NodeDndContext(
    {
      targetValidRect,
      setDraggingNode,
      children
    } : {
      targetValidRect : Rect,
      setDraggingNode : (prev : any) => void,
      children : React.ReactNode
    })
{
    const onDragStart = (e: DragStartEvent) => {

      //DndKeyDragOverlay 중에 이동중인 노드를 렌더링할 수 있도록 현재 드래그중인 노드 크기 등 정보를 useState에 넣어준다.
      setDraggingNode(((prev : DraggingNodeProps) => ({...prev,
        key: e.active.data.current?.drag_key,
        width: e.active.data.current?.width,
        height: e.active.data.current?.height,
        nodeKind: e.active.data.current?.nodeKind,
        className: e.active.data.current?.className})));

      if(dblClickMngr.isFirstClick())
        dblClickMngr.firstClick(e.active.id as string);
      else if(dblClickMngr.isSecondClick(e.active.id as string))
        dblClickMngr.secondClick();
      else
        dblClickMngr.clear();
    }

    const onDragEnd = (e: DragEndEvent) => {
      //Drag가 끝나 Drop되면 드래그중인 노드정보를 초기화한다.
      setDraggingNode(((prev : DraggingNodeProps) => ({...prev,
        drag_key: '',
        width: 0,
        height: 0,
        nodeKind: '',
        className: ''})));

      const droppedRect = e.active.rect.current.translated;

      const dr : Rect = {
        top : (droppedRect?.top ?? 0),
        left : (droppedRect?.left ?? 0),
        right : (droppedRect?.right ?? 0),
        bottom : (droppedRect?.bottom ?? 0),
        height : (droppedRect?.bottom ?? 0) - (droppedRect?.top ?? 0),
        width : (droppedRect?.right ?? 0) - (droppedRect?.left ?? 0)};

      if(dblClickMngr.isDoubleClick())
      {
          // alert(`Double Click! - ${lt}`);
          CreateReactFlowNewNode('double-click', dblClickMngr.elapsedTime['id'], dr);
          dblClickMngr.clear();
          return;
      }

      // 노드가 Drop된 위치가 React-flow 유효 영역인지 확인한다.
      const isDroppable = (
          droppedRect && (
            targetValidRect.top <= dr.top &&
            targetValidRect.left <= dr.left &&
            targetValidRect.right >= dr.right &&
            targetValidRect.bottom >= dr.bottom
          )) ? true : false;

      //Drop 가능한 유효 영역이면 노드를 생성한다.
      if(isDroppable) 
      {
        // alert(`Dropped in valid-regin!! - ${lt}`);
        CreateReactFlowNewNode('drop', dblClickMngr.elapsedTime['id'], dr);
        dblClickMngr.clear();
      }
    }

    return (
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {children}
      </DndContext>
    );
}

import { DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { DraggingNodeProps } from "../workflow/ui/nodeContainer";

export type ComponentRegionSize = {
    reactFlowRect : any,
    curBottomSheetHeight : number,
    showMenuPanelHeight : number,
    showMenuPanelWidth : number
}

export default function NodeDndContext(
    {
        setDraggingNode,
        getComponentRegionSize,
        children
    } : {
        setDraggingNode : (prev : any) => void,
        getComponentRegionSize : () => ComponentRegionSize,
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
          designMode: e.active.data.current?.designMode})));
    }

      const onDragEnd = (e: DragEndEvent) => {
        //Drag가 끝나 Drop되면 드래그중인 노드정보를 초기화한다.
        setDraggingNode(((prev : DraggingNodeProps) => ({...prev,
          drag_key: '',
          width: 0,
          height: 0,
          nodeKind: '',
          designMode: false})));

          const droppedRect = e.active.rect.current.translated;
          console.log(`[DropRect] top : ${droppedRect?.top}, left : ${droppedRect?.left}, right : ${droppedRect?.right}, bottom : ${droppedRect?.bottom}`);
        
          const componentRegionSize : ComponentRegionSize = getComponentRegionSize();
          const reactFlowRegionRect : any = componentRegionSize.reactFlowRect;

          //실제 노드 Drop이 가능한 영역만 계산한다.
          const reactFlowValidRegion = {
            top : reactFlowRegionRect.top,
            left : reactFlowRegionRect.left + componentRegionSize.showMenuPanelWidth,
            right : reactFlowRegionRect.right,
            bottom : reactFlowRegionRect.bottom - componentRegionSize.curBottomSheetHeight
        }

        // console.log(`reactFlowRegionRect top : ${reactFlowRegionRect.top}, left : ${reactFlowRegionRect.left}, right : ${reactFlowRegionRect.right}, bottom: ${reactFlowRegionRect.bottom}`);
        // console.log(`reactFlowValidRegion top : ${reactFlowValidRegion.top}, left : ${reactFlowValidRegion.left}, right : ${reactFlowValidRegion.right}, bottom: ${reactFlowValidRegion.bottom}`);
        // console.log(`curBottomSheetHeight : ${componentRegionSize.curBottomSheetHeight}, showMenuPanelHeight : ${componentRegionSize.showMenuPanelHeight}, showMenuPanelWidth : ${componentRegionSize.showMenuPanelWidth}`);

        // 노드가 Drop된 위치가 React-flow 유효 영역인지 확인한다.
        const isDroppable = (
            droppedRect && (
                reactFlowValidRegion.top <= droppedRect.top &&
                reactFlowValidRegion.left <= droppedRect.left &&
                reactFlowValidRegion.right >= droppedRect.right &&
                reactFlowValidRegion.bottom >= droppedRect.bottom
                )) ? true : false;

        isDroppable && alert('생성할 수 있습니다!!!!');
      }

      return (
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            {children}
        </DndContext>
      );
}

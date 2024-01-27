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
        setDraggingNode(((prev : DraggingNodeProps) => ({...prev,
          key: e.active.data.current?.drag_key,
          width: e.active.data.current?.width,
          height: e.active.data.current?.height,
          nodeKind: e.active.data.current?.nodeKind,
          designMode: e.active.data.current?.designMode})));
    }

      const onDragEnd = (e: DragEndEvent) => {
        const endKey = e.active.data.current?.drag_key;
        setDraggingNode(((prev : DraggingNodeProps) => ({...prev,
          drag_key: '',
          width: 0,
          height: 0,
          nodeKind: '',
          designMode: false})));

          const drop_rect = e.active.rect.current.translated;
          console.log(`[DropRect] top : ${drop_rect?.top}, left : ${drop_rect?.left}, right : ${drop_rect?.right}, bottom : ${drop_rect?.bottom}`);
        
          const componentRegionSize : ComponentRegionSize = getComponentRegionSize();
          console.log(`showMenuPanelHeight : ${componentRegionSize.showMenuPanelHeight}, showMenuPanelWidth : ${componentRegionSize.showMenuPanelWidth}`);
      }

      return (
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            {children}
        </DndContext>
      );
}

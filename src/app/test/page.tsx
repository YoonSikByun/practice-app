'use client'

import NodeContainer,
{ NodeItem, DropZone, DraggingNodeProps, NodeDragOverlay }
from "@/app/node-editor/component/node/nodeContainer";
import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";

import DndKitDraggable from "@/app/node-editor/component/dnd-kit/dnd-kit-draggable";
import DndKitDroppable from "@/app/node-editor/component/dnd-kit/dnd-kit-droppable";
import NodeBoundary from "../node-editor/component/node/nodeBoundary";

const nodeItems1 : NodeItem[] = [
  {id: uuid(), nodeKind: 'Kind0'},
  {id: uuid(), nodeKind: 'Kind1'},
  {id: uuid(), nodeKind: 'Kind2'},
  {id: uuid(), nodeKind: 'Kind3'},
  {id: uuid(), nodeKind: 'Kind4'},
  {id: uuid(), nodeKind: 'Kind5'},
  {id: uuid(), nodeKind: 'Kind6'},
  {id: uuid(), nodeKind: 'Kind7'},
  {id: uuid(), nodeKind: 'Kind8'},
  {id: uuid(), nodeKind: 'Kind9'},
  {id: uuid(), nodeKind: 'Kind10'},
  {id: uuid(), nodeKind: 'Kind11'},
  {id: uuid(), nodeKind: 'Kind12'},
  {id: uuid(), nodeKind: 'Kind13'},
  {id: uuid(), nodeKind: 'Kind14'},
  {id: uuid(), nodeKind: 'Kind15'},
  {id: uuid(), nodeKind: 'Kind16'},
  {id: uuid(), nodeKind: 'Kind17'}
];

const node_width_px = 130;
const node_height_px = 50;

export default function App() {
  const [draggingNode, setDraggingNode] = useState<DraggingNodeProps>({key: '', width: 0, height: 0, nodeKind: '', designMode: false});
  const onDragStart = (e: DragStartEvent) => {
    const startKey = e.active.data.current?.drag_key
    const startHeight = e.active.data.current?.height
    console.log(`draggingNode.key : ${draggingNode.key},  startKey : ${startKey}, startHeight : ${startHeight}`);
    setDraggingNode((prev => ({...prev,
      key: e.active.data.current?.drag_key,
      width: e.active.data.current?.width,
      height: e.active.data.current?.height,
      nodeKind: e.active.data.current?.nodeKind,
      designMode: e.active.data.current?.designMode})));
  }
  const onDragEnd = (e: DragEndEvent) => {
    const endKey = e.active.data.current?.drag_key;
    console.log(`e.over?.id : ${e.over?.id}, draggingNode.key : ${draggingNode.key}, endKey : ${endKey}`);
    setDraggingNode((prev => ({...prev,
      drag_key: '',
      width: 0,
      height: 0,
      nodeKind: '',
      designMode: false})));
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-2">
          <DndKitDraggable key='draggable-1'
            drag_key='draggable-1'
            width={node_width_px}
            height={node_height_px}
            nodeKind={'Node1'}
            designMode={true}>

            <NodeBoundary width={node_width_px}
              height={node_height_px}
              nodeKind='draggable-1'
              designMode={true}/>

        </DndKitDraggable>
        <DropZone/>
        
      </div>
    </DndContext>
  );
}

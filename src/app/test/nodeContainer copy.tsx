import React, { useState } from "react";
import clsx from 'clsx';
import NodeBoundary from './nodeBoundary';

import DndKitDraggable from "@/app/node-editor/component/dnd-kit/dnd-kit-draggable";
import DndKitDroppable from "@/app/node-editor/component/dnd-kit/dnd-kit-droppable";
import "@/app/node-editor/css/util/dnd-kit-droppable.scss";
import {DragOverlay} from '@dnd-kit/core';

export type NodeItem = {
  id: string;
  nodeKind: string;
};

export default function NodeContainer(
  {
    id,
    nodeItems,
    node_width_px,
    node_height_px,
  } : {
    id : string,
    nodeItems : NodeItem[],
    node_width_px: number,
    node_height_px : number,
  }
) {

  // const midIndex = Math.floor(nodeItems.length / 2);
  // const col1 = nodeItems.slice(0, midIndex);
  // const col2 = nodeItems.slice(midIndex);

  return (
    <div className={clsx('flex w-full')}>
    {
      nodeItems.map((nodeItem, index) => (
        <DndKitDraggable key={`${id}-${index}`} drag_key={`${id}-${index}`} width={node_width_px} height={node_height_px} nodeKind={nodeItem.nodeKind} designMode={true}>
          <NodeBoundary key={`${id}-${index}`}
            width={node_width_px}
            height={node_height_px}
            nodeKind={nodeItem.nodeKind}
            designMode={true}/>
        </DndKitDraggable>
      ))
    }
    </div>
  );
}

export const DropZone = () => (
  <DndKitDroppable id='drop-zone'>
    <div className='dropzone-overlayDiv'>
      Please, Drop here!!!!!!!!!!!
    </div>
  </DndKitDroppable>
);

export type DraggingNodeProps = {
  key : string;
  height : number;
  nodeKind : string;
  designMode : boolean;
};

export const NodeDragOverlay = ({draggingNode} : {draggingNode : DraggingNodeProps}) => (
  <DragOverlay>
    {draggingNode.height ? (
      <NodeBoundary
      height={draggingNode.height}
      nodeKind={draggingNode.nodeKind}
      designMode={draggingNode.designMode}/>
    ): null}
  </DragOverlay>
);
import React, { useState } from "react";
import clsx from 'clsx';
import NodeBoundary from './nodeBoundary';

import DndKitDraggable from "@/app/util/dnd-kit-draggable";
import DndKitDroppable from "@/app/util/dnd-kit-droppable";
import "@/css/util/dnd-kit-droppable.scss";
import {DragOverlay} from '@dnd-kit/core';

export type NodeItem = {
  id: string;
  node_kind: string;
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
  return (
    <div className={clsx('grid grid-cols-2')}>
    {
      nodeItems.map((nodeItem, index) => (
        <DndKitDraggable key={`${id}-${index}`} drag_key={`${id}-${index}`}
          width={node_width_px} height={node_height_px} nodeKind={nodeItem.node_kind}
          designMode={true}>

          <NodeBoundary key={`${id}-${index}`} width={node_width_px}
            height={node_height_px} nodeKind={nodeItem.node_kind} designMode={true}/>

        </DndKitDraggable>))
    }
    </div>
  );
}

// export const DropZone = () => (
//   <DndKitDroppable id='drop-zone'>
//     <div className='dropzone-overlayDiv'>
//       Please, Drop here!!!!!!!!!!!
//     </div>
//   </DndKitDroppable>
// );

export function DropZone() {
    return (
    <DndKitDroppable id='drop-zone'>
      <div className='dropzone-overlayDiv'>
        Please, Drop here!!!!!!!!!!!
      </div>
    </DndKitDroppable>
    );
}

export type DraggingNodeProps = {
  key : string;
  width: number;
  height : number;
  nodeKind : string;
  designMode : boolean;
};

export const NodeDragOverlay = (
  {
    draggingNode
  } : {
    draggingNode : DraggingNodeProps
  }
) => (
  <DragOverlay dropAnimation={null}>
    {draggingNode.height ? (
      <NodeBoundary
        width={draggingNode.width}
        height={draggingNode.height}
        nodeKind={draggingNode.nodeKind}
        designMode={draggingNode.designMode}/>
    ): null}
  </DragOverlay>
);

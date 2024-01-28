import React, { useState } from "react";
import clsx from 'clsx';
// import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';
import NodeDesignBoundary from '@/app/node-editor/component/node/nodeDesignBoundary';

import DndKitDraggable from "@/app/node-editor/component/dnd-kit/dnd-kit-draggable";
// import DndKitDroppable from "@/app/node-editor/component/dnd-kit/dnd-kit-droppable";
import "@/css/util/dnd-kit-droppable.scss";
import {DragOverlay} from '@dnd-kit/core';
// import { createPortal } from "react-dom";

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

          <NodeDesignBoundary key={`${id}-${index}`} width={node_width_px}
            height={node_height_px} nodeKind={nodeItem.node_kind}/>

        </DndKitDraggable>))
    }
    </div>
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
      <NodeDesignBoundary
        width={draggingNode.width}
        height={draggingNode.height}
        nodeKind={draggingNode.nodeKind}/>
    ): null}
  </DragOverlay>
);

// export function DropZone() {
//   return (
//   <DndKitDroppable id='drop-zone'>
//     <div className='dropzone-overlayDiv'>
//       Please, Drop here!!!!!!!!!!!
//     </div>
//   </DndKitDroppable>
//   );
// }

// export function PortalAwareItem({show} : {show : boolean}) {
//     if(!show) return null;
//     const child = (
//       <DropZone/>
//     );
//   let portal : any = document.getElementById('Portal-DropZone');
//   return createPortal(child, portal);
// }
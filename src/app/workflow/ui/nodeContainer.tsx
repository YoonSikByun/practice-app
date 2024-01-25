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

  const midIndex = Math.floor(nodeItems.length / 2);
  const col1 = nodeItems.slice(0, midIndex);
  const col2 = nodeItems.slice(midIndex);

  return (
    <div className={clsx('flex w-full')}>
      <NodeColumn
        id={`${id}-${1}`}
        nodeItems={col1}
        item_width={node_width_px}
        item_height={node_height_px}
      />
      <NodeColumn
        id={`${id}-${2}`}
        nodeItems={col2}
        item_width={node_width_px}
        item_height={node_height_px}
      />
    </div>
  );
}

function NodeColumn(
  {
    id,
    nodeItems,
    item_width,
    item_height,
  } : {
    id : string,
    nodeItems : NodeItem[],
    item_width: number,
    item_height : number,
  }
) {

  return (
      <div style={{width:`${item_width}px`}}>
      {
        nodeItems.map((nodeItem, index) => (
          <DndKitDraggable key={`${id}-${index}`} drag_key={`${id}-${index}`} height={item_height} nodeKind={nodeItem.node_kind} designMode={true}>
            <NodeBoundary key={`${id}-${index}`}
              height={item_height}
              nodeKind={nodeItem.node_kind}
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
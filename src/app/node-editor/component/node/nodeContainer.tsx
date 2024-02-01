import clsx from 'clsx';
import NodeDesignBoundary from '@/app/node-editor/component/node/nodeDesignBoundary';
import DndKitDraggable from '@/app/node-editor/component/dnd-kit/dnd-kit-draggable';


import {DragOverlay} from '@dnd-kit/core';
import {NodeItem} from '@/app/node-editor/config/node';
import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';

export default function NodeContainer(
  {
    nodeItems
  } : {
    nodeItems : NodeItem[]
  }
) {
  return (
    <div className={clsx('grid grid-cols-2')}>
    {
      nodeItems.map((nodeItem, index) => (
        <DndKitDraggable
          key={nodeItem['id']} drag_key={nodeItem['id']}
          width={nodeItem['designNodeSize'].width}
          height={nodeItem['runNodeSize'].height}
          nodeKind={nodeItem.nodeKind}
          //드래그 했을 때 보이는 디자인은 Run모드로 보여준다.
          className={nodeItem['runClassName']}>

          <NodeDesignBoundary
            key={nodeItem['id']}
            nodeKind={nodeItem['nodeKind']}
            width={nodeItem['designNodeSize'].width}
            height={nodeItem['runNodeSize'].height}
            className={nodeItem['designClassName']}/>

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
  className : string;
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
        className={draggingNode.className}
        />
    ): null}
  </DragOverlay>
);

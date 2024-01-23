import '@/css/beautiful-dnd/beautiful-dnd.scss';

import React from "react";
import clsx from 'clsx';
import NodeBoundary from './nodeBoundary';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/app/draganddrop/strictmodedroppable';
import {
  DroppableProvided, 
  DraggableProvided, 
  DroppableStateSnapshot, 
  DraggableStateSnapshot } from 'react-beautiful-dnd';

export type NodeItem = {
  id: string;
  node_kind: string;
};

export default function NodeContainer(
  {
    nodeItems,
    node_width_px,
    node_height_px,
    container_height,
    className
  } : {
    nodeItems : NodeItem[],
    node_width_px: number,
    node_height_px : number,
    container_height : number,
    className : string
  }
) {

  const [shoppingBagItems, setShoppingBagItems] = React.useState<string[]>([]);
  const onDragEnd = React.useCallback(
    (result : DropResult) => {
      const { source, destination } = result;
      // console.log(`source.droppableId : ${source.droppableId}`);
      // console.log(`destination : ${destination}`);
      if (!destination) return;

      // switch (source.droppableId) {
      //   case destination.droppableId:
      //     console.log(`destination.droppableId : ${destination.droppableId}`);
      //     setShoppingBagItems((state : any) =>
      //       reorder(state, source.index, destination.index)
      //     );
      //     break;
      //   case source.droppableId:
      //     console.log(`source.droppableId : ${source.droppableId}`);
      //     setShoppingBagItems((state : any) =>
      //       copy(nodeItems, state, source.index, destination.index)
      //     );
      //     break;
      //   default:
      //     break;
      // }
    },
    [setShoppingBagItems]
  );

  const midIndex = Math.floor(nodeItems.length / 2);
  const col1 = nodeItems.slice(0, midIndex);
  const col2 = nodeItems.slice(midIndex);

  return (
    <div className={clsx('flex w-full', className)}
    style={{height: `${container_height}px`}}>
      <NodeColumn
        nodeItems={col1}
        item_width={node_width_px}
        item_height={node_height_px}
        onDragEnd={onDragEnd}
      />
      <NodeColumn
        nodeItems={col2}
        item_width={node_width_px}
        item_height={node_height_px}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

function NodeColumn(
  {
    nodeItems,
    item_width,
    item_height,
    onDragEnd
  } : {
    nodeItems : NodeItem[],
    item_width: number,
    item_height : number,
    onDragEnd : (result : DropResult) => void
  }
) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="NodeContainer"
          renderClone={(provided, snapshot, rubric) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={clsx({'node_dragging': snapshot.isDragging})}
                style={provided.draggableProps.style}
              >
                <NodeBoundary
                  height={item_height}
                  nodeKind={nodeItems[rubric.source.index].node_kind}
                  designMode={true}/>
              </div>
            )}
          isDropDisabled={true} 
        >
          {(provided : DroppableProvided, snapshot : DroppableStateSnapshot) => (
            <ul style={{width:`${item_width}px`}} ref={provided.innerRef} {...provided.droppableProps}>
              {
                  nodeItems.map((nodeItem, index) => {
                    const shouldRenderClone = nodeItem.id === snapshot.draggingFromThisWith;
                    let nodeBoundaryComponent = () => (
                      <NodeBoundary
                        height={item_height}
                        nodeKind={nodeItem.node_kind}
                        designMode={true}/>
                    );
                    return (
                      <React.Fragment key={nodeItem.id}>
                        {shouldRenderClone ? (
                          <li className={clsx('node-react-beatiful-dnd-copy')}>
                            {nodeBoundaryComponent()}
                          </li>
                        ) : (
                          <Draggable draggableId={nodeItem.id} index={index}>
                            {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
                                <li key={nodeItem.id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={clsx({'node_dragging': snapshot.isDragging})}
                                >
                                  {nodeBoundaryComponent()}
                                </li>
                            )}
                          </Draggable>
                        )}
                      </React.Fragment>
                    );
                  })
              }
              {provided.placeholder}
            </ul>
          )}
      </StrictModeDroppable>
    </DragDropContext>);
}
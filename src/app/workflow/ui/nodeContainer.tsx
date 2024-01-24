import '@/css/beautiful-dnd/beautiful-dnd.scss';

import React, { useState } from "react";
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
    // onDragEnd : (result : DropResult) => void
  }
) {
  
  const [isDragging, SetIsDragging] = useState<boolean>(false);
  // const [shoppingBagItems, setShoppingBagItems] = React.useState<string[]>([]);
  const onDragEnd = React.useCallback(
    (result : DropResult) => {
      const { source, destination } = result;
      console.log(`source.droppableId : ${source.droppableId}`);
      console.log(`destination : ${destination}`);
      SetIsDragging(false);
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
    }, [SetIsDragging]
  );

  return (
    // <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId={`NodeContainer-${id}`}
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
                              <React.Fragment>
                                <li ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={clsx({'node_dragging': snapshot.isDragging})}
                                >
                                  {nodeBoundaryComponent()}
                                </li>
                              </React.Fragment>
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
      // </DragDropContext>
    );
}

export const DropZone = ({className} : {className : string}) => (
  <StrictModeDroppable droppableId="DropZone">
  {(provided : DroppableProvided, snapshot : DroppableStateSnapshot) => (
    <div className={
      clsx('dropzone-overlayDiv', className)}
    ref={provided.innerRef}
    {...provided.droppableProps}>
      {
          <Draggable key='drop-region' draggableId='drop-region' index={0}>
            {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
              <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                Please, Drop here!!!!!!!!!!!
              </div>
            )}
          </Draggable>
      }
      {provided.placeholder}
    </div>
  )}
</StrictModeDroppable>
);

import React from "react";
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/app/draganddrop/strictmodedroppable';
import NodeBoundary from "@/app/test/nodeBoundary";
import { DroppableProvided, DraggableProvided, DroppableStateSnapshot, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import { v4 as uuid } from "uuid";

const nodeItems = ['Kind1', 'Kind2', 'Kind3', 'Kind4', 'Kind5', 'Kind6', 'Kind7', 'Kind8', 'Kind9', 'Kind10'];

const onDragEnd = ({ source, destination }: DropResult) => {
    console.log('>>> source', source);
    console.log('>>> destination', destination);
};

const NodeContainer = ({className} : {className : string}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable"
        renderClone={(provided, snapshot, rubric) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="select-none m-[2px] shadow-md bg-orange-200 align-middle text-center border-[1px] border-rose-600 border-solid rounded w-[180px] h-[50px]"
            >
              Item id: {nodeItems[rubric.source.index]}
            </div>
          )}
        isDropDisabled={true}
        >
        {(provided : DroppableProvided, snapshot : DroppableStateSnapshot) => (
          <div className={className} ref={provided.innerRef} {...provided.droppableProps}>
            {
                nodeItems.map((nodeItem, index) => {
                    const shouldRenderClone = nodeItem === snapshot.draggingFromThisWith;
                    console.log(`nodeItem : ${nodeItem}`);
                    let temp = () => <div>{nodeItem}[{index}]</div>;
                    return (
                    <React.Fragment key={nodeItem}>
                        {shouldRenderClone ? (
                            <div className="select-none m-[2px] shadow-md bg-orange-200 align-middle text-center border-[1px] border-rose-600 border-solid rounded w-[180px] h-[50px]"
                            >{temp()}</div>
                        ) : (
                            <Draggable draggableId={nodeItem} index={index}>
                            {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
                                <div key={nodeItem}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="select-none m-[2px] shadow-md bg-orange-200 align-middle text-center border-[1px] border-rose-600 border-solid rounded w-[180px] h-[50px]"
                                >
                                    {temp()}
                                </div>
                            )}
                            </Draggable>
                        )}
                    </React.Fragment>
                    );
                })
            }
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
);

export default NodeContainer;
import { useDraggable } from "@dnd-kit/core";
import React, { FC } from "react";

interface IDndKitDraggable {
  drag_key : string;
  width: number;
  height : number;
  nodeKind : string;
  designMode : boolean;
  children : React.ReactNode;
}

const DndKitDraggable: FC<IDndKitDraggable> = (
  {
    drag_key,
    width,
    height,
    nodeKind,
    designMode,
    children
  } : {
    drag_key : string,
    width : number,
    height : number,
    nodeKind : string,
    designMode : boolean,
    children : React.ReactNode
  }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: drag_key,
    data: {drag_key : drag_key, width: width, height : height, nodeKind : nodeKind, designMode : designMode}
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default DndKitDraggable;

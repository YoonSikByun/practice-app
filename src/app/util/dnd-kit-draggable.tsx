import { useDraggable } from "@dnd-kit/core";
import React, { FC } from "react";
import { CSS } from "@dnd-kit/utilities";

interface IDndKitDraggable {
  drag_key : string;
  height : number;
  nodeKind : string;
  designMode : boolean;
  children : React.ReactNode;
}

const DndKitDraggable: FC<IDndKitDraggable> = (
  {
    drag_key,
    height,
    nodeKind,
    designMode,
    children
  } : {
    drag_key : string,
    height : number,
    nodeKind : string,
    designMode : boolean,
    children : React.ReactNode
  }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: drag_key,
    data: { drag_key : drag_key, height : height, nodeKind : nodeKind, designMode : designMode}
  });

  return (
    <div
      ref={setNodeRef}
      // style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default DndKitDraggable;

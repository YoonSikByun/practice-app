import { useDraggable } from "@dnd-kit/core";
import React, { FC } from "react";
// import {CSS} from '@dnd-kit/utilities';

interface IDndKitDraggable {
  drag_key : string;
  width: number;
  height : number;
  nodeKind : string;
  className : string;
  children : React.ReactNode;
}

const DndKitDraggable: FC<IDndKitDraggable> = (
  {
    drag_key,
    width,
    height,
    nodeKind,
    className,
    children
  } : {
    drag_key : string,
    width : number,
    height : number,
    nodeKind : string,
    className : string,
    children : React.ReactNode
  }
) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: drag_key,
    data: {
      drag_key : drag_key,
      width: width,
      height : height,
      nodeKind : nodeKind,
      className : className }
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      
      {children}
    </div>);
};

export default DndKitDraggable;

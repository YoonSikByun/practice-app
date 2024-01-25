import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

interface IDndKitDroppable {
    id : string;
    children : React.ReactNode;
}

const DndKitDroppable: FC<IDndKitDroppable> = (
    {
        id,
        children
    } : {
        id : string,
        children : React.ReactNode
    }) => {
  const { setNodeRef } = useDroppable({
    id: id
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
};

export default DndKitDroppable;
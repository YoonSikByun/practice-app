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
  }
) => {

  const { setNodeRef } = useDroppable({id: id});

  return (
    <div ref={setNodeRef} className='dropzone-overlayDiv'>
        111111111111111111111111111
        11111111111111111111111111
        111111111111111111
    </div>
  );
};

export default DndKitDroppable;
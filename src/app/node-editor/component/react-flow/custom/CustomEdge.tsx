// import {
//     BaseEdge,
//     EdgeLabelRenderer,
//     getStraightPath,
//     useReactFlow,
//   } from 'reactflow';
//   import clsx from 'clsx';

//   export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
//     const { setEdges } = useReactFlow();
//     const [edgePath, labelX, labelY] = getStraightPath({
//       sourceX,
//       sourceY,
//       targetX,
//       targetY,
//     });
  
//     return (
//       <>
//         <BaseEdge id={id} path={edgePath} />
//         <EdgeLabelRenderer>
//           <div
//             style={{
//               position: 'absolute',
//               transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
//               pointerEvents: 'all',
//             }}
//             className={clsx("bg-neutral-400", "text-xs", "text-center",
//                             "rounded-full", "h-[17px]", "w-[17px]", "nodrag", "nopan")}
//             onClick={() => {
//               setEdges((es) => es.filter((e) => e.id !== id));}}
//           >
//             X
//           </div>
//         </EdgeLabelRenderer>
//       </>
//     );
//   }
import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from 'reactflow';

import '@/app/node-editor/css/component/react-flow/custom/buttonedge.scss';

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

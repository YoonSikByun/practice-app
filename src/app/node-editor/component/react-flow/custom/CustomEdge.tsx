import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow
} from 'reactflow';
import '@/app/node-editor/css/component/react-flow/custom/CustomEdge.scss';

function DeleteButton(
    {x, y, onEdgeClick} :
    {x : number, y : number, onEdgeClick : () => void} ) {
    return (
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
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
    );
}

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
  const [edgePath, labelX, labelY] = getSmoothStepPath({
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
      <BaseEdge 
      style={{...style, strokeWidth: 2.5}}
      path={edgePath} markerEnd={markerEnd}/>
      <EdgeLabelRenderer>
        <DeleteButton x={labelX} y={labelY} onEdgeClick={onEdgeClick}/>
      </EdgeLabelRenderer>
    </>
  );
}

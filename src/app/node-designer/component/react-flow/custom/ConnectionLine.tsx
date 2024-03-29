import { ConnectionLineComponentProps } from 'reactflow';

function ConnectionLine({ fromX, fromY, toX, toY }: ConnectionLineComponentProps) {
  return (
    <>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="red" r={10} stroke="#222" strokeWidth={2} />
    </>
  );
}

export default ConnectionLine;
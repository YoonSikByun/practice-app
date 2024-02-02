import { useCallback, useState } from 'react';
import ReactFlow, 
{ addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  ConnectionMode,
  NodeChange,
  ReactFlowInstance,
  XYPosition
} from 'reactflow';
import 'reactflow/dist/style.css';
import {TextUpdaterNode, NodeDataType} from '@/app/node-editor/component/react-flow/custom/TextUpdaterNode';
import { Rect } from '@/app/node-editor/config/layoutFrame';
import { customNodeTypes } from './custom/nodeTypes';
import { v4 as uuid } from "uuid";

const rfStyle = { backgroundColor: '#FFFFFF' };

const initialNodes : NodeDataType[] = [
  { id: uuid(), type: 'Kind0', position: { x: 0, y: 0 }, data: { value: 123 } },
  { id: uuid(), type: 'Kind1', position: { x: 150, y: 100 }, data: { value: 123 } },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };
let externalSetNodes : any = null;
let screenToFlowPosition : any = null;

export function CreateReactFlowNewNode(
  dropType : string,
  nodeId : string,
  dropRect : Rect) {

  if(!screenToFlowPosition) {
    alert(`screenToFlowPosition 없음`);
    return;
  }

  if(dropType != 'drop') {
    alert(`[${dropType} 지원하지 않는 유형입니다.]`);
    return;
  }

  const p : XYPosition = screenToFlowPosition({x: dropRect.top, y: dropRect.left});
  // const p : XYPosition = {x: dropRect.top, y: dropRect.left};
  const newNode : NodeDataType = { id: uuid(), type: 'Kind0', position: { x: p.x, y: p.y }, data: { value: 123 } };

  console.log(`------- dropRect.top : ${dropRect.top}, dropRect.left : ${dropRect.left}`);

  if(externalSetNodes)
  {
    console.log(`------- Call externalSetNodes`);
    externalSetNodes((nds) => nds.concat(newNode));
  }
}

export default function ReactFlowApp() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [instance, setReactFlowInstance] = useState<ReactFlowInstance<any, any>>();

  externalSetNodes = setNodes;

  screenToFlowPosition = useCallback((p : XYPosition) => {
    if(instance) return instance.screenToFlowPosition(p);
    return {x: 0, y: 0};
  }, [instance]);

  const onNodesChange = useCallback(
    (changes : NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]);

  const onEdgesChange = useCallback(
    (changes : any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]);

  const onConnect = useCallback(
    (connection : any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={(instance : any) => setReactFlowInstance(instance)}
      nodeTypes={customNodeTypes}
      connectionMode={ConnectionMode.Loose}
      style={rfStyle}
    >
      <Controls/>
      <MiniMap/>
    </ReactFlow>
  );
}

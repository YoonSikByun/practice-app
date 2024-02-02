import { useCallback, useState } from 'react';
import ReactFlow, 
{ addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  ConnectionMode,
  NodeChange,
  ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import {TextUpdaterNode, NodeDataType} from '@/app/node-editor/component/react-flow/custom/TextUpdaterNode';
import { customNodeTypes, getNodeSize } from './custom/nodeTypes';
import { v4 as uuid } from "uuid";
import { Size } from '@/app/node-editor/config/layoutFrame';

const selector = (s : any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});


const rfStyle = { backgroundColor: '#FFFFFF' };

const initialNodes : NodeDataType[] = [
  { id: uuid(), type: 'Kind0', position: { x: 0, y: 0 }, data: { value: 123 } },
  { id: uuid(), type: 'Kind1', position: { x: 150, y: 100 }, data: { value: 123 } },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

export default function ReactFlowApp() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any>>();

  const onNodesChange = useCallback(
    (changes : NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]);

  const onEdgesChange = useCallback(
    (changes : any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]);

  const onConnect = useCallback(
    (connection : any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]);

  const onDragOver = useCallback((event : any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event : any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowInstance)
        return;

      const s : Size = getNodeSize(type);
      const p = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - (s.width / 2),
        y: event.clientY - (s.height / 2),
      });
      const newNode : NodeDataType = { id: uuid(), type: 'Kind0', position: { x: p.x, y: p.y }, data: { value: 123 } };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const isValidConnection = (connection) => {
    console.log(`[isValidConnection] ${connection.target}, ${connection.source}, ${connection.target},${connection.sourceHandle},${connection.targetHandle}`);
    if(connection.target === connection.source)
      return false;
    return true;
  }
  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType });
  const onConnectEnd = (event) => console.log('on connect end', event);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      nodeTypes={customNodeTypes}
      connectionMode={ConnectionMode.Loose}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={rfStyle}
      isValidConnection={isValidConnection}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
    >
      <Controls/>
      <MiniMap/>
    </ReactFlow>
  );
}

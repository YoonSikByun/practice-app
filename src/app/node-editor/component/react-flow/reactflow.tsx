import { useCallback, useState } from 'react';
import ReactFlow, 
{ addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  // ConnectionMode,
  NodeChange,
  ReactFlowInstance,
  getOutgoers,
  useNodesState,
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { customNodeTypes, getNodeSize, NodeDataType } from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import CustomEdge from '@/app/node-editor/component/react-flow/custom/CustomEdge';
import { v4 as uuid } from "uuid";
import { Size } from '@/app/node-editor/config/layoutFrame';

const rfStyle = { backgroundColor: '#FFFFFF' };

const initialNodes : NodeDataType[] = [
  { id: uuid(), type: 'Kind0', position: { x: 0, y: 0 }, data: { value: 123 } },
  { id: uuid(), type: 'Kind1', position: { x: 50, y: 100 }, data: { value: 123 } },
];

const edgeTypes = {
  'custom-edge': CustomEdge,
};

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

  const onDragOver = useCallback((event : any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event : any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowInstance) return;

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

  const isValidConnection = useCallback(
    (connection : any) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      
      if(!reactFlowInstance) return false;
      const nodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();
      const target = nodes.find((node) => node.id === connection.target);

      console.log(`[source] ${connection.source}, [target] ${connection.target}`);

      if(typeof target === 'undefined')
        return false;      

      const hasCycle = (node : any, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          console.log(`outgoer.id : ${outgoer.id}`);
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      }

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [reactFlowInstance],
  );
  const onConnectStart = (_, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });
  const onConnectEnd = (event) => console.log('on connect end', event);
  const onConnect = useCallback(
    (connection : any) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );
  // const onConnect = useCallback(
  //   (connection : any) => setEdges((eds) => addEdge(connection, eds)),
  // [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      nodeTypes={customNodeTypes}
      edgeTypes={edgeTypes}
      // connectionMode={ConnectionMode.Loose}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={rfStyle}
      isValidConnection={isValidConnection}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
    >
      <Controls position='top-right'/>
      <MiniMap/>
    </ReactFlow>
  );
}

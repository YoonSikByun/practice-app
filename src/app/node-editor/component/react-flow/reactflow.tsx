import { useCallback, useState } from 'react';
import ReactFlow, 
{
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  NodeChange,
  ReactFlowInstance,
  Panel,
  getOutgoers,
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { customNodeTypes, getNodeSize, getNodeData, NodeDataType } from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import CustomEdge from '@/app/node-editor/component/react-flow/custom/CustomEdge';
import { v4 as uuid } from "uuid";
import { Size } from '@/app/node-editor/config/layoutFrame';
import { bgGuideType, RadioBox, CallBackSelectedNodesEdges } from './custom/panel';

const rfStyle = { backgroundColor: '#FFFFFF' };

const initialNodes = [
  { id: uuid(), type: 'Kind0', position: { x: 0, y: 0 }, data: getNodeData('Kind0') },
  { id: uuid(), type: 'Kind1', position: { x: 50, y: 100 }, data: getNodeData('Kind1')}];

const edgeTypes = { 'custom-edge': CustomEdge};

export default function ReactFlowApp(
  {
    callBackReactFlowChanges
  } : {
    callBackReactFlowChanges : (nodes : string[], edges : string[]) => void
  }
) {
  const [nodes, setNodes] = useState<any[]>(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  const [edges, setEdges] = useState<any[]>([]);
  const [bgGuideTypeIdx, setBgGuideTypeIdx] = useState(0);
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
      const newNode = { id: uuid(), type: 'Kind0', position: { x: p.x, y: p.y }, data: getNodeData('Kind0') };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  //노드에 새로운 선 연결 전 가능여부 체크
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

  const onConnectStart = (_ : any, { nodeId, handleType } : any) => console.log('on connect start', { nodeId, handleType });
  // const onConnectEnd = (event) => console.log('on connect end', event);
  const onConnect = useCallback(
    (connection : any) => {
      const edge = {
        ...connection,
        id: uuid(),
        type: 'custom-edge',
        markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 11,
        height: 11,
        color: "red",
      }
    };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <ReactFlowProvider>
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
        // onConnectEnd={onConnectEnd}
        snapToGrid={true}
      >
        <Panel position="top-left">
          <RadioBox selectIndex={bgGuideTypeIdx} items={bgGuideType} setIndexState={setBgGuideTypeIdx} />
        </Panel>
        <Controls position='top-right'/>
        <MiniMap/>
        <Background variant={bgGuideType[bgGuideTypeIdx] as BackgroundVariant}/>
        <CallBackSelectedNodesEdges callBackReactFlowChanges={callBackReactFlowChanges}/>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

import 'reactflow/dist/style.css';
import '@/app/node-editor/css/component/react-flow/reactflow.scss'

import { useCallback, useEffect, useState } from 'react';
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
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlowProvider,
  MiniMapNodeProps
} from 'reactflow';
import { customNodeTypes, getNodeSize, getNodeData } from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import CustomEdge from '@/app/node-editor/component/react-flow/custom/CustomEdge';
import { v4 as uuid } from "uuid";
import { Size } from '@/app/node-editor/config/layoutFrame';
import { nodeChangeCallBackManager } from '@/app/node-editor/util/globalStateManager';
import { RadioButton } from '@/app/node-editor/component/controls/RadioButton';
import ConnectionLine from '@/app/node-editor/component/react-flow/custom/ConnectionLine';

const bgGuideType = ['none', BackgroundVariant.Cross, BackgroundVariant.Dots, BackgroundVariant.Lines];

const rfStyle = { backgroundColor: '#FFFFFF' };
const edgeMarkerEnd = { type: MarkerType.ArrowClosed, width: 11, height: 11, color: "red" };

const initialNodes = [
  { id: uuid(), type: 'Kind0', position: { x: 0, y: 0 }, data: getNodeData('Kind0') },
  { id: uuid(), type: 'Kind1', position: { x: 50, y: 100 }, data: getNodeData('Kind1')}];

const edgeTypes = { 'custom-edge': CustomEdge};

// const CustomMiniMapNode = ({ x, y, width, height, color }: MiniMapNodeProps) => (
//   <circle cx={x} cy={y} r={Math.max(width, height) / 2} fill={color} />
// );

export default function ReactFlowApp(
  {
    setBottomsheetNodeId
  } : {
    setBottomsheetNodeId : (nodeId : string) => void
  }
) {
  const [nodes, setNodes] = useState<any[]>(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  const [edges, setEdges] = useState<any[]>([]);
  const [bgGuideTypeIdx, setBgGuideTypeIdx] = useState(0);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any>>();

  //하단시트 보이기/숨김 위한 설정함수는 최초 렌더링 시점에 한번만 저장하도록 useEffect 처리
  useEffect(() => nodeChangeCallBackManager.registerSetBottomSheetCallback(setBottomsheetNodeId), [setBottomsheetNodeId]);

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

  // 새로운 노드를 생성한다.
  const onDrop = useCallback(
    (event : any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) return;

      const s : Size = getNodeSize(type);
      const p = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - (s.width / 2),
        y: event.clientY - (s.height / 2),
      });
      const newNode = { id: uuid(), type: 'Kind0', position: { x: p.x, y: p.y }, data: getNodeData('Kind0') };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
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

      // console.log(`[source] ${connection.source}, [target] ${connection.target}`);

      if(typeof target === 'undefined')
        return false;      

      const hasCycle = (node : any, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          // console.log(`outgoer.id : ${outgoer.id}`);
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
        markerEnd: edgeMarkerEnd
    };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  //노드 선택에 따라 하단시트와 노드 조작 버튼 보이기/숨기기 한다.
  const onSelectionChange = (elements: any) => {
    // console.log(`Selection changed : nodes - ${elements['nodes'].length}, edges - ${elements['edges'].length}`);
    if(elements['nodes'].length !== 1) {
      //버튼 조작 버튼을 숨긴다.
      nodeChangeCallBackManager.setShowOptButtons(nodeChangeCallBackManager.getPrevNodeId(), false);
      nodeChangeCallBackManager.setPrevNodeId('');
      //하단시트 숨긴다.
      nodeChangeCallBackManager.setBottomsheetNodeId('');
      return;
    }

    if(reactFlowInstance) {
      const v = reactFlowInstance.getViewport();
      console.log(`v.x : ${v.x}, v.y : ${v.y}, v.zoom : ${v.zoom}`);
      // reactFlowInstance.setViewport({x: 0, y: 0,zoom: v.zoom});
      // setCenter: (
      //   x: number,
      //   y: number,
      //   options?: { duration: number; zoom: number },
      // ) => void;
    }
    // reactFlowInstance?.fitView(elements['nodes'][0].id);

    if(nodeChangeCallBackManager.getPrevNodeId() === elements['nodes'][0].id)
      return;
    //이전 선택된 노드 버튼 조작 버튼 숨긴다.
    nodeChangeCallBackManager.setShowOptButtons(nodeChangeCallBackManager.getPrevNodeId(), false);
    //현재 선택된 버튼 조작 버튼을 보이기 한다.
    nodeChangeCallBackManager.setShowOptButtons(elements['nodes'][0].id, true);
    //하단시트 보기이 한다.
    nodeChangeCallBackManager.setBottomsheetNodeId(elements['nodes'][0].id);

    //현 선택된 노드Id를 이전 노드id에 저장한다.
    nodeChangeCallBackManager.setPrevNodeId(elements['nodes'][0].id);

  };

  //노드가 삭제되면 라인 재구성 위한 처리 함수
  const reStructureEdges = useCallback((deleted : any) => {
      setEdges(
        deleted.reduce((acc : any, node : any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
          const remainingEdges = acc.filter((edge : any) => !connectedEdges.includes(edge));
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({id: uuid(), type: 'custom-edge', markerEnd: edgeMarkerEnd, source, target })));
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    }, [setEdges, nodes, edges]
  );

  //노드가 삭제되면 선도 삭제하기 위해 콜백함수 등록
  nodeChangeCallBackManager.registerReStructureEdgesCallback(reStructureEdges);

  // 노드가 삭제되면 호출되는 이벤트 콜백함수
  const onNodesDelete = useCallback(
    (deleted : any) => {
      //등록된 노드 이벤트 콜백함수들 삭제한다.
      deleted.map((node : any) => {
        // console.log(`Delete node : ${node.id} -----`);
        nodeChangeCallBackManager.deleteSetShowOptButtonsCallback(node.id);
      });
      //노드가 삭제됨에 따라 라인 재구성
      reStructureEdges(deleted);
    }, [reStructureEdges]
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        className='textClear'
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
        onSelectionChange={onSelectionChange}
        onNodesDelete={onNodesDelete}
        connectionLineComponent={ConnectionLine}
      >
        <Panel position="top-left">
          <RadioButton selectIndex={bgGuideTypeIdx} items={bgGuideType} setIndexState={setBgGuideTypeIdx} />
        </Panel>
        <Controls position='top-right'/>
        {/* <MiniMap nodeComponent={CustomMiniMapNode}/> */}
        <MiniMap/>
        <Background variant={bgGuideType[bgGuideTypeIdx] as BackgroundVariant}/>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

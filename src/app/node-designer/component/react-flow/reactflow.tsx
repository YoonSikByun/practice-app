import 'reactflow/dist/style.css';
import '@/app/node-designer/scss/component/react-flow/reactflow.scss'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

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
  useReactFlow,
  // MiniMapNodeProps
} from 'reactflow';
import { customNodeTypes, getNodeSize, getNodeData } from '@/app/node-designer/component/react-flow/custom/nodeTypes';
import CustomEdge from '@/app/node-designer/component/react-flow/custom/CustomEdge';
import { v4 as uuid } from "uuid";
import { Size } from '@/app/common/lib/definition';
import { multiNodeStateCallback } from '@/app/node-designer/lib/nodeDesignerStateManager';
import { RadioButton } from '@/app/node-designer/component/controls/RadioButton';
import ConnectionLine from '@/app/node-designer/component/react-flow/custom/ConnectionLine';
// import { prettyjson } from '@/app/api/lib/util';

const bgGuideType = ['none', BackgroundVariant.Cross, BackgroundVariant.Dots, BackgroundVariant.Lines];
const rfStyle = { backgroundColor: '#FFFFFF' };
const edgeMarkerEnd = { type: MarkerType.ArrowClosed, width: 13, height: 13, color: '#009591' };
const edgeTypes = { 'custom-edge': CustomEdge};

const hide = (hidden : boolean) => (nodeOrEdge : any) => {
  nodeOrEdge.hidden = hidden;
  return nodeOrEdge;
};

const flowKey : string = 'example-flow';

export default function ReactFlowApp(
  {
    id,
    setBottomsheetNodeId,
    nodesOredgesVisible = true
  } : {
    id : string,
    setBottomsheetNodeId : (nodeId : string) => void,
    nodesOredgesVisible? : boolean
  }
) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [bgGuideTypeIdx, setBgGuideTypeIdx] = useState(3);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any>>();
  const { setViewport } = useReactFlow();

  useEffect(() => {
    setNodes((nds) => nds.map(hide(!nodesOredgesVisible)));
    setEdges((eds) => eds.map(hide(!nodesOredgesVisible)));
  }, [nodesOredgesVisible]);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      
      const flow = reactFlowInstance.toObject();
      const saveObject = {script : flow, setting : ''};
      const jsonString = JSON.stringify(saveObject);
      const encoded = base64_encode(jsonString);

      // localStorage.setItem(flowKey, encoded);

      // console.log('--------------[save reactFlow]----------------');
      // console.log(prettyjson.render(jsonString));
      // console.log('---------------[encoded]-----------------------');
      // console.log(encoded);
      // console.log('----------------------------------------------');
      return encoded;
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback((data : string) => {
    const restoreFlow = async (data : string) => {
      console.log('---------------[encoded]-----------------------');
      console.log(`[${data}]`);
      if(data == undefined || data.length < 1 ) return;
      // const data = localStorage.getItem(flowKey);
      const decoded = base64_decode(data);
      const restoreObject = JSON.parse(!decoded ? '' : decoded);

      // console.log('---------------[encoded]-----------------------');
      // console.log(data);
      // console.log('--------------[restore reactFlow]----------------');
      // console.log(prettyjson.render(decoded));
      // console.log('----------------------------------------------');

      const flow = restoreObject['script'];
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow(data);
  }, [setNodes, setViewport]);

  //하단시트 보이기/숨김 위한 설정함수는 최초 렌더링 시점에 한번만 저장하도록 useEffect 처리
  useEffect(() => {
    multiNodeStateCallback.call(id).registerSetBottomSheet(setBottomsheetNodeId);
    multiNodeStateCallback.call(id).registerSaveReactflow(onSave);
    multiNodeStateCallback.call(id).registerRestoreReactflow(onRestore);
  }, [setBottomsheetNodeId, id, onSave, onRestore]);

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
      const newNode = { id: uuid(), type: 'Kind0', position: { x: p.x, y: p.y }, data: getNodeData('Kind0', id) };
      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, id]);

  //노드에 새로운 선 연결 전 가능여부 체크
  const isValidConnection = useCallback(
    (connection : any) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      if(!reactFlowInstance) return false;
      const nodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();
      const target = nodes.find((node) => node.id === connection.target);

      if(typeof target === 'undefined')
        return false;      

      const hasCycle = (node : any, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      }

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    }, [reactFlowInstance]);

  const onConnect = useCallback(
    (connection : any) => {
      const edge = {
        ...connection,
        id: uuid(),
        type: 'custom-edge',
        markerEnd: edgeMarkerEnd
      };
      setEdges((eds) => addEdge(edge, eds));
    }, [setEdges]);

  //노드 선택에 따라 하단시트와 노드 조작 버튼 보이기/숨기기 한다.
  const onSelectionChange = (elements: any) => {
    if(elements['nodes'].length !== 1) {
      //버튼 조작 버튼을 숨긴다.
      multiNodeStateCallback.call(id).setShowOptButtons(multiNodeStateCallback.call(id).getPrevNodeId(), false);
      multiNodeStateCallback.call(id).setPrevNodeId('');
      //하단시트 숨긴다.
      multiNodeStateCallback.call(id).setBottomsheetNodeId('');
      return;
    }

    if(multiNodeStateCallback.call(id).getPrevNodeId() === elements['nodes'][0].id)
      return;
    //이전 선택된 노드 버튼 조작 버튼 숨긴다.
    multiNodeStateCallback.call(id).setShowOptButtons(multiNodeStateCallback.call(id).getPrevNodeId(), false);
    //현재 선택된 버튼 조작 버튼을 보이기 한다.
    multiNodeStateCallback.call(id).setShowOptButtons(elements['nodes'][0].id, true);
    //하단시트 보기이 한다.
    multiNodeStateCallback.call(id).setBottomsheetNodeId(elements['nodes'][0].id);
    //현 선택된 노드Id를 이전 노드id에 저장한다.
    multiNodeStateCallback.call(id).setPrevNodeId(elements['nodes'][0].id);
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
    }, [setEdges, nodes, edges]);

  //노드가 삭제되면 선도 삭제하기 위해 콜백함수 등록
  multiNodeStateCallback.call(id).registerReStructureEdges(reStructureEdges);

  // 노드가 삭제되면 호출되는 이벤트 콜백함수
  const onNodesDelete = useCallback(
    (deleted : any) => {
      //등록된 노드 이벤트 콜백함수들 삭제한다.
      deleted.map((node : any) => {
        multiNodeStateCallback.call(id).deleteSetShowOptButtons(node.id);
      });
      //노드가 삭제되면 노드에 연결된 라인 재구성
      reStructureEdges(deleted);
    }, [reStructureEdges, id]);

  return (
    <ReactFlow
      id={id}
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
      // onConnectStart={onConnectStart}
      // onConnectEnd={onConnectEnd}
      snapToGrid={true}
      onSelectionChange={onSelectionChange}
      onNodesDelete={onNodesDelete}
      connectionLineComponent={ConnectionLine}
    >
      <Panel position="top-left">
        <RadioButton className='text-base' selectIndex={bgGuideTypeIdx} items={bgGuideType} setIndexState={setBgGuideTypeIdx} />
      </Panel>
      <Controls position='top-right'/>
      {/* <MiniMap nodeComponent={CustomMiniMapNode}/> */}
      <MiniMap/>
      <Background variant={bgGuideType[bgGuideTypeIdx] as BackgroundVariant}/>
    </ReactFlow>
  );
}

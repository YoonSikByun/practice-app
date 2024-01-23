'use client'

import NodeContainer, {NodeItem} from "../workflow/ui/nodeContainer";
import { v4 as uuid } from "uuid";

export default function App() {

  const nodeItems : NodeItem[] = [
    {id: uuid(), node_kind: 'Kind0'},
    {id: uuid(), node_kind: 'Kind1'},
    {id: uuid(), node_kind: 'Kind2'},
    {id: uuid(), node_kind: 'Kind3'},
    {id: uuid(), node_kind: 'Kind4'},
    {id: uuid(), node_kind: 'Kind5'},
    {id: uuid(), node_kind: 'Kind6'},
    {id: uuid(), node_kind: 'Kind7'},
    {id: uuid(), node_kind: 'Kind8'},
    {id: uuid(), node_kind: 'Kind9'}
  ];

  const midIndex = Math.floor(nodeItems.length / 2);
  const col1 = nodeItems.slice(0, midIndex);
  const col2 = nodeItems.slice(midIndex);

  const node_width_px = 150;
  const node_height_px = 50;

  return (
    <div className="flex">
      <NodeContainer nodeItems={col1} item_width={node_width_px} item_height={node_height_px}/>
      <NodeContainer nodeItems={col2} item_width={node_width_px} item_height={node_height_px}/>
    </div>
  );
}

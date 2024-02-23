import { blueprintNodes, chartNodes, dataNodes } from "@/app/node-designer/config/node";
import NodeContainer from "@/app/node-designer/component/node/nodeContainer";

export type VerticalTabMenuItem = {
    title : string,
    link : string
}

export type NodesAccordionPanelItem = {
    title: string;
    component: () => React.ReactNode;
};

export type VariableDeckOption = {
    value: string,
    name:string
}

//세로탭 메뉴 구성 설정
export const verticalTablMenuItems : VerticalTabMenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수 설정', link : ''}];

//아코디언 메뉴 구성 설정
export const nodesAccordionPanelItems : NodesAccordionPanelItem[] = [
    {title : '노드종류1', component : () => (<NodeContainer nodeItems={blueprintNodes}/>)},
    {title : '노드종류2', component : () => (<NodeContainer nodeItems={chartNodes}/>)},
    {title : '노드종류3', component : () => (<NodeContainer nodeItems={dataNodes}/>)}]

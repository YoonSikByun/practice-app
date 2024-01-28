import { blueprintNodes, chartNodes, NodeItem } from "@/app/node-editor/config/node";
import NodeContainer from "@/app/node-editor/component/node/nodeContainer";

export type VerticalTabMenuItem = {
    title : string,
    link : string
}

export type AccordionPanelItem = {
    title: string;
    component: () => React.ReactNode;
};

//세로탭 메뉴 구성 설정
export const verticalTablMenuItems : VerticalTabMenuItem[] = [
    {title : '작업노드', link : ''},
    {title : '변수 설정', link : ''}];

//아코디언 메뉴 구성 설정
export const accordionPanelItems : AccordionPanelItem[] = [
    {title : '노드종류1', component : () => (<NodeContainer nodeItems={blueprintNodes}/>)},
    {title : '노드종류2', component : () => (<NodeContainer nodeItems={chartNodes}/>)}]
import clsx from "clsx";

export type NodeSize = {
    width: number;
    height: number;
}

export type NodeItem = {
    id: string;
    nodeKind: string;
    designClassName: string;
    designNodeSize: NodeSize;
    runClassName: string;
    runNodeSize: NodeSize;
};


//기본 노드 디자인
const defaultClass : string = clsx(
    'select-none',
    'node-inner bg-orange-200 m-1 shadow-md',
    'border-[1px] border-rose-600 border-solid rounded-[8px]');

const desginNodeSize : NodeSize = {width: 130, height: 50};

export const nullNode = {id: 'NotDefined', nodeKind: 'NotDefined', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize};

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const blueprintNodes : NodeItem[] = [
    {id: 'Kind0', nodeKind: 'Kind0', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind1', nodeKind: 'Kind1', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind2', nodeKind: 'Kind2', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind3', nodeKind: 'Kind3', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind4', nodeKind: 'Kind4', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind5', nodeKind: 'Kind5', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind6', nodeKind: 'Kind6', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind7', nodeKind: 'Kind7', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind8', nodeKind: 'Kind8', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind9', nodeKind: 'Kind9', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind10', nodeKind: 'Kind10', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind11', nodeKind: 'Kind11', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind12', nodeKind: 'Kind12', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind13', nodeKind: 'Kind13', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind14', nodeKind: 'Kind14', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind15', nodeKind: 'Kind15', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind16', nodeKind: 'Kind16', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind17', nodeKind: 'Kind17', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize}
];

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const chartNodes : NodeItem[] = [
    {id: 'Kind18', nodeKind: 'Kind18', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind19', nodeKind: 'Kind19', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind20', nodeKind: 'Kind20', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind21', nodeKind: 'Kind21', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind22', nodeKind: 'Kind22', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind23', nodeKind: 'Kind23', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind24', nodeKind: 'Kind24', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind25', nodeKind: 'Kind25', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind26', nodeKind: 'Kind26', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind27', nodeKind: 'Kind27', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind28', nodeKind: 'Kind28', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind29', nodeKind: 'Kind29', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind30', nodeKind: 'Kind30', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind31', nodeKind: 'Kind31', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind32', nodeKind: 'Kind32', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind33', nodeKind: 'Kind33', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind34', nodeKind: 'Kind34', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize},
    {id: 'Kind35', nodeKind: 'Kind35', designClassName: defaultClass, designNodeSize: desginNodeSize, runClassName: defaultClass, runNodeSize: desginNodeSize}
];

export const allNode = [blueprintNodes, chartNodes];
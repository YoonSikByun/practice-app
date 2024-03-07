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
    icon: string;
};

//기본 노드 디자인
const defaultClass : string = clsx(
    'select-none',
    'bg-nodedg-node-back m-1 shadow-md',
    'border-[1px] border-borderclr-light border-solid rounded-[8px]');

const designClass : string = clsx(defaultClass, 'cursor-grab hover:bg-mouseoverclr-bold');

const designNodeSize : NodeSize = {width: 125, height: 50};

export const nullNode = {
    id: 'NotDefined',
    nodeKind: 'NotDefined',
    designClassName: defaultClass,
    designNodeSize: designNodeSize,
    runClassName: defaultClass,
    runNodeSize: designNodeSize,
    icon: 'Kind0'
};

export enum NodeKind {
    KIND0 = 'Kind0',
    KIND1 = 'Kind1',
    KIND2 = 'Kind2',
    KIND3 = 'Kind3',
    KIND4 = 'Kind4',
    KIND5 = 'Kind5',
    KIND6 = 'Kind6',
    KIND7 = 'Kind7',
    KIND8 = 'Kind8',
    KIND9 = 'Kind9',
    KIND10 = 'Kind10',
    KIND11 = 'Kind11',
    KIND12 = 'Kind12',
    KIND13 = 'Kind13',
    KIND14 = 'Kind14',
    KIND15 = 'Kind15',
    KIND16 = 'Kind16',
    KIND17 = 'Kind17',
    KIND18 = 'Kind18',
    KIND19 = 'Kind19',
    KIND20 = 'Kind20',
    KIND21 = 'Kind21',
    KIND22 = 'Kind22',
    KIND23 = 'Kind23',
    KIND24 = 'Kind24',
    KIND25 = 'Kind25',
    KIND26 = 'Kind26',
    KIND27 = 'Kind27',
    KIND28 = 'Kind28',
    KIND29 = 'Kind29',
    KIND30 = 'Kind30',
    KIND31 = 'Kind31',
    KIND32 = 'Kind32',
    KIND33 = 'Kind33',
    KIND34 = 'Kind34',
    KIND35 = 'Kind35',
    KIND36 = 'Kind36',
    KIND37 = 'Kind37',
    KIND38 = 'Kind38',
    KIND39 = 'Kind39',
    KIND40 = 'Kind40',
    KIND41 = 'Kind41',
    KIND42 = 'Kind42',
    KIND43 = 'Kind43',
    KIND44 = 'Kind44',
    KIND45 = 'Kind45',
    KIND46 = 'Kind46',
    KIND47 = 'Kind47',
}

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const blueprintNodes : NodeItem[] = [
    {id: 'Kind0', nodeKind: 'Kind0', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind1', nodeKind: 'Kind1', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind2', nodeKind: 'Kind2', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind3', nodeKind: 'Kind3', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind4', nodeKind: 'Kind4', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind5', nodeKind: 'Kind5', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind6', nodeKind: 'Kind6', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind7', nodeKind: 'Kind7', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind8', nodeKind: 'Kind8', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind9', nodeKind: 'Kind9', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind10', nodeKind: 'Kind10', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind11', nodeKind: 'Kind11', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind12', nodeKind: 'Kind12', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind13', nodeKind: 'Kind13', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind14', nodeKind: 'Kind14', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind15', nodeKind: 'Kind15', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind16', nodeKind: 'Kind16', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'},
    {id: 'Kind17', nodeKind: 'Kind17', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind0'}
];

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const chartNodes : NodeItem[] = [
    {id: 'Kind18', nodeKind: 'Kind18', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind19', nodeKind: 'Kind19', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind20', nodeKind: 'Kind20', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind21', nodeKind: 'Kind21', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind22', nodeKind: 'Kind22', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind23', nodeKind: 'Kind23', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind24', nodeKind: 'Kind24', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind25', nodeKind: 'Kind25', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind26', nodeKind: 'Kind26', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind27', nodeKind: 'Kind27', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind28', nodeKind: 'Kind28', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind29', nodeKind: 'Kind29', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind30', nodeKind: 'Kind30', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind31', nodeKind: 'Kind31', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind32', nodeKind: 'Kind32', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind33', nodeKind: 'Kind33', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind34', nodeKind: 'Kind34', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'},
    {id: 'Kind35', nodeKind: 'Kind35', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind1'}
];

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const dataNodes : NodeItem[] = [
    {id: 'Kind36', nodeKind: 'Kind36', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind37', nodeKind: 'Kind37', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind38', nodeKind: 'Kind38', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind39', nodeKind: 'Kind39', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind40', nodeKind: 'Kind40', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind41', nodeKind: 'Kind41', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind42', nodeKind: 'Kind42', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind43', nodeKind: 'Kind43', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind44', nodeKind: 'Kind44', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind45', nodeKind: 'Kind45', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind46', nodeKind: 'Kind46', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'},
    {id: 'Kind47', nodeKind: 'Kind47', designClassName: designClass, designNodeSize: designNodeSize, runClassName: defaultClass, runNodeSize: designNodeSize, icon: 'Kind2'}
];

export const allNode = [blueprintNodes, chartNodes, dataNodes];
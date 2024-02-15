export type ProjectItem = {
    id: string;
    projectName: string;
    modelCount: number;
    report: number;
};

//좌측 아코디언 메뉴 패널에 표시될 항목들
export const ProjectItems : ProjectItem[] = [
    {id: 'project01' , projectName: 'project01', modelCount: 0, report: 0},
    {id: 'project02' , projectName: 'project02', modelCount: 0, report: 0},
    {id: 'project03' , projectName: 'project03', modelCount: 0, report: 0},
    {id: 'project04' , projectName: 'project04', modelCount: 0, report: 0},
    {id: 'project05' , projectName: 'project05', modelCount: 0, report: 0},
];
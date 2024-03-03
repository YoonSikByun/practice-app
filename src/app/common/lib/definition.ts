export type Size = {
    width : number;
    height : number;
}

export type Rect = {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

export type Position = {
    x: number;
    y: number;
}

/*------------------------
    통신 데이터
------------------------*/
export type ResponseData = {
    error : boolean;
    message : string;
    data : any;
}

//프로젝트 생성 요청
export type InsertProject = {
    id          : string;
    name        : string;
    creatorId   : string;
}

//프로젝트 조회 응답 데이터
export type ProjectData = {
    id          : string;
    name        : string;
    creatorId   : string;
    _count      : {workspaces : number};
}

//작업공간 조회 요청
export type SelectWorkspace = {
    projectId   : string;
}

//작업공간 조회 응답 데이터
export type WorksapceData = {
    id          : string;
    name        : string;
    createdAt   : string;
    updatedAt?  : string;
    creatorId   : string;
    projectId   : string;
    description : string;
    setting     : string;
    desgin      : string;
}

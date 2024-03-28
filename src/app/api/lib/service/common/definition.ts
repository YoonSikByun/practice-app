/*------------------------
    통신 데이터
------------------------*/
export type ResponseData = {
    error : boolean;
    message : string;
    data : any;
}

/*********************************
 * Project
 *********************************/
//프로젝트 생성 요청
export type InsertProject = {
    id          : string; //프로젝트 ID
    name        : string; //프로젝트명
    creatorId   : string; //생성자 ID
}

//프로젝트 조회 응답 데이터
export type ProjectData = {
    id          : string; //프로젝트 ID
    name        : string; //프로젝트명
    creatorId   : string; //생성자 ID
    createdAt   : string; //생성일자
    _count      : {workspaces : number}; //프로젝트 내에 생성된 작업공간 건수
}

//프로젝트 정보 수정
// export type UpdateProject = {
//     id          : string; //프로젝트 ID
//     name        : string; //프로젝트명
// }

export type DeleteProject = {
    id              : string; //프로젝트 ID
}

/*********************************
 * Workspace
 *********************************/
//작업공간 목록 조회 요청
export type SelectWorkspace = {
    projectId   : string; //프로젝트 ID
}

//작업공간 조회 응답 데이터
export type WorkspaceData = {
    id              : string; //작업공간 ID
    name            : string; //작업공간명
    createdAt       : string; //작업공간 최초 생성일
    updatedAt?      : string; //작업공간 수정일자
    creatorId       : string; //생성자 ID
    updatorId?      : string; //갱신자 ID
    projectId       : string; //소속 프로젝트 ID
    description     : string; //작업공간 설명
}

//작업공간 생성 요청
export type InsertWorkspace = {
    id              : string; //작업공간 ID
    name            : string; //작업공간명
    updatedAt?      : string; //작업공간 수정일자
    creatorId       : string; //생성자 ID
    updatorId?      : string; //갱신자 ID
    projectId       : string; //소속 프로젝트 ID
    description?    : string; //작업공간 설명
}

//작업공간 삭제 요청
export type DeleteWorkspace = {
    id              : string; //작업공간 ID
}

//작업공간 다중 삭제 요청
export type DeleteWorkspaces = {
    ids              : string[]; //작업공간 ID
}

//작업공간 삭제 요청 데이터
export type DeleteWorkspaceData = {
    ids              : string[]; //작업공간 ID
    name             : string; //작업공간 이름
    role             : string; //작업공간 role
}


//작업공간 수정 요청
export type UpdateWorkspace = {
    id               : string; //작업공간 ID
    updaterId        : string; //수정자 ID    
    updatedAt        : string; //작업공간 수정일자
    name             : string; //작업공간 이름
    description      : string; //작업공간 설명
}


//작업공간 수정 요청 데이터
export type UpdateWorkspaceData = {
    id              : string; //작업공간 ID
    name            : string; //작업공간 이름
    description    : string; //작업공간 설명
    role            : string; //작업공간 role
}



//Reactflow 저장 요청
export type SelectReactflow = {
    id              : string;
    name            : string;
    design          : string;
}

//Reactflow 저장 요청
export type UpdateReactflow = {
    workspaceId     : string;
    data            : string;
}
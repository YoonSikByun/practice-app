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
    _count      : {workspaces : number}; //프로젝트 내에 생성된 작업공간 건수
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
    setting         : string; //노드자이너 설정상태 정보
    desgin          : string; //reactFlow 디자인 스크립트
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
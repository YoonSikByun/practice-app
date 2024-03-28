import { globalMessageManager } from "@/app/common/lib/globalMessage";
import {
    InsertProject,
    DeleteProject,
    InsertWorkspace,
    DeleteWorkspace,
    SelectWorkspace,
    UpdateReactflow,
    DeleteWorkspaces,
    UpdateWorkspace,
} from "@/app/api/lib/service/common/definition";
import { Post } from "@/app/common/lib/fetchServer";
import { ResponseData } from "@/app/api/lib/service/common/definition";
import { Get } from "@/app/common/lib/fetchServer";
export const prettyjson = require('prettyjson');

export enum RQ_URL {
    INSERT_PROJECT      = 'api/project/insert',
    SELECT_PROJECT      = 'api/project/select',
    DELETE_PROJECT      = 'api/project/delete',
    INSERT_WORKSPACE    = 'api/workspace/insert',
    SELECT_WORKSPACE    = 'api/workspace/select',
    DELETE_WORKSPACE    = 'api/workspace/delete',
    DELETE_WORKSPACES    = 'api/workspace/deletemany',
    UPDATE_WORKSPACE    = 'api/workspace/update',
    SELECT_REACTFLOW    = 'api/reactflow/select',
    UPDATE_REACTFLOW    = 'api/reactflow/update',
}

//프로젝트 신규 추가
export async function submitInsertProject(
    data : InsertProject,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.INSERT_PROJECT, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

export async function submitDeleteProject(
    data : DeleteProject,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.DELETE_PROJECT, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

export async function submitProjectList() {
    const recvData = await Get(RQ_URL.SELECT_PROJECT);
    console.log(prettyjson.render(recvData));

    if (recvData['error'] === true)
        globalMessageManager.setErrorMsg(recvData['message']);

    return recvData['data'];
}


//작업공간 신규 추가
export async function submitInsertWorkspace(
    data : InsertWorkspace,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.INSERT_WORKSPACE, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

//작업공간 삭제
export async function submitDeleteWorkspace(
    data : DeleteWorkspace,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.DELETE_WORKSPACE, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

//작업공간다중 삭제
export async function submitDeleteWorkspaces(
    data : DeleteWorkspaces,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.DELETE_WORKSPACES, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

//reactflow 데이터 가져오기
export async function submitSelectReactflow(
    data : SelectWorkspace,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.SELECT_REACTFLOW, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

//workspace 수정
export async function submitUpdateWorkSpace(
    data : UpdateWorkspace,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.UPDATE_WORKSPACE, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}


//reactflow 데이터 저장
export async function submitUpdateReactflow(
    data : UpdateReactflow,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.UPDATE_WORKSPACE, data);
    if (recvData['error'] === true) {
        globalMessageManager.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        globalMessageManager.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

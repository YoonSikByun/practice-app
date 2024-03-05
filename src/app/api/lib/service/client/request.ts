import { globalMessageManager } from "@/app/common/lib/globalMessage";
import { InsertProject, InsertWorkspace } from "@/app/api/lib/service/common/definition";
import { Post } from "@/app/common/lib/fetchServer";
import { ResponseData } from "@/app/api/lib/service/common/definition";
import { Get } from "@/app/common/lib/fetchServer";
export const prettyjson = require('prettyjson');

export enum RQ_URL {
    INSERT_PROJECT = 'api/project/insert',
    SELECT_PROJECT = 'api/project/select',
    INSERT_WORKSPACE = 'api/workspace/insert',
    SELECT_WORKSPACE = 'api/workspace/select'
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
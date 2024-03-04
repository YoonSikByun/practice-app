import { gStatusPopup } from "@/app/common/lib/globalMessage";
import { InsertProject } from "@/app/common/lib/definition";
import { Post } from "@/app/common/lib/fetchServer";
import { ResponseData } from "@/app/common/lib/definition";
import { Get } from "@/app/common/lib/fetchServer";
export const prettyjson = require('prettyjson');

export enum RQ_URL {
    INSERT_PROJECT = 'api/project/insert',
    SELECT_PROJECT = 'api/project/select',
    INSERT_WORKSPACE = 'api/project/insert',
    SELECT_WORKSPACE = 'api/workspace/select'
}

//프로젝트 신규 추가
export async function rqInsertProject(
    data : InsertProject,
    successMessage? : string,
    errorMessage? : string
) {
    const recvData : ResponseData = await Post(RQ_URL.INSERT_PROJECT, data);
    if (recvData['error'] === true) {
        gStatusPopup.setErrorMsg((errorMessage) ? errorMessage : recvData['message']);
    } else {
        gStatusPopup.setSuccessMsg((successMessage) ? successMessage : recvData['message']);
    }

    return recvData;
}

export async function rqProjectList() {
    const recvData = await Get(RQ_URL.SELECT_PROJECT);    
    console.log(prettyjson.render(recvData));

    if (recvData['error'] === true)
        gStatusPopup.setErrorMsg(recvData['message']);

    return recvData['data'];
}
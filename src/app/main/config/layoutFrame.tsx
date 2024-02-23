import { Size } from "@/app/common/util/definition";
export type MainLayoutSize = {
    topGNB : Size;
    topGNB_Left : Size;
    topGNB_Center : Size;
    topGNB_Right : Size;
    project : Size;
}

//NodeDesigner Layout 크기 정의
export const mainLayoutSize : MainLayoutSize = {
    topGNB : {width: 0, height: 50},
    topGNB_Left : {width: 200, height: 0},
    topGNB_Center : {width: 0, height: 0},
    topGNB_Right : {width: 150, height: 0},
    project : {width: 300, height: 0}
}

export type WorkspaceLayoutSize = {
    outerMargin: Size;
    projectTitle: Size;
    projectInformation: Size;
    taskListHead: Size;
    taskListBody: Size;
    taskPagingList: Size;
    taskListBodyPadding : Size;
}

export const workspaceLayoutSize : WorkspaceLayoutSize = {
    outerMargin: {width: 10, height: 10},
    projectTitle: {width: 0, height: 30},
    projectInformation: {width: 0, height: 30},
    taskListHead: {width: 0, height: 35},
    taskListBody: {width: 0, height: 0},
    taskPagingList: {width: 0, height: 35},
    taskListBodyPadding: {width: 0, height: 0}
}

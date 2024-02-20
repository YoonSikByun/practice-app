export type MainLayoutSize = {
    topGNB : {width: number; height: number};
    topGNB_Left : {width: number; height: number};
    topGNB_Center : {width: number; height: number};
    topGNB_Right : {width: number; height: number};
    project : {width: number; height: number};
}

//NodeDesigner Layout 크기 정의
export const mainLayoutSize : MainLayoutSize = {
    topGNB : {width: 0, height: 40},
    topGNB_Left : {width: 150, height: 0},
    topGNB_Center : {width: 0, height: 0},
    topGNB_Right : {width: 150, height: 0},
    project : {width: 300, height: 0}
}

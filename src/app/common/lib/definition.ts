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


export type ResponseData = {
    status : number;
    message : string;
    data : any;
}
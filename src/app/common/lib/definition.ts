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
    error : boolean;
    message : string;
    data : any;
}

export type ProjectData = {
    id          : string;
    name        : string;
    creatorId   : string;
    workspace   : number;
}

export type SelectWorkspace = {
    projectId   : string;
}
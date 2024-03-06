export enum MenuRole {
    PROJECT = 'Project',
    TASKCARD = 'TaskCard',
    TASKLIST = 'TaskList'
}

export enum ACTION {
    UPDATE  = 'update',
    DELETE  = 'delete',
    COPY    = 'copy',
    EXPORT  = 'export'
}

export type ContextMenuCallback =  (action : ACTION, parentKey : string) => void;

export type ContextMenuArgument = {
    clientX : number;
    clientY : number;
    menuRole : MenuRole;
    parentKey : string;
    callbackProc : ContextMenuCallback;
}

export const menuGroups: Record<MenuRole, MenuItem[]> = {
    [MenuRole.TASKCARD] : [
        { action: ACTION.UPDATE, title: "수정", isSelected: false, hasUnderLine: false },
        { action: ACTION.DELETE, title: "삭제", isSelected: false, hasUnderLine: false },
        { action: ACTION.COPY, title: "복사", isSelected: false, hasUnderLine: true },
        { action: ACTION.EXPORT, title: "내보내기", isSelected: false, hasUnderLine: false },
    ],
    [MenuRole.TASKLIST] : [
        { action: ACTION.DELETE, title: "삭제", isSelected: false, hasUnderLine: false },
        { action: ACTION.EXPORT, title: "내보내기", isSelected: false, hasUnderLine: false },
    ],
    [MenuRole.PROJECT] : [
        { action: ACTION.UPDATE, title: "수정", isSelected: false, hasUnderLine: false },
        { action: ACTION.DELETE, title: "삭제", isSelected: false, hasUnderLine: true },
        { action: ACTION.EXPORT, title: "내보내기", isSelected: false, hasUnderLine: false },
    ],
}

export type MenuItem = {
    action: ACTION;
    title: string;
    isSelected: boolean;
    hasUnderLine: boolean;
}

import { WorkspaceData } from "@/app/api/lib/service/common/definition";

export enum MenuRole {
    PROJECT = 'Project',
    WORKSPACE = 'WorkSpace',
    WORKSPACELIST = 'WorkSpaceList'
}

export enum ACTION {
    UPDATE  = 'update',
    DELETE  = 'delete',
    COPY    = 'copy',
    EXPORT  = 'export'
}

export type ContextMenuCallback =  (action : ACTION, parentKey : string, parentName : string) => void;

export type ContextMenuArgument = {
    clientX : number;
    clientY : number;
    menuRole : MenuRole;
    parentKey : string;
    parentName : string;
    callbackProc : ContextMenuCallback;
}

export const menuGroups: Record<MenuRole, MenuItem[]> = {
    [MenuRole.WORKSPACE] : [
        { action: ACTION.UPDATE, title: "수정", isSelected: false, hasUnderLine: false },
        { action: ACTION.DELETE, title: "삭제", isSelected: false, hasUnderLine: false },
        { action: ACTION.COPY, title: "복사", isSelected: false, hasUnderLine: true },
        { action: ACTION.EXPORT, title: "내보내기", isSelected: false, hasUnderLine: false },
    ],
    [MenuRole.WORKSPACELIST] : [
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

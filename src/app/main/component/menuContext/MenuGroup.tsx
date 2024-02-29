export type MenuRole = string;

export const menuGroups: Record<MenuRole, MenuItem[]> = {
  "TaskCard": [
    { id: 1, title: "수정", isSelected: false, hasUnderLine: false },
    { id: 2, title: "삭제", isSelected: false, hasUnderLine: false },
    { id: 3, title: "복사", isSelected: false, hasUnderLine: true },
    { id: 4, title: "내보내기", isSelected: false, hasUnderLine: false },
    { id: 5, title: "실행모델으로 내보내기", isSelected: false, hasUnderLine: true },
    { id: 6, title: "버전 관리", isSelected: false, hasUnderLine: false },
  ],
  "TaskList": [
    { id: 1, title: "삭제", isSelected: false, hasUnderLine: false },
    { id: 2, title: "내보내기", isSelected: false, hasUnderLine: false },
  ],
  "Project": [
    { id: 1, title: "수정", isSelected: false, hasUnderLine: false },
    { id: 2, title: "삭제", isSelected: false, hasUnderLine: true },
    { id: 3, title: "내보내기", isSelected: false, hasUnderLine: false },
  ],
};

export type MenuItem = {
  id: number;
  title: string;
  isSelected: boolean;
  hasUnderLine: boolean;
};
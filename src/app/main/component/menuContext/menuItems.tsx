export const menuItems : MenuItem[] = [ 
    { id : 1 , title : "메시지 1" , isSelected : false} , 
    { id : 2 , title : "메시지 2" , isSelected : false}, 
    { id : 3 , title : "메시지 3" , isSelected : false}, 
    { id : 4 , title : "메시지 4" , isSelected : false}, 
];  

    export type MenuItem = {
        id: number;
        title: string;
        isSelected : boolean
    };

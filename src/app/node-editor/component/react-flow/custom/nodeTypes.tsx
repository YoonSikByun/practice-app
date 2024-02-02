import { NormalNode } from "./normalNode";
import { blueprintNodes, allNode, nullNode } from "@/app/node-editor/config/node";

const findNodeItem = (id : string) =>{
    for(const i of allNode) {
        for(const j of i)
            if(j['id'] === id) return j;
    }
    return nullNode;
}


const Component = (id : string) => {
    const i = findNodeItem(id);
    return <NormalNode
        width={i['runNodeSize'].width}
        height={i['runNodeSize'].height}
        nodeKind={i['nodeKind']}
        className={i['runClassName']} />;
};

function Kind0() { return Component('Kind0'); }
function Kind1() { return Component('Kind1'); }
function Kind2() { return Component('Kind2'); }

export const customNodeTypes = {
    Kind0: Kind0,
    Kind1: Kind1,
    Kind2: Kind2
}

// export const customNodeTypes = {
//     kind0: Component('Kind0'),
//     kind1: Component('Kind1'),
//     kind2: Component('Kind2'),
//     kind3: Component('Kind3'),
//     kind4: Component('Kind4'),
//     kind5: Component('Kind5'),
//     kind6: Component('Kind6'),
//     kind7: Component('Kind7'),
//     kind8: Component('Kind8'),
//     kind9: Component('Kind9'),
//     kind10: Component('Kind10'),
//     kind11: Component('Kind11'),
//     kind12: Component('Kind12'),
//     kind13: Component('Kind13'),
//     kind14: Component('Kind14'),
//     kind15: Component('Kind15'),
//     kind16: Component('Kind16'),
//     kind17: Component('Kind17'),
//     kind18: Component('Kind18'),
//     kind19: Component('Kind19'),
//     kind20: Component('Kind20'),
//     kind21: Component('Kind21'),
//     kind22: Component('Kind22'),
//     kind23: Component('Kind23'),
//     kind24: Component('Kind24'),
//     kind25: Component('Kind25'),
//     kind26: Component('Kind26'),
//     kind27: Component('Kind27'),
//     kind28: Component('Kind28'),
//     kind29: Component('Kind29'),
//     kind30: Component('Kind30'),
//     kind31: Component('Kind31'),
//     kind32: Component('Kind32'),
//     kind33: Component('Kind33'),
//     kind34: Component('Kind34'),
//     kind35: Component('Kind35')
// };

import { Prisma } from '@prisma/client'
import { InsertWorkspace, SelectWorkspace } from '@/app/api/lib/service/common/definition';
import { prismaCli } from '@/app/api/lib/util';

//신규 프로젝트 생성
export async function insertWorkspace(data : InsertWorkspace) {
    return await prismaCli.workspace.create({data: data});
}

//프로젝트 조회
export async function selectWorkspace(data : SelectWorkspace) {

    //특정 프로젝트 조회 쿼리 만들기
    const query: Prisma.WorkspaceFindFirstArgs = {
        where: {
            projectId: data.projectId
        }
    };

    //프로젝트 목록과 프로젝트에 포함된 워크스페이스 건수 조회
    const [project_list, count] = await prismaCli.$transaction([
        prismaCli.workspace.findMany(query),
        prismaCli.project.findFirst({
            where: {
                id: data.projectId
            },
            include: {
                _count: {
                    select : {workspaces: true}
                },
            },
        })
    ]);

    return {workspace: project_list, count: count?._count.workspaces};
}

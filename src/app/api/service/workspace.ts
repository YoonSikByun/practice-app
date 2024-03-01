import { Prisma } from '@prisma/client'
import { ProjectData, SelectWorkspace } from '@/app/common/lib/definition';
import { prismaCli } from '@/app/api/lib/util';

//신규 프로젝트 생성
export async function insertWorkspace(data : ProjectData) {
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
        prismaCli.workspace.count()
    ]);

    return {project: project_list, workspace: count};
}

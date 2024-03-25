import { InsertProject, DeleteProject} from '@/app/api/lib/service/common/definition';
import { prismaCli } from '@/app/api/lib/util';

//신규 프로젝트 생성
export async function insertProject(data : InsertProject) {
    return await prismaCli.project.create({data: data});
}

//프로젝트 조회
export async function selectProject(data? : any) {

    const allProject = await prismaCli.project.findMany({
        include: {
            _count: {
                select: {workspaces: true}
            }
        }
    });

    return allProject;
}

//프로젝트 삭제(하위 워크스페이스 삭제)
export async function deleteProject(data : DeleteProject) {
    return await prismaCli.$transaction([
        prismaCli.workspace.deleteMany({
            where: {
                projectId: data.id
            }
        }),
        prismaCli.project.delete({
            where: {
                id: data.id,
            },
        })
    ]);
}

// export async function updateProject(data : UpdateProject) {
//     return await prismaCli.project.update({data: data});
// }
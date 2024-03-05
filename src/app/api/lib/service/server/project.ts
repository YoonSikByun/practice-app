import { InsertProject} from '@/app/api/lib/service/common/definition';
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
    // return {project: allProject, workspace: count};
}

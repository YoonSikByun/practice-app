import { Prisma } from '@prisma/client'
import {
    InsertWorkspace,
    SelectWorkspace,
    DeleteWorkspace,
    UpdateReactflow,
    DeleteTaskCards,
} from '@/app/api/lib/service/common/definition';
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
        },
        select: {
            id             : true,
            name           : true,
            createdAt      : true,
            updatedAt      : true,
            creatorId      : true,
            updatorId      : true,
            projectId      : true,
            description    : true,
        },
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

//작업공간 삭제
export async function deleteWorkspace(data : DeleteWorkspace) {
    return await prismaCli.workspace.delete(
        {
            where: {
            id: data.id,
            },
        }
    );
}

//작업공간 다중삭제
export async function deleteTaskCards(data: DeleteTaskCards) {
    return await prismaCli.workspace.deleteMany({
        where: {
            id: {
                in: data.ids // DeleteTaskCards에서 ids 배열을 가져옴
            }
        }
    });
}

//작업 데이터 조회
export async function selectReactflow(data : SelectWorkspace) {
    return await prismaCli.workspace.findFirst(
        {
            where: {
                id: data.projectId,
            },
            select: {
                id: true,
                name: true,
                design: true,
            },
        }
    );
}

//작업 데이터 저장
export async function updateReactflow(data : UpdateReactflow) {
    return await prismaCli.workspace.update(
        {
            where: {
                id: data.workspaceId,
            },
            data: {
                design: data.data || undefined
            }
        }
    );
}
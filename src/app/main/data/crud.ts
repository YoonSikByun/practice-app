'use strict';

import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentDate } from '@/app/common/lib/util';
import { ProjectData } from '@/app/common/lib/definition';

const prettyjson = require('prettyjson')
const prisma = new PrismaClient()

function ErrorCode(e : any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
        return e.code;
    return '';
}

function ErrorMessage(cd : string, pk? : any) {
    switch(cd) {
        case 'P2002':
            return `[${pk}}] 중복된 값이 있습니다.`;
    }

    return `[${cd}] 데이터 처리중 오류가 발생했습니다.`;
}

async function ErrorHandler(func : any, pk? : any) {
    let res = {error: false, message: `[${getCurrentDate()}] 처리 완료했습니다.`, data: null};
    const sendData = await func().catch((e : any) => {
            const cd = ErrorCode(e);
            const msg = ErrorMessage(cd, pk);
            
            console.error(`[ERROR] Code : ${cd} message : ${msg}`);
            console.error(prettyjson.render(e));

            res = {error: true, message: `[${getCurrentDate()}] ${msg}`, data: null};
        }
    ) .finally(async () => {
            await prisma.$disconnect()
        }
    )

    return res;
}

export async function insertProject(data : ProjectData) {
    return await ErrorHandler(() => prisma.project.create({data: data}), data.id);
}

export async function selectProject(id : string) {
  const query: Prisma.ProjectFindFirstArgs = {
    where: {
      id: id
    }
  };

  const select = async () => {
    const [project_list, count] = await prisma.$transaction([
      prisma.project.findMany(query),
      prisma.workspace.count({where: {projectId: id}})
    ]);
    return {project: project_list, workspace: count};
  }
  return await ErrorHandler(select, id);
}

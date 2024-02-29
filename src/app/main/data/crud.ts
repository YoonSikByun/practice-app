'use strict';

import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentDate } from '@/app/common/lib/util';

const prettyjson = require('prettyjson')
const prisma = new PrismaClient()

function ErrorCode(e : any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
        return e.code;
    return '';
}

function ErrorMessage(cd : string, data? : ProjectData) {
    switch(cd) {
        case 'P2002':
            return `[${data?.id}}] 이미 생성된 프로젝트 아이디입니다.`;
    }

    return `[${cd}] 프로젝트 데이터 처리중 오류가 발생했습니다.`;
}

export type ProjectData = {
    id          : string;
    name        : string;
    creatorId   : string;
}

async function ErrorHandler(func : any, recvData? : any) {
    let res = {error: false, message: `[${getCurrentDate()}] 처리 완료했습니다.`, data: null};
    const sendData = await func().catch((e : any) => {
            const cd = ErrorCode(e);
            const msg = ErrorMessage(cd, recvData);
            
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
    // SQLite에서는 createMany 지원하지 않음
    // const createMany = await prisma.project.createMany({
    //     data: [{}],
    //     skipDuplicates: true,
    //  }
    // )

    return await ErrorHandler(() => prisma.project.create({data: data}), data);

    // const project = await prisma.project.create(
    //         {data: data}
    //     ).catch((e) => {
    //             const cd = ErrorCode(e);
    //             const msg = ErrorMessage(cd, data);
    //             console.error(`[ERROR] Code : ${cd} message : ${msg} `);
    //             console.error(prettyjson.render(e));
    //             return {status: 500, message: msg};
    //         }
    //     ) .finally(async () => {
    //         await prisma.$disconnect()
    //         }
    //     )

    // return {status: 200, message: 'success'};
}

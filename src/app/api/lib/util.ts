import { PrismaClient, Prisma } from '@prisma/client';
import { getCurrentDate } from '@/app/common/lib/util';

export const prettyjson = require('prettyjson');
export const prismaCli = new PrismaClient();

 function searchParamToObject(req : Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    return Object.fromEntries(searchParams);
}

export async function GetRequestData(req : Request) {
    let data = null;

    switch(req.method)
    {
        case 'POST':
            data = await req.json();
            break;
        case 'GET':
            data = searchParamToObject(req);
            break;
    }

    console.log(`------ [${req.method} : ${req.url}] GetRequestData ---------`);
    console.log(prettyjson.render(data, {noColor: true}));
    console.log('------------------------------------------------------------');

    return data;
}

function ErrorCode(e : any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
        return e.code;
    return '';
}

function ErrorMessage(cd : string) {
    switch(cd) {
        case 'P2002':
            return `중복 데이터가 존재합니다.`;
    }

    return `[${cd}] 데이터 처리중 오류가 발생했습니다.`;
}

async function ExecServiceFunc(func : any, data : any) {
    let res = null;
    const resData = await func(data).catch((e : any) => {
            const cd = ErrorCode(e);
            const msg = ErrorMessage(cd);
            
            console.error(`[ERROR] Code : ${cd} message : ${msg}`);
            console.error(prettyjson.render(e));

            res = {error: true, message: `[${getCurrentDate()}] ${msg}`, data: null};
        }
    ).finally(async () => {
            await prismaCli.$disconnect()
        }
    )

    res = {error: false, message: `[${getCurrentDate()}] 처리 완료했습니다.`, data: resData};
    return res;
}

import { NextResponse } from "next/server";

export async function ReceiveProc(req : Request, procFunc : any) {
    try {
        console.log('ReceiveProc-------');
        const data = await GetRequestData(req);
        const res = await ExecServiceFunc(procFunc, data);

        console.log(`------ ReceiveProc [${req.url}]---------`);
        console.log(prettyjson.render(res, {noColor: true}));
        console.log('----------------------------------------');

        return NextResponse.json(res, { status : 200});
  
    } catch (err : any) {
        console.error(prettyjson.render(err));
      return NextResponse.json({error : true, message: "Failed to get data", data : null}, { status : 500});
    }
  }
  
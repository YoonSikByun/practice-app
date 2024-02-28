'use strict';

import { PrismaClient } from '@prisma/client'
const prettyjson = require('prettyjson')
const prisma = new PrismaClient()

export type ProjectData = {
    id          : string;
    name        : string;
    creatorId   : string;
}

export async function insertProject(data : ProjectData) {
    // SQLite에서는 createMany 지원하지 않음
    // const createMany = await prisma.project.createMany({
    //     data: [{}],
    //     skipDuplicates: true,
    // })

    const project = await prisma.project.create({data: data})
    .catch((e) => {
      console.error(e)
      // process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

    console.log(`project : ${project}`);
    return project;
}

'use strict';

import { unstable_noStore as noStore } from 'next/cache';
import { PrismaClient } from '@prisma/client'
const prettyjson = require('prettyjson')
const prisma = new PrismaClient()

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Project } from 'reactflow';

export type ProjectData = {
    id          : string;
    name        : string;
    creatorId   : string;
}

export async function insertProject(data : ProjectData) {
    noStore();
    // SQLite에서는 createMany 지원하지 않음
    // const createMany = await prisma.project.createMany({
    //     data: [{}],
    //     skipDuplicates: true,
    // })

    const project = await prisma.project.create({data: data})
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

    console.log(`project : ${project}`);
}

export const getServerSideProps = (async (data :ProjectData) => {
    // Fetch data from external API
    const res = await insertProject(data)
    const repo: Repo = await res.json()
    // Pass data to the page via props
    return { props: { repo } }
  }) satisfies GetServerSideProps<{ repo: Repo }>

export async function deleteProject(id : string) {
    noStore();
    const deleteUsers = await prisma.project.deleteMany({where: {id: id},})
      .catch((e) => {
        console.error(e)
        process.exit(1)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
  
      console.log(`deleteUsers : ${deleteUsers}`);
}


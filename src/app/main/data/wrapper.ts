import { ProjectData, insertProject } from "./crud";

export async function newProject() {
    const newData : ProjectData = {
        id : '11111111',
        name : 'abdc',
        creatorId   : 'aaaa'
    }
    insertProject(newData);
}

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
type Repo = {
  name: string
  stargazers_count: number
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>
 
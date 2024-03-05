'use client'

import useSWR from 'swr'
import { Get } from "../common/lib/fetchServer";
const prettyjson = require('prettyjson')

export default function Page() {
  const fetcher = async (url : string) => {
    console.log(`call fetcher : ${url}`);
    return await Get(url);
  };
  
  const { data, isLoading, error } = useSWR(
    `api/project/select`,
    fetcher
  );
  
  if(data && !isLoading && !error) {
      console.log(prettyjson.render(data));
      const project_list = data['data'];
      project_list.map((item : any, index : number) => {
          console.log('id : ', item['id']);
          console.log('name : ', item['name']);
          console.log('count : ', item['count']);
        }

      )
  }

  return (
    <>
      data test....
    </>
  );
}

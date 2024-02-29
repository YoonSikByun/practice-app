const prettyjson = require('prettyjson');
import { ResponseData } from "@/app/common/lib/definition";

export async function fetcher<JSON = any> (
    input: RequestInfo,
    init?: RequestInit
 ) : Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
 }

export async function SendData(method: string, uri : string, data? : any) {
    console.log(`Send data : ${prettyjson.render(data)}`);
    let reponseData : ResponseData = {status: 500, message: '요청 실패했습니다.', data: null};
    try {
      reponseData = await fetcher(uri, {method: method, body: JSON.stringify(data)} );
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      console.error('Database Error:', e);
      throw new Error('Failed to rquest.');
    }
    console.log(`Receive data : ${prettyjson.render(reponseData)}`);
    return reponseData; 
}
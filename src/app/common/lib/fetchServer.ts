const prettyjson = require('prettyjson');
import { ResponseData } from "@/app/common/lib/definition";

export async function fetcher<JSON = any> (
    input: RequestInfo,
    init?: RequestInit
 ) : Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
 }

export async function Post(uri : string, data? : any) {
    console.log(`Post data :\n${prettyjson.render(data)}`);
    let reponseData : ResponseData = {error: true, message: '요청 실패했습니다.', data: null};
    try {
      reponseData = await fetcher(uri, {method: 'POST', body: JSON.stringify(data)} );
    } catch (e : any) {
      console.error('Error:', e);
    }
    console.log(`Receive data : ${prettyjson.render(reponseData)}`);
    return reponseData; 
}

export async function Get(
    uri : string,
    data? : { [key: string] : string|number; }
)
{
    console.log(`Get data : ${prettyjson.render(data)}`);
    let params = '';

    if(data) {
      for (let [key, value] of Object.entries(data)) {
          const p = `${key}=${value}`;
          params = (params) ? params = params + '&' + p : params = p;
      }
    }

    const destURI = (params) ? `${uri}?${params}` : uri;
    console.log('destURI : ', destURI);
    let reponseData : ResponseData = {error: false, message: '요청 실패했습니다.', data: null};
    try {
      reponseData = await fetcher(destURI);
    } catch (e) {
      console.error('Error:', e);
      throw new Error('Failed to get.');
    }
    console.log(`Receive data : ${prettyjson.render(reponseData)}`);
    return reponseData; 
}

import { NextResponse } from "next/server";
import { insertProject } from "@/app/api/lib/service/server/project";

const prettyjson = require('prettyjson');

export async function POST(req : Request) {
  try {
    const body = await req.json();
    console.log(`---------------[Receive Data]---------------\n${prettyjson.render(body, {noColor: true})}\n------------------------------`);
    const res = await insertProject(body);
    console.log(`---------------[Response Data]---------------\n${prettyjson.render(res, {noColor: true})}\n------------------------------`);

    return NextResponse.json(res, { status : 200});

  } catch (err : any) {
    console.log('[ERROR]------------------------------');
    console.error(prettyjson.render(err));
    console.log('-------------------------------------');

    return NextResponse.json({error: "Failed to get data"}, { status : 500});
  }
}

export async function GET(req : Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const query = Object.fromEntries(searchParams);
  console.log('query : ', query);

  console.log(`searchParams is : ${searchParams}`)
  console.log(`greeting is : ${searchParams.get('greeting')}`)
  console.log(`name is : ${searchParams.get('name')}`)
  console.log(`recv-------- GET : ${url}`);
  console.log(JSON.stringify(req));
  const body = await req.json();
  console.log(prettyjson.render(body));
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405
    }
  );
}

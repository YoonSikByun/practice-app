
import { NextResponse } from "next/server";
import { insertProject } from "../../main/data/crud";

const prettyjson = require('prettyjson');

export async function POST(req : any) {
  try {
    if (req.method === 'POST') {
      const body = await req.json();
      console.log(`---------------[Receive Data]---------------\n${prettyjson.render(body, {noColor: true})}\n------------------------------`);
      const res = await insertProject(body);
      console.log(`---------------[Response Data]---------------\n${prettyjson.render(res, {noColor: true})}\n------------------------------`);
      return NextResponse.json(res, { status : 200});
    }

  } catch (err : any) {
    console.log('[ERROR]------------------------------');
    console.error(prettyjson.render(err));
    console.log('-------------------------------------');
    return NextResponse.json({error: "Failed to get data"}, { status : 500});
  }
}

export async function GET(req : any) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405
    }
  );
}
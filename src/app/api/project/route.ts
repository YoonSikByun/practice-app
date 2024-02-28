
import { NextResponse } from "next/server";
import { insertProject } from "../../main/data/crud";
const prettyjson = require('prettyjson');

export async function POST(req : any) {
  try {
    if (req.method === 'POST') {
      

      // const body = JSON.parse(req.body);
      const body = await req.json();
      console.log(`------------------------------\n${prettyjson.render(body, {noColor: true})}\n------------------------------`);

      return NextResponse.json(await insertProject(body), { status : 200});
    }

  } catch (err : any) {
    console.log(err);
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
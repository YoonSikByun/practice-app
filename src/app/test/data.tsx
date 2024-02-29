import { DbInit } from "./seed";

export async function RenderDB() {
    await DbInit();

    return <>Rendering complted</>
}
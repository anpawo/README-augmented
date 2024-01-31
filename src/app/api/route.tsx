import fs from "fs";
import path from "path";
import { exit } from "process";

export async function GET() {
    exit(0);
}

const file = process.cwd() + "/organisation.json";

export async function POST(req: Request) {
    const body = await req.json();
    fs.writeFile(file, JSON.stringify(body), err => {
        if (err) {
            console.log(err);
        }
    });
    return new Response();
}

// optimized ?
// todo: modify the README.md instead of a json

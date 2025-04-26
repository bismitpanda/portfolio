import { readFileSync } from "fs";

const filePath = process.argv[2];
if (!filePath) {
  process.exit(1);
}

const content = readFileSync(filePath, "utf8");
console.log(JSON.stringify(content));

import fs from "fs"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dir = path.resolve(__dirname, '..', '..');

export const returnDataBase = async ()=>  {
  const DB = path.join(__dir, "DB.json");
  const dataRaw = fs.readFileSync(DB, "utf8");
  let jsonFile = JSON.parse(dataRaw);
  return jsonFile;
};



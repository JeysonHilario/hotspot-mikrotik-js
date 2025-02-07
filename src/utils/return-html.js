import fs from "fs/promises"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); 
const __dirname  = path.dirname(__filename);
const __dir = path.resolve(__dirname,"..","public")
const file = path.join(__dir,"index.html")


export async function returnHTML() {
  try {
    const fileData = await fs.readFile(file, "utf8"); // Agora funciona corretamente
    return fileData;
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    throw error;
  }
};


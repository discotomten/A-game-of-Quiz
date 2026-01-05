import fs from "fs/promises";

const filePath = "./server/data/users.json";

export async function getUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

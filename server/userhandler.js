import fs from "fs/promises";

const filePath = "./server/data/users.json";

export async function getUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function saveUsers(users) {
  await fs.writeFile(
    filePath,
    JSON.stringify(users, null, 2) // null betyder ändra ingenting och 2 gör två mellanslag per nivå, lättare att läsa i json
  );
}

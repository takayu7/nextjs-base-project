import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

// ユーザーデータの取得
export async function fetchUserDatas() {
  try {
    const data = await sql`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  };
};
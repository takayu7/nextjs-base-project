import { neon } from "@neondatabase/serverless";
import { User, Type } from "@/app/types/type";

const sql = neon(process.env.POSTGRES_URL!);

// ユーザーデータの取得
export async function fetchUserDatas() {
  try {
    const data = await sql`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}

//ユーザーデータの登録
export async function addUserDatas(user: User) {
  try {
    const data = await sql`
    INSERT INTO users 
    VALUES (${user.id}, ${user.name}, ${user.password}, ${user.address}, ${user.birthday})`;
    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create user.");
  }
}

//カテゴリデータの取得
export async function getCategoryData() {
  try {
    const data = await sql`SELECT * FROM categories ORDER BY category_id`;
    const formatted = data.map((c) => ({
      id: c.category_id,
      name: c.name,
      color: c.color,
      icon: c.icon,
      typeId: c.type_id,
    }));
    return formatted;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
}

//カテゴリデータの削除
export async function deleteCategoryData(id: number) {
  try {
    const data = await sql`DELETE FROM categories WHERE id=${id} RETURNING *;`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete category data.");
  }
}

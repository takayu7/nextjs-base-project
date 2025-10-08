import { neon } from "@neondatabase/serverless";
import { User, Type, Record } from "@/app/types/type";

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
    const data = await sql`SELECT * FROM categories ORDER BY id`;
    const formatted = data.map((c) => ({
      id: c.id,
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

//記入履歴データの取得
export async function getRecordData(userId: string) {
  try {
    const data = await sql`
    SELECT 
      r.id,
      r.type_id,
      r.user_id,
      r.category_id,
      c.name AS category_name, 
      c.color AS category_color,
      c.icon AS category_icon,
      r.money,
      r.date,
      r.memo
    FROM records r
    LEFT JOIN categories c ON r.category_id = c.id
    WHERE r.user_id = ${Number(userId)}
    ORDER BY r.date DESC`;
    const formatted = data.map((i) => ({
      id: i.id,
      typeId: i.type_id,
      userId: i.user_id,
      categoryId: i.category_id,
      money: i.money,
      date: i.date,
      memo: i.memo,
      categoryName: i.category_name,
      categoryColor: i.category_color,
      categoryIcon: i.category_icon,
    }));
    console.log("getRecordData formatted:", formatted);
    return formatted;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
}

//支出・収入の登録
export async function addRecorData(record: Record){
  try{
    const data =await sql `
    INSERT INTO records 
    VALUES (
    ${record.id}, 
    ${record.typeId}, 
    ${record.userId}, 
    ${record.categoryId}, 
    ${record.money}, 
    ${record.date}, 
    ${record.memo} 
    )
    RETURNING *;`;
    return data;
  }catch(error){
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
}

import { neon } from "@neondatabase/serverless";
import { User, AppRecord, Budget } from "@/app/types/type";

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

//ログイン処理
export async function loginUser(address: string, password: string) {
  try {
    const data = await sql`
      SELECT * FROM users
      WHERE address = ${address} AND password = ${password};
    `;
    return data[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to login user.");
  }
}

//ユーザーデータの登録
export async function addUserDatas(user: User) {
  try {
    const data = await sql`
    INSERT INTO users (name, password, address, birthday)
    VALUES (${user.name}, ${user.password}, ${user.address}, ${user.birthday})
    RETURNING *;
    `;
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
       date: new Date(i.date).toISOString().split("T")[0].replace(/-/g, "."),
      memo: i.memo,
      categoryName: i.category_name,
      categoryColor: i.category_color,
      categoryIcon: i.category_icon,
    }));
    console.log("getRecordData formatted:", formatted);

    //日付ごとにグループ化
    const groupedByDate = formatted.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {} as Record<string, (typeof formatted)[number][]>);
    return groupedByDate;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
}

//支出・収入の登録
export async function addRecorData(record: AppRecord) {
  try {
    const data = await sql`
    INSERT INTO records (
    type_id,
    user_id,
    category_id,
    money,
    date,
    memo
    )
    VALUES (
    ${Number(record.typeId)}, 
    ${Number(record.userId)}, 
    ${Number(record.categoryId)}, 
    ${Number(record.money)}, 
    ${record.date}, 
    ${record.memo} 
    )
    RETURNING *;`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create record data.");
  }
}

//支出・収入の更新
export async function updateRecorData(record: AppRecord) {
  try{
    const data=await sql`
    UPDATE records
    SET
      category_id = ${record.categoryId},
      money = ${record.money},
      date = ${record.date},
      memo = ${record.memo}
    WHERE
      id = ${record.id}
    RETURNING *;
    `;
    return data;
  }catch(error){
    console.error("Database Error:", error);
    throw new Error("Failed to update record.");
  }
}

//予算データの取得
export async function getBudgetData(userId: string) {
  try {
    const data = await sql`
    SELECT * 
    FROM budget 
     WHERE user_id = ${Number(userId)}
    `;
    const formatted = data.map((i) => ({
      id: i.id,
      userId: i.user_id,
      money: i.money,
      yearMonth: i.year_month,
    }));
    return formatted;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch budget data.");
  }
}

//予算データの取得（現在の月の予算データのみ）
export async function getBudgetDataByMonth(targetDate: string, userId:number) {
  try {
    const data = await sql`
    SELECT * 
    FROM budget 
    WHERE budget.year_month = ${targetDate}
    AND user_id = ${userId}
    `;
    const formatted = data.map((i) => ({
      id: i.id,
      userId: i.user_id,
      money: i.money,
      yearMonth: i.year_month,
    }));
    return formatted;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch budget data.");
  }
}


//予算データの登録
export async function addBudgetDatas(budget: Budget) {
  try {
    const data = await sql`
    INSERT INTO budget (
    user_id,
    money,
    year_month
    )
    VALUES (
    ${Number(budget.userId)}, 
    ${Number(budget.money)}, 
    ${budget.yearMonth}
    ) 
    RETURNING *;`;
    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create budget data.");
  }
}

//予算データの更新
export async function updateBudgetDatas(budget:Budget) {
  try{
    const data=await sql`
    UPDATE budget
    SET
      money= ${budget.money}
    WHERE
      user_id = ${budget.userId}
      AND
      year_month = ${budget.yearMonth}
    RETURNING *;
    `;
    return data;
  }catch(error){
    console.error("Database Error:", error);
    throw new Error("Failed to update budget.");
  }
}
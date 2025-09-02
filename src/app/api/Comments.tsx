"use server";
import { neon } from "@neondatabase/serverless";

export async function getComments() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql`SELECT * FROM comments`;
  return result;
}

export async function createComment(formData: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get("comment");
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }

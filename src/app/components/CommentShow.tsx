"use client";
import { getComments } from "@/app/api/Comments";

import { useEffect, useState } from "react";

export default function CommentShow() {
  const [comments, setComments] = useState<Array<Record<string, number>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchComments() {
      try {
        const data = await getComments();
        setComments(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  return (
    <>
      <h2>Comments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {comments.map((comment: Record<string, number>, index: number) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </>
  );
}

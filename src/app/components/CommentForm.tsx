"use client";
import {createComment} from '@/app/api/Comments'

export default function CommentForm() {

  return (
    <form action={createComment} className='flex gap-2'>
      <input type="text" placeholder="write a comment" name="comment" className='border border-gray-200 rounded-md' />
      <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Submit</button>
    </form>
  );
}

"use client";
import { useState } from "react";

export default function CommentAdd( {onPost} ) {
    
    const [commentText, setCommentText] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        onPost();
    }
    
    return(
        <form 
            className="flex"
            onSubmit={handleSubmit}>
            <textarea 
                className="p-2 border-2 rounded-l border-slate-300 focus:outline-none w-full"
                type="text"
                placeholder="+ コメントを入力"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            ></textarea>

            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-700 flex-shrink-0"
            >投稿</button>
            
        </form>
    );
} 
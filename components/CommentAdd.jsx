"use client";
import { useState } from "react";

export default function CommentAdd( {onPost} ) {
    
    const [commentText, setCommentText] = useState('');
    const handleSubmit = (event) => {
        // event.preventDefault();
        // onPost(commentText);
        // setCommentText("");
        if(event) event.preventDefault();
        if(!commentText.trim()) return;

        onPost(commentText);
        setCommentText("");
    };
    
    const handleKeyDown = (e) => {
        if(e.nativeEvent.isComposing || e.key !== "Enter") return;

        if(!e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return(
        <div className="fixed bottom-0 left-0 w-full z-50">
            <form 
                className="flex"
                onSubmit={handleSubmit}>
                <textarea 
                    className="p-2 border-2 rounded-l border-slate-300 focus:outline-none w-full"
                    type="text"
                    placeholder="+ コメントを入力"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                ></textarea>

                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-700 flex-shrink-0"
                >投稿</button>
                
            </form>
        </div>
    );
} 
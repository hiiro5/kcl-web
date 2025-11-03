"use client";
import { useState } from "react";

export default function ContentsAddPop({ onAdd, onCancel }) {
   //タイトルとurlのstate
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({title, imageUrl});
    };

    return(
        <div className="fixed inset-0 flex items-center justify-center border bg-black/50">
            <form onSubmit={handleSubmit} className="bg-blue-100 p-8 rounded-lg shadow-xl max-w-md overflow-y-auto max-h-full">
                <h1>追加したい作品は？</h1>
                <input value={title} 
                       onChange={e => setTitle(e.target.value)} 
                       className="w-full p-2 border rounded mb-4"
                       placeholder="タイトル"/>
                <input value={imageUrl} 
                       onChange={e => setImageUrl(e.target.value)}
                       className="w-full p-2 border rounded mb-4"
                       placeholder="画像URL" />
                <div className="flex justify-end">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded hover:text-blue-600">キャンセル</button>
                    <button type ="submit" className="px-4 py-2 rounded hover:text-blue-600">追加</button> 
                </div>
            </form>
        </div>
    );

}
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
        <div className="fixed border bg-blue-200">
            <h1>
                追加したい作品は？
            </h1>
            <form onSubmit={handleSubmit} className="bg-white">
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                <div className="flex justify-end">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded">キャンセル</button>
                    <button type ="submit" className="px-4 py-2 rounded">追加</button> 
                </div>
            </form>
        </div>
    );

}
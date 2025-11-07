"use client";
import { useState } from "react";

export default function ContentsAdd( {onClick} ) {
    
    // const [contentsText, setContentsText] = useState('');
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     onPost(contentsText);
    //     //setCommentText("");
    // };


    return(
        <button 
            type ="submit"
            className="fixed bottom-8 right-8 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick = {onClick}>＋ コンテンツ追加</button>
        
    );
}
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
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick = {onClick}>＋</button>
        
    );
}
"use client";

import { useState } from 'react';
import Contents from "./Contents.jsx";
import SpoilerAlert from "./SpoilerAlert.jsx"

const contentsData = [
    {id:1,title:'映画A', commentCount:5, imageUrl:"a.jpg"},
    {id:2,title:'アニメB', commentCount:12, imageUrl:'b.jpg'},
    {id:3,title:'映画C',commentCount:0, imageUrl:'c.jpg'},
    {id:4,title:'漫画D', commentCount:8, imageUrl:'d.jpg'},
    {id:5,title:'ドラマE',commentCount:23, imageUrl:'e.jpg'},
];


export default function Main() {
    // const [showAlert, setShowAlert] = useState(true);
    const [selectedContent, setSelectedContent] = useState(null);
    
    const handleContentClick = (content) => {
        console.log(content.title + "がクリックされました！");
        setSelectedContent(content);
    }

    return(
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contentsData.map(contents => (
                    <Contents
                        key={contents.id}
                        title={contents.title}
                        commentCount={contents.commentCount}
                        imageUrl={contents.imageUrl}
                        onClick={() => handleContentClick(contents)}
                    />
                ))}
            </div>

            {(selectedContent !== null) && (
                <SpoilerAlert 
                    onConfirm={() => setSelectedContent(null)}
                    onCancel={() => setSelectedContent(null)}
                />
            )}

        </main>

    );
}
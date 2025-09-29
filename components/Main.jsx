"use client";

import { useState } from 'react';
import Contents from "./Contents.jsx";
import SpoilerAlert from "./SpoilerAlert.jsx"
import {useRouter} from "next/navigation";
import Search from "./Search.jsx";
import ContentsAdd from "./ContentsAdd.jsx"
import ContentsAddPop from "./ContentsAddPop.jsx";

const contentsData = [
    {id:1,title:'映画A', commentCount:5, imageUrl:"a.jpg"},
    {id:2,title:'アニメB', commentCount:12, imageUrl:'b.jpg'},
    {id:3,title:'映画C',commentCount:0, imageUrl:'c.jpg'},
    {id:4,title:'漫画D', commentCount:8, imageUrl:'d.jpg'},
    {id:5,title:'ドラマE',commentCount:23, imageUrl:'e.jpg'},
];

const commentsData = [
    {id:1, comment:'おもろい', good:3, bad:0},
    {id:2, comment:'さいこー', good:5, bad:1},
    {id:3, comment:'nice', good:2, bad:1},
];


export default function Main() {
    
     //検索ワードを記憶するためのstate
    const [searchTerm, setSearchTerm]=useState("")
    
    //どのコンテンツが選択されているかをあらわすstate
    const [selectedContent, setSelectedContent] = useState(null);
    const router = useRouter();
    
    const handleContentClick = (content) => {
        //console.log(content.title + "がクリックされました！");
        setSelectedContent(content);
    }

    //今のコンテンツ
    const [contents, setContents] = useState(contentsData);
    //コンテンツの追加ボタンのstate
    const [contentsAddButton, setContentsAddButton] = useState(false);

    const contentsAddClick = (content) => {
        setContentsAddButton(content);
    }


    //検索のsearchTermを元に、表示するコンテンツの絞り込み
    const filteredContents = contents.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //「はい」のときの処理
    const handleConfirm = () => {
        if(selectedContent) {
            router.push(`/${selectedContent.id}`);
        }
        setSelectedContent(null);
    }

    //「いいえ」のときの処理
    const handleCancel = () => {
        setSelectedContent(null);
    };

    //コンテンツ「追加」のときの処理
    const handleAddContent = (newContentData) => {
        const newContent = {
            id:Date.now(),
            title: newContentData.title,
            imageUrl: newContentData.imageUrl,
            commentCount:0,
        };
        setContents([...contents, newContent]);
        setContentsAddButton(false);
    };

    return(
        <main className="max-w-7xl mx-auto px-4 py-8">
            <Search 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContents.map(contents => (
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
                    contentTitle={selectedContent.title} 
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}

            <ContentsAdd 
                onClick = {() => setContentsAddButton(true)}
            />

            {contentsAddButton && (
                <ContentsAddPop
                    onAdd={handleAddContent}
                    onCancel={()=> setContentsAddButton(false)}
                />
            )}



        </main>

    );
}
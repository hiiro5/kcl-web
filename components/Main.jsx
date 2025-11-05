"use client";

import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase/clients";

//import { useState } from 'react';
import Contents from "./Contents.jsx";
import SpoilerAlert from "./SpoilerAlert.jsx"
import { useRouter } from "next/navigation";
import Search from "./Search.jsx";
import ContentsAdd from "./ContentsAdd.jsx"
import ContentsAddPop from "./ContentsAddPop.jsx";
import Login from "./Login.jsx";
import Explain from "./Explain.jsx";
import DeleteButton from "./DeleteButton";

const supabase = createClient();

// const contentsData = [
//     {id:1,title:'映画A', commentCount:5, imageUrl:"a.jpg"},
//     {id:2,title:'アニメB', commentCount:12, imageUrl:'b.jpg'},
//     {id:3,title:'映画C',commentCount:0, imageUrl:'c.jpg'},
//     {id:4,title:'漫画D', commentCount:8, imageUrl:'d.jpg'},
//     {id:5,title:'ドラマE',commentCount:23, imageUrl:'e.jpg'},
// ];

const commentsData = [
    { id: 1, comment: 'おもろい', good: 3, bad: 0 },
    { id: 2, comment: 'さいこー', good: 5, bad: 1 },
    { id: 3, comment: 'nice', good: 2, bad: 1 },
];


export default function Main() {
    const [session, setSession] = useState(null);
     //検索ワードを記憶するためのstate
    const [searchTerm, setSearchTerm] = useState("")

    //どのコンテンツが選択されているかをあらわすstate
    const [selectedContent, setSelectedContent] = useState(null);
    const router = useRouter();

    const handleContentClick = (content) => {
        //console.log(content.title + "がクリックされました！");
        setSelectedContent(content);
    }

    //今のコンテンツ
    const [contents, setContents] = useState([]);
    //コンテンツの追加ボタンのstate
    const [contentsAddButton, setContentsAddButton] = useState(false);

    const contentsAddClick = (content) => {
        setContentsAddButton(content);
    }

    //いま誰がログインしているか
    const [currentUser, setCurrentUser] = useState(null);
    //ログインボタンのstate
    //const [login, setLogin] = useState(true);

    //ログイン中のユーザ情報
    useEffect(() => {
        const fetchUser = async () => {
            const { data:{user}} = await supabase.auth.getUser();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);



    //データの取得
    useEffect(() => {
        const fetchContents = async () => {
            const { data, error } = await supabase
                .from("contents")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) {
                setContents(data);
            } else {
                console.log("データ取得失敗", error);
            }
        };
        fetchContents();
    }, []);

    //検索のsearchTermを元に、表示するコンテンツの絞り込み
    const filteredContents = contents.filter(content =>
        content.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //「はい」のときの処理
    const handleConfirm = () => {
        if (selectedContent) {
            router.push(`/${selectedContent.id}`);
        }
        setSelectedContent(null);
    }

    //「いいえ」のときの処理
    const handleCancel = () => {
        setSelectedContent(null);
    };

    //ログインボタン
    // const handleLogin = () => {
    //     setLogin(false);
    // }

    //コンテンツ「追加」のときの処理
    const handleAddContent = async (newContentData) => {
        // if(!newContentData.title.trim() || !newContentData.imageUrl.trim()) {
        //     alert("タイトルと画像を入力してください");
        //     return;
        // }
        // const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        // if (sessionError) {
        //     console.error(sessionError);
        // }

        const {title, file} = newContentData;
        if(!title.trim() || !file) {
            alert("タイトルと画像を入力してください");
            return;
        }

        try {
            const {data: {user}, error:userError} = await supabase.auth.getUser();
            if( userError || !user) {
                throw new Error("ログインしていません。アップロードできません。");
            }
            const username = user?.user_metadata?.username || "名無し";

            const uniqueFileName = `${Date.now()}-${file.name}`;
            const filePath = `uploads/${user.id}/${uniqueFileName}`;

            const { data: uploadData, error: storageError } = await supabase.storage
                .from("content-images")
                .upload(filePath, file, {
                    contentType: file.type
                });

            if (storageError) {
                throw storageError;
            }

            const {data: urlData} =supabase.storage
                .from("content-images")
                .getPublicUrl(uploadData.path);

            if(!urlData || !urlData.publicUrl) {
                throw new Error("画像URLの取得に失敗しました");
            }

            const imageUrl = urlData.publicUrl;

            //データベースに情報を保存
            const {data: newEntry, error:dbError} = await supabase
                .from("contents")
                .insert([
                 {
                     name: title,
                     picture: imageUrl,
                     username: username,
                     //user_id:user.id
                 }
             ])
            .select()
            .single();

        if(dbError) {
            throw dbError;
        }

        if(newEntry) {
            setContents(prevContents => [newEntry, ...prevContents]);
        }

    }catch (error) {
            console.error("アップロード処理中にエラーが発生しました",error.message);
            alert(`エラー:${error.message}`);
        }

        //ポップアップを閉じる
        setContentsAddButton(false);
    };     

    //     if (error) {
    //         console.log("データ追加失敗", error);
    //     } else if (newEntry) {
    //         setContents(prevContents => [newEntry, ...prevContents]);
    //     }

    //     // const newContent = {
    //     //     id:Date.now(),
    //     //     title: newContentData.title,
    //     //     imageUrl: newContentData.imageUrl,
    //     //     commentCount:0,
    //     // };
    //     // setContents([...contents, newContent]);
    //     setContentsAddButton(false);
    // };

    //画面からコンテンツを削除する関数
    const handleContentDelete = (deleteId) => {
        setContents(prevContents =>
            prevContents.filter(content =>content.id !== deleteId)
        );
        setSelectedContent(null);
    };

// {filteredContents.map(content => {

//     
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">

            {/* {login &&  */}
            <Login />
            {/* // onLoginButton={() => setLogin(false)}/>} */} 
            <Explain />
            <Search
                searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContents.map(content => {
                    const currentUsername = currentUser?.user_metadata?.username;

                    return(
                        <div key={content.id}>
                            <Contents
                                name={content.name}
                                //commentCount={content.commentCount}
                                imageUrl={content.picture}
                                onClick={() => handleContentClick(content)}
                                username={content.username}
                                created_at={content.created_at}
                            />
                        {currentUsername && content.username === currentUsername && (
                           <div className="p-2 text-right">
                                    <DeleteButton
                                        postId={content.id}
                                        tableName="contents"
                                        onDeleteSuccess={handleContentDelete}
                                    />
                            </div> 
                        )}
                    </div>

                    );
                })}
            </div>

            {(selectedContent !== null) && (
                <SpoilerAlert
                    contentTitle={selectedContent.name}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )} 

            <ContentsAdd
                onClick={() => setContentsAddButton(true)}
            />

            {contentsAddButton && (
                <ContentsAddPop
                    onAdd={handleAddContent}
                    onCancel={() => setContentsAddButton(false)}
                />
            )}



        </main>
    );
}
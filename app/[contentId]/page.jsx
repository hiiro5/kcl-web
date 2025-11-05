"use client";

import { useState, useEffect } from "react";
import CommentList from "../../components/CommentList.jsx";
import Header from "../../components/Header.jsx";
import CommentAdd from "../../components/CommentAdd.jsx";
import PostAlert from "../../components/PostAlert.jsx";
//import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js";
import { createClient } from "../../lib/supabase/clients";
import DeleteButton from "../../components/DeleteButton.jsx";

const supabase = createClient();

// const commentsData = [
//     { id: 1, comment: 'おもろい', good: 3, bad: 0 },
//     { id: 2, comment: 'さいこー', good: 5, bad: 1 },
//     { id: 3, comment: 'nice', good: 2, bad: 1 },
// ];

export default function CommentPage({ params }) {


    //コメントリスト全体のデータ
    const [comments, setComments] = useState([]);
    //ポップアップを表示するかどうか
    const [postButton, setPostButton] = useState(false);
    //投稿待ちのコメントのテキスト
    const [commentToPost, setCommentToPost] = useState("");
    //ユーザ情報
    const [currentUser,setCurrentUser] = useState(null);

    useEffect( () => {
        console.log("useEffect running for ID:",params.contentId);
        const fetchComments = async () => {
            //URLからコンテンツIDを取得
            const contentId = params.contentId
            if(!contentId || typeof contentId !== "string" || contentId.length !== 36) {
                console.error("コンテンツIDがparamsの中で見つかりません");
                return;
            }
            //Supabaseからコメントを取得
            const {data, error} = await supabase
                .from("contents_details")
                .select("*")
                .eq("contents_id",contentId)
                .order("created_at", {ascending: true});
            
            console.log("Supabase fetch result:",{data, error});
            if (data) {
                setComments(data);
            } else {
                console.error("コメント取得失敗",error);

            }
        };
        fetchComments();
    }, [params.contentId]);

    //ログイン中のユーザ情報取得
    useEffect(() => {
        const fetchUser = async () => {
            const {data:{user}} = await supabase.auth.getUser();
            setCurrentUser(user);
        };
        fetchUser();
    },[]);

    //「投稿」のときの処理
    const handlePost = (text) => {
        setCommentToPost(text);//コメントの記憶
        setPostButton(true);//ポップアップの表示
    };

    //「はい」が押されたとき
    const handleConfirmPost = async() => {
        // const newComment = {
        //     id: Date.now(),
        //     comment:commentToPost,
        //     good:0,
        //     bad:0,
        // };
        // setComments([... comments, newComment]);
        
        // setPostButton(false);
        //setCommentToPost("");

        const {data: {user}} = await supabase.auth.getUser();
        const username = user?.user_metadata?.username || "名無し";

        if(!commentToPost.trim()) {
            alert("コメントを入力してください");
            setPostButton(false);
            setCommentToPost("");
            return;
        }

        const contentId = params.contentId;
        if( !contentId || !commentToPost) {
            console.error("IDが無効かコメントが空");
            return;
        }

        const {data:newEntry,error} = await supabase
            .from("contents_details")
            .insert([
                {
                    comment: commentToPost,
                    contents_id: contentId,
                    username: username
                }
            ])
            .select()
            .single();

        if(newEntry) {
            setComments(prevComments => [...prevComments, newEntry]);
            setPostButton(false);
            setCommentToPost("");
        } else {
            console.error("コメント追加失敗",error);
            setPostButton(false);
            setCommentToPost("");
        }

    };

    //「かきなおす」が押されたとき
    const handleCancelPost = () => {
        setPostButton(false);
        setCommentToPost("");
    };

    //画面(State)からコメントを削除する関数
    const handleCommentDelete = (deletedId) => {
        setComments(prevComments =>
            prevComments.filter(comment => comment.id !== deletedId)
        );
    };

    return (
        <main>
            <div>
                <Header />
                {/* <h1>コンテンツ: {params.contentId} のコメントページ</h1>
                <p>ここにコメント一覧や投稿フォームを作っていきます。</p> */}
                {comments.map(comment => {
                    const currentUsername = currentUser?.user_metadata?.username;

                    return (
                        <div key={comment.id}>
                            <CommentList
                                key={comment.id}
                                comment={comment.comment}
                                good_count={comment.good_count}
                                bad_count={comment.bad_count}
                                username={comment.username}
                                created_at={comment.created_at}
                            />
                            {currentUsername && comment.username === currentUsername && (
                                <div className="p-2 text-right">
                                    <DeleteButton
                                        postId={comment.id}
                                        tableName="contents_details"
                                        onDeleteSuccess={handleCommentDelete}
                                    />
                                </div>
                            )}
                            </div>
                    );
})}
                <CommentAdd
                    onPost={handlePost} />
            </div>

            {(postButton === true) && (
                < PostAlert 
                    contentTitle={commentToPost}
                    onConfirm={handleConfirmPost}
                    onCancel={handleCancelPost}
                />
                    
            )}
        </main>
    );
}
"use client";

import { useState } from "react";
import CommentList from "../../components/CommentList.jsx";
import CommentHeader from "../../components/CommentHeader.jsx";
import CommentAdd from "../../components/CommentAdd.jsx";
import PostAlert from "../../components/PostAlert.jsx";

const commentsData = [
    { id: 1, comment: 'おもろい', good: 3, bad: 0 },
    { id: 2, comment: 'さいこー', good: 5, bad: 1 },
    { id: 3, comment: 'nice', good: 2, bad: 1 },
];

export default function CommentPage({ params }) {

    //コメントリスト全体のデータ
    const [comments, setComments] = useState(commentsData);
    //ポップアップを表示するかどうか
    const [postButton, setPostButton] = useState(false);
    //投稿待ちのコメントのテキスト
    const [commentToPost, setCommentToPost] = useState("");

    //「投稿」のときの処理
    const handlePost = (text) => {
        setCommentToPost(text);//コメントの記憶
        setPostButton(true);//ポップアップの表示
    };

    //「はい」が押されたとき
    const handleConfirmPost = () => {
        const newComment = {
            id: Date.now(),
            comment:commentToPost,
            good:0,
            bad:0,
        };
        setComments([... comments, newComment]);
        
        setPostButton(false);
        //setCommentToPost("");
    };

    //「かきなおす」が押されたとき
    const handleCancelPost = () => {
        setPostButton(false);
        setCommentToPost("");
    };

    return (
        <main>
            <div>
                <CommentHeader />
                {/* <h1>コンテンツ: {params.contentId} のコメントページ</h1>
                <p>ここにコメント一覧や投稿フォームを作っていきます。</p> */}
                {comments.map(comment => (
                    <CommentList
                        key={comment.id}
                        comment={comment.comment}
                        good={comment.good}
                        bad={comment.bad}
                    />
                ))}
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
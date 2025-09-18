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

    const [postButton, setPostButton] = useState(false);

    //「投稿」のときの処理
    const handlePost = () => {
        setPostButton(true);
    }

    return (
        <main>
            <div>
                <CommentHeader />
                {/* <h1>コンテンツ: {params.contentId} のコメントページ</h1>
                <p>ここにコメント一覧や投稿フォームを作っていきます。</p> */}
                {commentsData.map(comments => (
                    <CommentList
                        key={comments.id}
                        comment={comments.comment}
                        good={comments.good}
                        bad={comments.bad}
                    />
                ))}
                <CommentAdd
                    onPost={handlePost} />
            </div>

            {(postButton === true) &&
                < PostAlert />
            }
        </main>
    );
}
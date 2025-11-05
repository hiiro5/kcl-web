"use client";

import { createClient } from "../lib/supabase/clients";

const supabase = createClient();

export default function DeleteButton({ postId, tableName, onDeleteSuccess }) {
    const handleDelete = async () => {
        // 削除確認
        if (!confirm("本当にこの投稿を削除しますか？")) {
            return;
        }

        try {
            // Supabaseからデータを削除
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', postId); // IDが一致するものを削除

            if (error) {
                // RLSポリシー違反などでエラーになる可能性
                throw error;
            }

            // 成功したら、親コンポーネントに通知
            onDeleteSuccess(postId);
            alert("削除しました。");

        } catch (error) {
            console.error("削除に失敗しました:", error.message);
            alert("削除に失敗しました。");
        }
    };

    return (
        <button 
            onClick={handleDelete}
            className="text-red-500 text-sm font-semibold hover:underline"
        >
            削除
        </button>
    );
}
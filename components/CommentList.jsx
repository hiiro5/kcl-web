export default function CommentList({comment, good_count, bad_count, username, created_at}) {
    return (
        <div className="border bg-blue-100">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">ユーザー：{username || '名無し'}</span>
                <span className="text-xs text-gray-600">
                    {created_at ? new Date(created_at).toLocaleString('ja-JP'):""}
                </span>
            </div>
            
            <h1>{comment}</h1>
            <div className="text-sm flex gap-4">
                <h2>♡:{good_count}</h2>
                <h3>×:{bad_count}</h3>
            </div>
            
        </div>
    );
}
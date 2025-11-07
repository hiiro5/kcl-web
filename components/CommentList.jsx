export default function CommentList({comment, good_count, bad_count, username, created_at, children}) {
    return (
        <div className="relative border bg-blue-100 ">
            <div className="flex justify-between items-center pt-1">
                <span className="text-sm text-gray-600">ユーザー：{username || '名無し'}</span>
                <span className="text-xs text-gray-600">
                    {created_at ? new Date(created_at).toLocaleString('ja-JP'):""}
                </span>
            </div>
            
            <div className="pl-2">
                <h1>{comment}</h1>
                
                <div className="flex justify-between items-baseline gap-4 mt-1">
                    <div className="text-sm flex gap-4">
                        <h2>♡:{good_count}</h2>
                        <h3>×:{bad_count}</h3>
                    </div>
                    <div className="text-right">
                        {children}
                    </div>
                </div>
            </div>
            
        </div>
    );
}
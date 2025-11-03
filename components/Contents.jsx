"use client";

export default function Contents({name, imageUrl, onClick, username, created_at}) {
    return (
        <div 
            className="border-2 border-slate-300 bg-blue-100 rounded-lg hover:bg-blue-200 shadow-md"
            onClick={onClick}
        >
            <h1>{name}</h1>
            {/* <h2>コメント数:{commentCount}</h2> */}
            <img
                src={imageUrl}
                alt={name}
                className="h-32 w-full object-cover aspect-video"
            />
            <p className="text-sm text-gray-600">作成者：{username || "名無し"}</p>
            <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString("ja-JP")}</p>
        </div>

    );
}
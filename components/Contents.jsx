"use client";

export default function Contents({name, imageUrl, onClick, username, created_at, commentCount}) {
    return (
        <div 
            className="relative border-2 border-slate-300 bg-blue-100 rounded-lg hover:bg-blue-200 shadow-md"
            onClick={onClick}
        >
            <h1 className="m-2 font-medium text-slate-800">{name}</h1>
            <h2 className="absolute  top-2 right-2 text-sm text-gray-700 px-2 ">コメント数:{commentCount !== undefined ? commentCount : "?"}</h2> 
            <div className="p-4">
                <img
                    src={imageUrl}
                    alt={imageUrl}
                    className="w-full object-contain aspect-video bg-gray-500"
                />
                <p className="text-sm text-gray-600 mt-2">作成者：{username || "名無し"}</p>
                <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString("ja-JP")}</p>
            </div>
        </div>

    );
}
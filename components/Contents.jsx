export default function Contents({title, commentCount, imageUrl, onClick}) {
    return (
        <div 
            className="border-2 border-slate-300 bg-blue-100 rounded-lg hover:bg-blue-200"
            onClick={onClick}
        >
            <h1>{title}</h1>
            <h2>コメント数:{commentCount}</h2>
            <h3>画像:{imageUrl}</h3>
        </div>

    );
}
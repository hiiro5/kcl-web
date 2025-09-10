export default function Contents({title, commentCount, imageUrl}) {
    return (
        <div>
            <h1>{title}</h1>
            <h2>コメント数:{commentCount}</h2>
            <h3>画像:{imageUrl}</h3>
        </div>
    );
}
export default function CommentList({id, comment, good, bad}) {
    return (
        <div className="border bg-blue-100">
            <h1>{comment}</h1>
            <div className="text-sm flex gap-4">
                <h2>♡:{good}</h2>
                <h3>×:{bad}</h3>
            </div>
            
        </div>
    );
}
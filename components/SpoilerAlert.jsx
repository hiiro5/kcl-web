export default function SpoilerAlert({contentTitle, onCancel, onConfirm}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-blue-100 p-8 rounded-lg text-center">
                <h3 className="text-left underline ">{contentTitle}</h3>
                <h2 className="text-xl font-bold mb-4">
                   感想にはネタバレが含まれることがありますが許容しますか？ 
                </h2>
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        むり
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        おけ
                    </button>
                </div>
            </div>
        </div>
    );
}

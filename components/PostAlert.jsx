export default function PostAlert() {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-blue-100 p-8 rounded-lg text-center">
                {/* <h3 className="text-left underline ">{contentTitle}</h3> */}
                <h2 className="text-xl font-bold mb-4">
                   このコメントを作品への愛と敬意をもって投稿することを誓いますか？ 
                </h2>
                <div className="flex justify-center gap-4">
                    <button 
                        // onClick={onCancel} 
                        className="w-28 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        かきなおす
                    </button>
                    <button 
                        // onClick={onConfirm} 
                        className="w-28 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        誓います
                    </button>
                </div>
            </div>
        </div>
    );    
}
"use client";

export default function Explain() {
    return (
        <div className="bg-white border-2 border-blue-200 p-6 rounded-lg mb-8 shadow-sm " style={{backgroundColor:"#ddf1feff"}}>
                <h2 className="text-xl font-bold text-center mb-4 text-shadow-outline" style={{color:"#3b9de3ff"}}>
                    かたるめいと は作品を愛する人のための感想共有サイトです
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ルール */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 underline" style={{color:"#f9a601c3"}}>ルール</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>作品を楽しんだ前提で交流しましょう。</li>
                            <li>ネタバレOKです！ 好きなシーンを熱く語ってください。</li>
                            <li>作品への愛と敬意をもったコメントを投稿しましょう。</li>
                        </ul>
                    </div>

                    {/* 使い方 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 underline" style={{color:"#f9a601c3"}}>使い方</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>作品カードをクリックするとコメント欄に進みます。</li>
                            <li>ホーム画面右下の「＋」ボタンから新しい作品を追加できます。</li>
                        </ul>
                    </div>
                </div>

                <p className="text-right font-medium mt-6">
                    では早速始めましょう！ ↓
                </p>
            </div>
    );
}
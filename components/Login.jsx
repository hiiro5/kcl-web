export default function Login ({onLoginButton}) {
    
    
    return(
        
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-blue-100 p-8 rounded-lg text-center">
                <form>
                    <div className="flex-col">
                            <textarea
                                type="text"
                                placeholder="メールアドレス">
                            </textarea>
                            <textarea
                                type="text"
                                placeholder="ユーザー名"
                            ></textarea>
                    </div>                    
                    <button
                        type="submit"
                        className="border"
                        onClick={onLoginButton}>ログイン</button>
                    <button
                        type="submit"
                        className="border"
                        onClick={onLoginButton}>新規作成</button>
                </form>
            </div>
        </div>
        
        
    );

}
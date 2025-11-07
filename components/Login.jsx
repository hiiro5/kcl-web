"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Supabaseと通信するための設計図をインポート
import { createClient } from '../lib/supabase/clients';

export default function Login() {
  const [loginedUser, setLoginedUser] = useState(null); //ログインしているか
  const [islogined, setIsLogined] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // 新規登録モード
  const [email, setEmail] = useState("");         // メールアドレス
  const [password, setPassword] = useState("");   // パスワード
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");         // エラーメッセージ
  const [loading, setLoading] = useState(false);  // 処理中
  const router = useRouter();
  const supabase = createClient(); // 設計図からSupabaseクライアントを作成

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setIsLogined(false);
      } else {
        setLoginedUser(data.user);
        setIsLogined(true);
      }
    }
    fetchUser();
  }, []) //初回読み込み時のみ

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,

          // ユーザー名をsupabaseに渡す
          options: {
            data: {
              username: username,
            }
          }
        });
        if (error) throw error;
        setError("確認メールを送信しました。メールをご確認ください。");
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
        setLoginedUser(data.user);
        setIsLogined(true);
        router.refresh();
        }
      }
    } catch (error) {
      //console.error("handleSubmitでキャッチしたエラー:", error);
      setError(error.message);

      if(error.message === "Invalid login credentials") {
        setError("メールアドレスかパスワードが間違っています");
      } else {
        setError("ログイン中にエラーが発生しました");
      }

    } finally {
      setLoading(false);
    }
  };

  if (islogined === null || islogined === true) return null


  return (

    <div className=" z-50 fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-blue-100 p-8 rounded-lg text-center">

        <form onSubmit={handleSubmit}>
          {/* ログイン時 */}
          {isSignUp && (
            <input
              type="text"
              placeholder="ユーザー名"
              className="w-full p-2 border rounded mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? '処理中...' : (isSignUp ? '登録する' : 'ログイン')}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          {isSignUp ? 'ログイン画面へ' : '新規登録はこちら'}
        </button>

        {/* <form>
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
                </form> */}
      </div>
    </div>


  );

}
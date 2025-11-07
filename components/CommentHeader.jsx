import LogoutButton from "./Logout.jsx";

export default function Header({searchTerm, setSearchTerm}) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center border bg-blue-300">
      <img src="/logo2.png" alt="ロゴ" className="h-15 w-auto pl-2"/>
      {/* <h1 className="text-lg font-medium p-2">感想共有サイト</h1> */}
      <div className="flex items-center">
        
        <div className="p-4">
          <LogoutButton />
          {/* <nav>
            <a href="/">ホーム</a>
            <a href="/about">このサイトについて</a>
          </nav> */}
          {/* <Search /> */}
        </div>
      </div>

    </header>

  );
}
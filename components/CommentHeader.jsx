import LogoutButton from "./Logout.jsx";
import Link from "next/link";

export default function Header({searchTerm, setSearchTerm}) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center border bg-blue-300">
        <div className="flex items-center">
            <Link href="/">
                <img src="/logo2.png" alt="ロゴ" className="h-15 w-auto pl-2 cursor-pointer"/>
            </Link>
            <img src="/backToTop.png" alt="うえにもどる" className="h-15 w-auto pl-2 cursor-pointer"
            onClick={() => scrollTo({ top:0, behavior: "smooth"})}/>
        </div>
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
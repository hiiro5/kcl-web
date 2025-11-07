// components/Header.jsx

//import Search from "./Search.jsx";

"use client";

import LogoutButton from "./Logout.jsx";
import Search from "./Search.jsx";



export default function Header({searchTerm, setSearchTerm}) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center border bg-blue-300">
      <div className="flex items-center">
        <img src="/logo2.png" alt="ロゴ" className="h-15 w-auto pl-2 cursor-pointer"/>
        {/* <h1 className="text-lg font-sm p-2 "></h1> */}
        <img src="/backToTop.png" alt="うえにもどる" className="h-15 w-auto pl-2 cursor-pointer"
        onClick={() => scrollTo({ top:0, behavior: "smooth"})}/>
      </div>
      <div className="flex items-center">
        <div>
          <Search 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
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
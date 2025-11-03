// components/Header.jsx

//import Search from "./Search.jsx";

"use client";

import LogoutButton from "./Logout.jsx";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center border bg-blue-300 p-2">
      <h1 className="text-lg font-medium">感想共有サイト</h1>
      <LogoutButton />
      {/* <nav>
        <a href="/">ホーム</a>
        <a href="/about">このサイトについて</a>
      </nav> */}
      {/* <Search /> */}


    </header>

  );
}
"use client";
import {useState} from "react";

import Header from '../components/Header.jsx'; // 1. 部品を読み込む
//import Search from "../components/Search.jsx";
import Main from "../components/Main.jsx";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/> {/* 2. 部品を呼び出す */}
      {/* <Search /> */}
      <main>
        {/* <p>ここにメインのコンテンツが入ります。</p> */}
        <Main 
         searchTerm={searchTerm}/>
      </main>
    </div>
  );
}
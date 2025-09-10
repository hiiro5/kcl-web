// import React from 'react';
// class Search extends React.Component {
//     render() {
//         return(
//             <div>
//                 <iput type ="text" placeholder="検索..."/>
//                 <button>検索</button>
//             </div>
//         );
//     }
// }

export default function Search() {
    return(
     <form className="flex items-center">
        <input 
            type ="text " 
            placeholder="🔍検索..."
            className="p-2 border rounded-l-md focus:outline-slate-300 my-4"/>
                
        <button 
            type ="submit"
            className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-700">検索</button>
            
    </form>   
    );
}
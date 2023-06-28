// import "./SearchBar.css";
// import React, { FormEvent, useState } from "react";
// // import SearchIcon from "@material-ui/icons/Search";
// // import CloseIcon from "@material-ui/icons/Close";
// import FoodResponse from "../models/FoodResponse";

// interface Props {
//   placeholder: string;
//   data: FoodResponse[];
// }

// const SearchBar = ({ placeholder, data }: Props) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");

//   const handleFilter = (event: any) => {
//     const searchWord = event.target.value;
//     setWordEntered(searchWord);
//     const newFilter = data.filter((value) => {
//       console.log(value.branded);
//       return "testing filter";
//       //   value.branded

//       //   .toLowerCase().includes(searchWord.toLowerCase());
//     });

//     if (searchWord === "") {
//       setFilteredData([]);
//     } else {
//       setFilteredData(newFilter);
//     }
//   };

//   const clearInput = () => {
//     setFilteredData([]);
//     setWordEntered("");
//   };

//   return (
//     <div className="search">
//       <div className="searchInputs">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={wordEntered}
//           onChange={handleFilter}
//         />
//         {/* <div className="searchIcon">
//           {filteredData.length === 0 ? (
//             // <SearchIcon />
//           ) : (
//             // ?<CloseIcon id="clearBtn"
//             //  <onClick={clearInput} />
//           )}
//         </div> */}
//       </div>
//       {filteredData.length != 0 && (
//         <div className="dataResult">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <a className="dataItem" href={value.link} target="_blank">
//                 <p>{value} </p>
//               </a>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

const SearchBar = () => {
  return <div className="SearchBar">SearchBar works</div>;
};

export default SearchBar;

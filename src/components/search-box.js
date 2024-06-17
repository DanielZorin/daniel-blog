import { useState } from "react";
import { Link } from "react-router-dom";

export function SearchBox() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex">
      <input type="text" className="border-[1px] flex-grow min-w-0" onChange={(e) => setSearch(e.target.value)} />
      <Link to={"/search/" + search}>
        <button className="searchButton">&#x1F50D;</button>
      </Link>
    </div>
  );
}

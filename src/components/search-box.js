import { useState } from "react";
import { Link } from "react-router-dom";

export function SearchBox() {
  const [search, setSearch] = useState("");
  return (
    <div className="searchBox">
      <input type="text" className="border-[1px]" onChange={(e) => setSearch(e.target.value)} />
      <Link to={"/search/" + search}>
        <button className="searchButton">&#x1F50D;</button>
      </Link>
    </div>
  );
}

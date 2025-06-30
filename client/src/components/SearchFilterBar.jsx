import { useState } from "react";

const SearchFilterBar = ({ onSearch }) => {
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [sort, setSort] = useState("");

	const handleSearch = () => {
		onSearch({ keyword, category, minPrice, maxPrice, sort });
	};

	return (
		<div className="flex flex-wrap gap-2 p-4">
			<input
				placeholder="Search..."
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<input
				placeholder="Min Price"
				type="number"
				value={minPrice}
				onChange={(e) => setMinPrice(e.target.value)}
			/>
			<input
				placeholder="Max Price"
				type="number"
				value={maxPrice}
				onChange={(e) => setMaxPrice(e.target.value)}
			/>
			<input
				placeholder="Category"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			/>
			<select value={sort} onChange={(e) => setSort(e.target.value)}>
				<option value="">Sort</option>
				<option value="price-asc">Price ↑</option>
				<option value="price-desc">Price ↓</option>
			</select>
			<button onClick={handleSearch}>Apply</button>
		</div>
	);
};

export default SearchFilterBar;

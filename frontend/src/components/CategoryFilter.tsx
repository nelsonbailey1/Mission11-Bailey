import { useEffect, useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter({
    selectedCategories,
    setSelectedCategories}: 
    {selectedCategories: (string[]);
    setSelectedCategories: (categories: string[]) => void}) {

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("https://localhost:5011/api/Book/GetBookCategories")
            const data = await response.json();
            setCategories(data);
        }

        fetchCategories();

    }, [])

    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }

    return(
        <div className="category-filter">
            <h5>Category Types</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input type="checkbox" 
                        id={c} 
                        value={c} 
                        className="category-checkbox"
                        onChange={handleCheckboxChange}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
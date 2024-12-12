import React, { useState } from 'react';
import './Category.css';
const Category = ({ categoryList, setFilterList, filterList }) => {
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleCheckboxChange = (subcategory) => {
        const updatedFilterList = filterList.includes(subcategory)
            ? filterList.filter((item) => item !== subcategory)
            : [...filterList, subcategory];

        setFilterList(updatedFilterList);


    };
    return (
        <div className='category'>
            {Object.entries(categoryList).map(([category, subcategories]) => (
                <div key={category} style={{ marginBottom: '15px' }}>
                    <h2 onClick={() => toggleCategory(category)}>
                        {category} {expandedCategories[category] ? '-' : '+'}
                    </h2>
                    {
                        expandedCategories[category] && (
                            <ul className='subList'>
                                {subcategories.map((subcategory) => (
                                    <li key={subcategory}>
                                        <label>
                                            <input type="checkbox" onChange={(e) => handleCheckboxChange(subcategory)} />
                                            {subcategory}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            ))
            }
        </div >
    );
};

export default Category;

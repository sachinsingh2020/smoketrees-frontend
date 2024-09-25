import React from 'react';

const FilterDropdown = ({ filter, setFilter, names }) => {
    return (
        <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '20px', padding: '8px', width: '200px' }}
        >
            {names.map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
            ))}
        </select>
    );
};

export default FilterDropdown;

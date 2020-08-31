import React, { FunctionComponent } from 'react';
import './HeaderSection.scss';

const HeaderSection: FunctionComponent = React.memo(() => {
    return (
        <div className="header-section">
            <h1>All Products</h1>
            <div className="tagline">
                <span>A 360&#176; look at Lumin</span>
                <select>
                    <option>Filter by</option>
                </select>
            </div>
        </div>
    )
})

export default HeaderSection;
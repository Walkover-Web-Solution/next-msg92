import React, { useState } from 'react';

const FlagImage = ({ flagUrl, flag, countryName, className }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError || !flagUrl) {
        return (
            <span className={className} aria-hidden='true'>
                {flag}
            </span>
        );
    }

    return (
        <img src={flagUrl} alt={countryName} className={className} onError={() => setImageError(true)} loading='lazy' />
    );
};

export default FlagImage;

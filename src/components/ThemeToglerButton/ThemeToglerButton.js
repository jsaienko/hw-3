import React, { useContext }from 'react';
import ThemeContext from '../ThemeContext';

import './ThemeToggleButton.scss';

function ThemeTogglerButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    let classNames = `theme-btn btn ${theme}`;

    return (
        <button className={classNames}
            onClick={()=> toggleTheme(
                theme === `light`
                ? `dark`
                : `light`)}>
            {theme === `light` ? `Set dark theme` : `Set light theme`}
        </button>
    );
}

export default ThemeTogglerButton;
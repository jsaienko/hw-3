import React, { useState } from 'react';

import ThemeContext from '../ThemeContext';
import ThemeTogglerButton from '../ThemeToglerButton';
import ToDoList from '../ToDoList';

import './App.scss';

function App() {
    const [theme, toggleTheme] = useState(`light`);
    const value = { theme, toggleTheme };

    let classNames = `app ${theme}`;

  return (
    <div className={classNames}>
        <div className="container">
            <div className="title">TODO APP</div>
        </div>
        <ThemeContext.Provider value={ value }>
            <ThemeTogglerButton />
          <ToDoList/>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;

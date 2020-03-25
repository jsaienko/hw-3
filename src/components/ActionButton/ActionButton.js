import React, { useContext } from "react";
import ThemeContext from '../ThemeContext';

import './ActionButton.scss';

const ActionButton = props => {
    const { toDo, deleteToDo } = props;

    const { theme } = useContext(ThemeContext);

    const classNames = `btn ${theme}`;
    return (
      <button
          className={classNames}
          title="Delete Task"
          onClick={() => deleteToDo(toDo)}
      >
       Delete task
      </button>
    );
};

export default ActionButton;
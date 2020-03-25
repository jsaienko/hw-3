import React, { useContext } from 'react';

import ActionButton from '../ActionButton/';
import ThemeContext from '../ThemeContext';

import './ToDoListItem.scss';

const ToDoListItem =  props => {
    const { toDo, toggleToDo, deleteToDo } = props;

    const { theme } = useContext(ThemeContext);

    let classNames = `todo-list-item ${theme}`;

    if (toDo.completed) {
        classNames += ' done';
    }

    return (
        <li className={classNames}>
            <h2
                onClick={() => toggleToDo(toDo)}>
                {toDo.title}
            </h2>
            <div className="todo-list-item__button">
                <ActionButton
                    toDo={toDo}
                    deleteToDo={deleteToDo}
                />
            </div>
        </li>
    );
};


export default ToDoListItem;
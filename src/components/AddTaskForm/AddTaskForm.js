import React, {useContext, useEffect, useState} from 'react';

import ThemeContext from '../ThemeContext';
import useFetch from '../hooks';

import './AddTaskForm.scss';
import Preloader from "../Preloader";

const AddTaskForm = props => {
    const { addTask, newTaskTitle, setNewTaskTitle } = props;

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [isOpened, setOpened] = useState(false);

    const { theme } = useContext(ThemeContext);

    const usersApi = useFetch('https://jsonplaceholder.typicode.com/users');

    let classNames = `add-form-wrapper ${theme}`;
    const btnSaveClassNames = `add-form-btn btn ${theme}`;
    const btnToggleClassNames = `add-form-btn-close btn ${theme}`;

    if(isOpened) {
        classNames += ' opened ';
    }

    useEffect(() => {
        if(!isOpened) return;
        console.log(`opened`);
        setLoading(true);
        usersApi
            .get()
            .then(data => setUsers(data));
        setLoading(false);

    }, [isOpened]);

    if(isLoading) {
        return (
            <div className={classNames}>
                <Preloader/>
                <button
                    className={btnToggleClassNames}
                    onClick={()=>setOpened(true)}>
                    Add new task
                </button>
            </div>
            );
    }

    if(isOpened) return (
        <div className={classNames}>
            <h2>Add new task</h2>
            <button
                type="button"
                className={btnToggleClassNames}
                onClick={()=>setOpened(false)}>
                X
                </button>
            <form className="add-form">
                <input
                    type="text"
                    value={newTaskTitle}
                    placeholder="Write new task"
                    onChange={event => setNewTaskTitle(event.target.value)}
                />
                <p className="select-area">
                    <label>Choose user</label>
                    <select>
                        {users.map(user =>
                            <option
                                key={user.id}
                                value={ user.id }
                                onChange={()=>setUserId( user.id )}
                            >
                                { user.name }
                            </option>
                        )}
                    </select>
                </p>

                <button
                    className={btnSaveClassNames}
                    type="button"
                    onClick={()=>addTask(userId)}
                >Save</button>
            </form>
        </div>
    );

    return (
        <div className={classNames}>
            <button
                className={btnToggleClassNames}
                onClick={()=>setOpened(true)}>
                Add new task
            </button>
        </div>
    );
};

export default AddTaskForm;
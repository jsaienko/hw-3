import React, { useState, useEffect, useContext } from 'react';

import useFetch from '../hooks';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import AddTaskForm from '../AddTaskForm';
import Preloader from '../Preloader';

import ThemeContext from '../ThemeContext';

import './ToDoList.scss';


export default function ToDoList () {
    const [toDos, setToDos] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const tasksApi = useFetch('https://jsonplaceholder.typicode.com/todos');

    const { theme } = useContext(ThemeContext);
    let classNames = `todo-list ${theme}`;

    useEffect(() => {
        setLoading(true);
        tasksApi
            .get()
            .then(data => setToDos(data));
        setLoading(false);
    }, []);

    const addTask = userId => {
        setLoading(true);
        tasksApi
            .post({
                id: Math.random()+'',
                userId: userId,
                title: newTaskTitle,
                completed: false,
            })
            .then(data => {
                const newList = [...toDos, data];
                setToDos(newList);
                setNewTaskTitle('');
                setLoading(false);
            });
    };

    const toggleToDo = task => {
        const { id, completed } = task;
        setLoading(true);
        tasksApi
            .put(id, {
                completed: !completed,
            })
            .then(data => {
                const newList = toDos
                      .map(listElement => {
                          if (listElement.id === id) {
                              listElement.completed = data.completed;
                          }
                          return listElement;
                    });
                setToDos(newList);
                setNewTaskTitle("");
                setLoading(false);
            });
    };

    const deleteToDo = task => {
        const { id } = task;
        setLoading(true);
        tasksApi.del(id).then(() => {
            const newList = toDos
                  .filter(listElement => listElement.id !== id);
            console.log(newList);
            setToDos(newList);
            setLoading(false);
        });
    };

    if(isLoading) return (
        <div className="todo-wrapper">
            <Preloader/>
            <ul className={classNames}>
                <li>
                    <AddTaskForm
                        addTask={addTask} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}
                    />
                </li>
                {toDos.map(toDo =>
                    <ToDoListItem
                        key={toDo.id}
                        toDo={toDo}
                        toggleToDo={toggleToDo}
                        deleteToDo={deleteToDo}
                        isLoading ={isLoading}
                    />)}
            </ul>
        </div>
    );

  return (
      <div className="todo-wrapper">
          <ul className={classNames}>
              <li>
                  <AddTaskForm
                      addTask={addTask} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}
                  />
              </li>
              {toDos.map(toDo =>
                  <ToDoListItem
                      key={toDo.id}
                      toDo={toDo}
                      toggleToDo={toggleToDo}
                      deleteToDo={deleteToDo}
                      isLoading ={isLoading}
                  />)}
          </ul>
      </div>

  )
}
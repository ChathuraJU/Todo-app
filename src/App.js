import React, {useState, useEffect} from 'react';
import './App.css';
//importing components

import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {

    //states
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    //use effect
    useEffect(() => {
        getLocalTodos();
    }, []);
    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    //functions
    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.completed !== true));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    //save to local
    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };
    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);

        }
    };

    return (
        <div className="App">
            <section>
                <header>
                    <h1>To Do List</h1>
                </header>
                <subheader>
                    <h4 style={{color: "white", marginLeft: "70px"}}>Add the tasks here</h4>
                </subheader>

                < Form
                    inputText={inputText}
                    todos={todos}
                    setTodos={setTodos}
                    setInputText={setInputText}
                    setStatus={setStatus}
                />
                < TodoList
                    setTodos={setTodos}
                    todos={todos}
                    filteredTodos={filteredTodos}
                />
            </section>
        </div>
    );

}
export default App;

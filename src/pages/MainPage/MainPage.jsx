import React, {useState, useContext, useCallback, useEffect} from "react"
import axios from 'axios'
import "./MainPage.scss"
import swal from 'sweetalert'
import {AuthContext} from "../../context/AuthContext";
// import {use} from "express/lib/router";

/**
 * Hlavni stranka aplkace
 * @param url
 * @param config
 * @returns {JSX.Element}
 * @constructor
 */

const MainPage = (url, config) => {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([])
    const [visible, setVisible] = useState(false);
    const [todoID, setID] = useState(-1);
    // const [showJson, setShowJson] = React.useState(false)
    // const [jsonText, setjsonText] = useState([])


    const getTodo = useCallback(async () => {
        try {
            await axios.get('/api/todo/', {
                headers: {'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => {
                    setTodos(response.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if (!text) return null
        try {
            await axios.post('/api/todo/add', {
                text, userId,
                headers: {'Content-Type': 'application/json'}
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    setText('')
                    getTodo()
                })

        } catch (e) {
            console.log(e)
        }
    }, [text, userId, todos, getTodo])

    const removeTodos = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(() => getTodo())

        } catch (e) {
            console.log(e)
        }
    }, [getTodo])

    const completeTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/complete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/important/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])

    useEffect(() => {
        getTodo()
    }, [getTodo])


    const getByID = useCallback(async (id) => {
        try {
            await axios.get(`/api/todo/get/${id}`, {
                headers: {'Content-Type': 'application/json'},
            })
                .then(response => {
                    setText(response.data.text)
                    setVisible(!visible)
                })
        } catch (e) {
            console.log(e)
        }
    }, [visible])

    //
    // const showJSON = useCallback(async () => {
    //     try {
    //         await axios.get('/api/todo/', {
    //             headers: {'Content-Type': 'application/json'},
    //             params: {userId}
    //         })
    //             .then(response => {
    //                 setjsonText(response.data)
    //             })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [userId])


    const updateStates = useCallback(async (id) => {
        setID(id)
        setVisible(!visible)
    }, [visible])


    /**
     * Zmena ukolu v seznamu
     * @type {(function(*): Promise<void|undefined>)|*}
     */
    const updateTodo = useCallback(async (id) => {
        try {

            if (!text) return swal("Enter new titile in Task field")
            await axios.put(`/api/todo/update/${id}`, {text}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    setText('')
                    getTodo()
                })

        } catch (e) {
            console.log(e)
        }
    }, [text, todos, getTodo])

    /**
     * Ziskani vshech hotovych ukolu
     * @type {(function(): Promise<void>)|*}
     */
    const getCompleted = useCallback(async () => {
        try {
            await axios.get('/api/todo/completed', {
                headers: {'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    /**
     * Ziskani nepripravenych ukolu
     * @type {(function(): Promise<void>)|*}
     */
    const getUncompleted = useCallback(async () => {
        try {
            await axios.get('/api/todo/uncompleted', {
                headers: {'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const openInNewTab = userId => {
        var url = "http://localhost:8000/api/todo/?userId=" + userId
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    return (
        <div>
            <div className="main-page">
                <h4>Add task:</h4>
                <form className="form form-login" onSubmit={event => event.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Enter your task"
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div style={{display: visible ? 'none' : 'block'}}>
                            <button
                                id="submit"
                                className="waves-effect waves-light btn blue"
                                onClick={createTodo}
                            >Add task
                            </button>
                        </div>
                        <div style={{display: visible ? 'block' : 'none'}}>
                            <button
                                id="submit"
                                className="waves-effect waves-light btn blue"
                                onClick={() => {
                                    updateTodo(todoID);
                                    setVisible(!visible);
                                }}
                            >Save
                            </button>
                        </div>
                    </div>
                </form>
                <h3>Tasks:</h3>
                <div className="row">
                    <button id={"combutton"}
                            className="waves-effect waves-light btn blue"
                            onClick={getTodo}
                    >All tasks
                    </button>
                    <button id={"combutton"}
                            className="waves-effect waves-light btn blue"
                            onClick={getCompleted}
                    >Сompleted
                    </button>
                    <button id={"combutton"}
                            className="waves-effect waves-light btn blue"
                            onClick={getUncompleted}
                    >Outstanding
                    </button>
                    <button id={"combutton"}
                            className="waves-effect waves-light btn blue"
                            onClick={() => {
                                // showJSON();
                                // setShowJson(!showJson);
                                openInNewTab(userId);
                            }}
                    >Json
                    </button>
                </div>
                {/*<div className="row" style={{display: showJson ? 'block' : 'none'}}>*/}
                {/*    <p className="flow-text"> JSON: </p>*/}
                {/*    {jsonText.map((object) => {*/}
                {/*        return (*/}
                {/*            <div key={object._id}>*/}
                {/*                <p>"_id": {object._id},</p>*/}
                {/*                <p>"owner": {object.owner},</p>*/}
                {/*                <p>"text": {object.text},</p>*/}
                {/*                <p>"completed": {String(object.completed)},</p>*/}
                {/*                <p>"important": {String(object.important)},</p>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })*/}
                {/*    }*/}
                {/*</div>*/}
                <div className="todos">
                    {
                        todos.map((todo, index) => {
                            let cls = ['row flex todos-item']
                            if (todo.completed) {
                                cls.push('completed')
                            }
                            if (todo.important) {
                                cls.push('important')
                            }
                            return (
                                <div className={cls.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons blue-text" onClick={() => {
                                            updateStates(todo._id);
                                            getByID(todo._id);
                                        }
                                        }>border_color</i>
                                        <i className="material-icons blue-text"
                                           onClick={() => completeTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text"
                                           onClick={() => importantTodo(todo._id)}>warning</i>
                                        <i className="material-icons red-text"
                                           onClick={() => removeTodos(todo._id)}>delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage
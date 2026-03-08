import React, { useState } from 'react'
import { useTasks } from '../hooks/useTasks';

const TodoApp = () => {

    const { data: list = [], isLoading, addTask, updateTask, deleteTask } = useTasks();

    const [text, setText] = useState('')
    const [updateList, setUpdateList] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [updateText, setUpdateText] = useState("");

    const handleAddList = () => {
        if (!text.trim()) return;
        addTask(text);
        setText('')
    }

    const handleUpdate = () => {
        if (!updateText.trim()) return;

        updateTask({
            id: currentTask._id,
            task: updateText,
        });

        setUpdateList(false);
        setCurrentTask(null);
        setUpdateText("");
    };

    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-blue-200 text-white">
            <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl space-y-3 items-center'>
                <div className='flex py-6 justify-center'>
                    <h1 className='text-2xl font-bold'>To Do List</h1>
                </div>
                <div className='flex justify-around items-center w-full space-x-3 py-4'>
                    <input type="text" placeholder="Add a new task..." value={text} onChange={(e) => setText(e.target.value)} className='flex w-100 py-3 text-center rounded-2xl bg-white text-gray-800' />
                    <button className='font-bold bg-green-700 p-3 rounded-2xl' onClick={handleAddList}>Add Task</button>
                </div>
                <div className='h-[300px] overflow-y-auto'>
                    <ul className='space-y-3'>
                        {isLoading ? (
                            <div className='text-center'>
                                Loading...
                            </div>
                        ) : (
                            list.map((item) => (
                                <li key={item._id} className='bg-gray-700 p-4 rounded-2xl flex justify-between items-center'>
                                    <span>{item.task}</span>
                                    <div className='space-x-3'>
                                        <button
                                            className="bg-blue-700 p-2 rounded-2xl font-bold"
                                            onClick={() => {
                                                setUpdateList(true);
                                                setCurrentTask(item);
                                                setUpdateText(item.task);
                                            }}
                                        >
                                            Update
                                        </button>

                                        <button className='bg-red-600 p-2 rounded-2xl font-bold'
                                            onClick={() => { deleteTask(item._id) }}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )
                        }
                    </ul>
                </div>

                {updateList && (
                    <div className='fixed inset-0 flex justify-center items-center'>
                        <div className='bg-gray-600 p-6 rounded-2xl text-white'>
                            <h2 className='text-xl font-bold mb-4 text-center'>Update Task</h2>
                            <input
                                type="text"
                                placeholder="Upadet task..."
                                value={updateText}
                                onChange={(e) => { setUpdateText(e.target.value) }}
                                className='flex w-100 py-3 my-2 text-center rounded-2xl bg-white text-gray-800'
                            />
                            <div className='flex justify-end space-x-3'>
                                <button
                                    className='bg-green-700 p-3 rounded-2xl text-white font-bold'
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                                <button
                                    className='bg-red-600 p-3 rounded-2xl text-white font-bold'
                                    onClick={() => setUpdateList(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoApp

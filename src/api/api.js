const BASE_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
}

export const addTask = async (task) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task })
    });
    return res.json();
}

export const updateTask = async ({id, task}) => {
    const res = await fetch(`${BASE_URL}/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task })
    });
    return res.json();
}

export const deleteTask = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return res.json();
}
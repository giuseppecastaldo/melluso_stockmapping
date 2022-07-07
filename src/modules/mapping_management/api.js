import axios from "axios";

export async function getTodo(id) {
    return (await (axios.get('https://jsonplaceholder.typicode.com/todos/1'))).data
}
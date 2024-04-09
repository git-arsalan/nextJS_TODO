"use server";

export const GetTodos = async (url:string) => 
{
    const fetchTodos = await fetch(url);
    const res = fetchTodos.json();
    return res;
}
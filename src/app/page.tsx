'use client'

import { useEffect, useState } from "react";

export default function Home() {
  // define state
  interface todo
  {
    id:number,
    content:string | "",
    is_finished:boolean
  }

  const mytodo = {} as todo;
const [todos,setTodos] = useState([mytodo]);



const [userVal,inputVal] = useState("");
const [IdVal,inputIdVal] = useState(0);
//console.log("InputVal", userVal);

useEffect(()=>{
  const getData = async () =>{
    const fetchTodo = await fetch('http://localhost:8000/ReadTodos/');
    const response = await fetchTodo.json();

    console.log(response);
    setTodos(response);
  }
  getData();


},[])

// function
  const addTodo = ()=>
  {
  //   let obj:any = todos.find(item => item.id == IdVal)
  //  // console.log(obj)
  //   if (obj)
  //   {
  //     let newArray = todos.filter(item => item.id !== obj.id)
  //     setTodos([...newArray,{todo:userVal, id:IdVal}]) // appending edited object in todos
  //     inputVal("");
  //     inputIdVal(0);
  //     return

  //   }
    
  //     setTodos([...todos,{todo:userVal, id:IdVal}]) // appending new object in todos
  //     inputVal("");
  //     inputIdVal(0);
    
   
  }

  const editItem = (id:any) => 
  {
   // let obj = {} as todo;
    let obj = todos?.find(item => item.id == id)
    //console.log(obj);
    
    inputVal(obj!.content);
    inputIdVal(obj!.id);
  }

  const deleteItem = (id:any) =>
  {
    // let obj:any = todos.find(item => item.id == id)
    // if (obj)
    // {
    //   let newArray = todos.filter(item => item.id !== obj.id)
    //   setTodos([...newArray])
    // }

   // inputVal(obj.todo);
    //inputIdVal(obj.id);
  }

// function

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-xl underline mt-4 mb-4">TODO MANAGEMENT</h1>

      {/* text and button div */}
      <div className="flex justify-between gap-4">
        <input id='txtInput' type='text' value={userVal} onChange={(e)=> inputVal(e.target.value)}  
        className="w-[60%] p-2 ml-4 text-lg border-b focus:outline-none" placeholder="Please Enter Todo Task"></input>
        <input id='txtId' type="text"  value={IdVal} onChange={(e:any)=> inputIdVal(e.target.value)}
        className="w-[20%] p-2 ml-4 text-lg border-b focus:outline-none" placeholder="ID"></input>
        <button onClick={addTodo}
         className="w-[20%] bg-blue-400  text-white p2 rounded-md hover:bg-blue-800">ADD</button>
      </div>
      {/* text and button div end*/}

      <h1 className="text-center text-xl underline mt-5">TODO LIST</h1>
      

      {/* Task List  div */}
      <div className="grid gap-4 grid-cols-2 mt-5">
      {
        todos.map((_item:any, _index:any) => {

          return(
            <div key={_index +1} className="shadow p-4">
            <div className="flex justify-between text-lg">
             <span className="shadow rounded-full h-8 w-8 text-center my-auto">{_index+1}</span>
             <span onClick={()=>deleteItem(_item.id)}
                    className="shadow rounded-full h-8 w-8 text-center my-auto cursor-pointer text-red-700">x</span>
            </div>
             {/* Data Div*/}
   
             <div  className="mt-5 text-[30px] text-gray-700">
                 {_item.content}
             </div>
             <div>
               <h2 onClick={()=>editItem(_item.id)} className="text-right cursor-pointer">Edit</h2>
             </div>
             {/* Data div end*/}
   
           </div>
          )
        })
      }
        
        
      </div>
      {/* Task List  div */}

    </div>
  );
}

import { useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'

function App() {
   const [tasks, setTasks] = useState([])
   const [newTask, setNewTask] = useState("")

   const addTask = () => {
      if(newTask?.trim()){
         setTasks([...tasks, {
            id: Date.now(),
            name: newTask,
            isCompleted: false
         }])
         setNewTask("")
      }
   }
   function setTaskComplete(taskId){
      setTasks(tasks.map((task) => task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task))
   }
   function deleteTask(taskId){
      setTasks(tasks.filter(task => task.id !== taskId))
   }
   function editTask(taskId){}
   
   // rewriting everything here
   const [todos, setTodos] = useState([])


   const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
   }

   const updateTodo = (id, todo) => {
      setTodos((prev) => prev.map((prevTodo) => prevTodo.id === todo.id ? todo : prevTodo))
   }

   
   const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
   }

   const toggleComplete = (id) => {
      setTodos((prev) =>
         prev.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
         )
      )
   }







   return (
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
         <div className='w-full h-screen flex justify-center items-center flex-col bg-gradient-to-r from-slate-200 to-zinc-300'>
            <div className='flex justify-center items-center flex-col h-[400px] w-[650px] mt-2'>
               <h1 className='text-4xl font-thin text-center text-gray-700 tracking-widest'>Define your day!</h1>

               <div className='flex justify-center items-center flex-row w-full h-16 mt-5'>

                  <input
                     className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 
                  outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-5 py-3.5 shadow-md focus:shadow-lg focus:shadow-rose-400 w-3/4 mr-3"
                     autoComplete="off"
                     placeholder="Add your task here...  "
                     name="text"
                     type="text"
                     value={newTask}
                     onChange={(e) => setNewTask(e.target.value)}
                  />

                  <button
                     onClick={addTask}
                     className="relative inline-block text-lg group">
                     <span className="relative z-10 block px-5 py-3   overflow-hidden font-medium leading-tight text-gray-800 
                  transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-ful px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Add</span>
                     </span>
                     <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                  </button>

               </div>

               <div className='text-white flex justify-center items-center flex-col w-[580px] mt-1'>
                  {tasks.length === 0 ? (
                     <p className="text-gray-600 mt-4 text-lg tracking-wide">No tasks added yet. Add a task to get started!</p>
                  ) : (tasks.map((task) => {
                     return (
                        <div key={task.id} className='flex flex-row w-[580px] justify-center'>
                           <input
                              className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 
                              outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-5 py-3.5 shadow-md focus:shadow-lg focus:shadow-rose-400 w-3/4 mt-4 flex mr-3"
                              autoComplete="off"
                              name="task"
                              type="text"
                              disabled
                              style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
                              value={task.name}
                           />
                           <button className='bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-yellow-500 
                              outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-5 py-3.5 shadow-md focus:shadow-lg focus:shadow-yellow-500 mt-4 flex hover:bg-yellow-500 hover:text-white mr-3'
                              onClick={() => editTask(task.id)}
                           >
                              Edit
                           </button>
                           <button className='bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-lime-500
                              outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-5 py-3.5 shadow-md focus:shadow-lg focus:shadow-lime-500 mt-4 flex hover:bg-lime-500 hover:text-white mr-3'
                              onClick={() => setTaskComplete(task.id)}

                           >
                              Completed
                           </button>
                           <button className='bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-red-600 
                              outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-5 py-3.5 shadow-md focus:shadow-lg focus:shadow-red-600  mt-4 flex hover:bg-red-600 hover:text-white'
                              onClick={() => deleteTask(task.id)}
                           >
                              Delete
                           </button>
                        </div>
                     )
                  })
                  )}
               </div>

            </div>

         </div>
      </TodoProvider>
   )
}

export default App

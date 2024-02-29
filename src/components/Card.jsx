import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Card({ todo, deleteTodo, toggleTodo }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo.text);

  const onClose = (e) => {
    e.preventDefault(e);
    setOpen(false);
  };

  const updatetodo = async (e) => {
    e.preventDefault(e);
    await updateDoc(doc(db, "todos", todo.id), {
      text: input,
    });
    setOpen(false);
  };

  return (
    <>
      <div className="p-3 flex items-center justify-between mt-5 h-[80px] bg-slate-200 rounded-lg w-[250px] sm:w-[450px] lg:w-[550px]">
        <p className="hidden">{todo.id}</p>
        <div className="flex flex-row items-center space-x-4">
          <input
            checked={todo.completed}
            type="checkbox"
            className="rounded-xl w-4 h-4"
            onClick={(e) => {
              e.preventDefault(e);
              toggleTodo(todo);
            }}
          />
          <h1
            className={`text-2xl font-bold text-gray-900 dark:text-gray-300 ${
              todo.completed ? "cursor-pointer line-through ml-2" : ""
            }`}
          >
            {todo.text}
          </h1>
        </div>
        <div className="flex space-x-2">
          <div
            className="bg-red-500 flex items-center justify-center rounded-xl h-[50px] w-[50px] cursor-pointer"
            onClick={() => deleteTodo(todo.id)}
          >
            <FaTrashAlt color="white" size={20} />
          </div>
          <div
            className="bg-blue-500 flex items-center justify-center rounded-xl h-[50px] w-[50px] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <FaPencilAlt color="white" size={20} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onClose} title={"Edit Todo"}>
        <form onSubmit={(e) => updatetodo(e)}>
          <div className="pt-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaPencilAlt color="white" size={10} className="mr-2" />
            <p>Submit</p>
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Card;

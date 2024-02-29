import React, { useContext, useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import { db } from "../firebase";
import { addDoc, collection, onSnapshot, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { GlobaContext } from "../context/GlobalContext";

function Home() {
  const { todos, setTodos } = useContext(GlobaContext);

  const [input, setInput] = useState("");

  const addTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  }

  const toggleTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed : !todo.completed
    })
  }

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-[#eff1f2] overflow-scroll">
      <div className="flex items-center p-4 text-blue-500">
        <FaCheckSquare size={30} className="mx-2" />
        <h1 className="font-bold text-2xl underline underline-offset-5 decoration-7">
          My Todos
        </h1>
      </div>
      <form onSubmit={addTodo} className="flex justify-between space-x-2">
        <div className="rounded-xl flex items-center bg-white p-2 h-[50px] w-[200px] sm:w-[400px] lg:w-[500px]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent p-2 focus:outline-none w-full ml-2"
          />
        </div>
        <button className="bg-blue-500 flex items-center justify-center rounded-xl h-[50px] w-[50px] cursor-pointer">
          <AiOutlinePlus color="white" size={30} />
        </button>
      </form>
      {todos &&
        todos.map((data, index) => {
          return (
            <Card
              key={index}
              todo={data}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}
        <p className="text-center text-xl font-medium mt-[50px]">{`You have ${todos.length} Todos`}</p>
    </div>
  );
}

export default Home;

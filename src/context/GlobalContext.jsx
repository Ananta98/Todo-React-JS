import React, { createContext, useState } from "react";

export const GlobaContext = createContext();

export const GlobalProvider = (props) => {
  const [todos, setTodos] = useState([]);

  return (
    <GlobaContext.Provider
      value={{
        todos,
        setTodos
      }}
    >
      {props.children}
    </GlobaContext.Provider>
  );
};

import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const saveToLocalStorage = (Todos) => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const handelSave = () => {
    if (Todo.trim() === "") return; // prevent empty todo
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
  };

  // ✅ Trigger save on "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handelSave();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handelCheckbox = (e) => {
    setTodos(
      Todos.map((item) =>
        item.id === e.target.name
          ? { ...item, isCompleted: e.target.checked }
          : item
      )
    );
    saveToLocalStorage(
      Todos.map((item) =>
        item.id === e.target.name
          ? { ...item, isCompleted: e.target.checked }
          : item
      )
    );
  };

  const toggleShowFinished = (params) => {
    setshowFinished(!showFinished);
  };

  const handelEdit = (id) => {
    setTodo(Todos.filter((item) => item.id === id)[0].Todo);
    setTodos(Todos.filter((item) => item.id != id));
    // saveToLocalStorage();
  };

  const handelDelete = (id) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;
    setTodos(Todos.filter((item) => item.id != id));
    saveToLocalStorage(Todos.filter((item) => item.id != id));
  };

  return (
    <>
      <Navbar />
      <div className="bg-violet-200 md:w-[40%] mx-4  md:mx-auto rounded-2xl p-5 min-h-[80vh]">
        <div className="text-xl font-bold md:w-2/3 md:mx-auto py-2 sm:justify-center text-center">
          myTask - Manage your todo at one place
        </div>
        <div className="addTodo">
          <h2 className="font-bold ">Add a Todo</h2>
          <div className=" md:flex">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={Todo}
              className="rounded-full w-full my-2 py-1 px-4 focus:outline-violet-600"
              type="text"
            />
            <button
              onClick={handelSave}
              className="rounded-full text-sm font-bold bg-violet-700 hover:bg-violet-800 p-4 py-2 mx-auto md:mx-5 my-2 text-white w-[100%] md:w-auto"
            >
              Save
            </button>
          </div>
        </div>
        {/* <h2 className="font-bold my-2"></h2> */}
        <input
          type="checkbox"
          onClick={toggleShowFinished}
          checked={showFinished}
          className="mx-2 my-4"
        /> Show Finished Todos
        <hr className="border-t-1 border-gray-400 my-4" />
        <h2 className="font-bold ">Your Todos</h2>
        <div className="todos  mx-4 w-ful justify-between">
          {Todos.length === 0 && (
            <p className="mx-2 my-2">No todos available. Please add a todo.</p>
          )}
          {Todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.Todo}
                  className="todo flex items-center gap-2  w-full my-3 "
                >
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    onChange={handelCheckbox}
                  />
                  <span className={item.isCompleted ? "line-through" : ""}>
                    {item.Todo}
                  </span>
                  <div className="buttons flex h-full right-3/4 ml-auto">
                    <button
                      onClick={() => {
                        handelEdit(item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-900 text-white p-2  rounded-2xl mx-1"
                      key={item.id}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handelDelete(item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-900 text-white p-2 rounded-2xl mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

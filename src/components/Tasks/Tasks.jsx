import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskFilter from "../TaskFilter/TaskFilter";

const Tasks = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Posao");

  useEffect(() => {
    const storedTasks = localStorage.getItem("allTasks");
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then((res) => res.json())
        .then((data) => {
          const apiTasks = data.map((task) => ({
            id: task.id,
            title: task.title,
            completed: task.completed,
            category: "API",
            apiTask: true,
          }));
          setAllTasks(apiTasks);
          localStorage.setItem("allTasks", JSON.stringify(apiTasks));
        })
        .catch(console.error);
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    const maxId = Math.max(0, ...allTasks.map((t) => t.id));
    const newTask = {
      id: maxId + 1,
      title: newTitle,
      completed: false,
      category: newCategory,
      apiTask: false,
    };
    const updatedTasks = [...allTasks, newTask];
    setAllTasks(updatedTasks);
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    setNewTitle("");
    setNewCategory("Posao");
  };

  const handleToggleComplete = (id) => {
    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setAllTasks(updated);
    localStorage.setItem("allTasks", JSON.stringify(updated));
  };

  const filteredTasks = selectedCategory
    ? allTasks.filter((task) => task.category === selectedCategory)
    : allTasks;

  const handleDeleteTask = (id) => {
    if (window.confirm("Jeste li sigurni da želite obrisati ovaj zadatak?")) {
      const updatedTasks = allTasks.filter((task) => task.id !== id);
      setAllTasks(updatedTasks);
      localStorage.setItem("allTasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="container py-4">
      <form
        onSubmit={handleAddTask}
        className="mb-4 d-flex gap-2 align-items-center"
      >
        <input
          type="text"
          placeholder="Naziv zadatka"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="form-control"
          required
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="form-select"
        >
          <option value="Posao">Posao</option>
          <option value="Osobno">Osobno</option>
          <option value="Obitelj">Obitelj</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Dodaj
        </button>
      </form>

      <TaskFilter
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className="list-group mt-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-secondary" : ""
            }`}
          >
            <div>
              <p
                className={`mb-1 fw-semibold ${
                  task.completed
                    ? "text-decoration-line-through text-muted"
                    : ""
                }`}
              >
                {task.title}
              </p>
              <small className="text-muted">{task.category}</small>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`complete-${task.id}`}
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`complete-${task.id}`}
                >
                  Odrađeno
                </label>
              </div>

              <Link
                to={`/${task.apiTask ? "tasks/api" : "tasks/custom"}/${
                  task.id
                }`}
                state={{ task }}
                className="btn btn-outline-primary btn-sm"
              >
                Detalji
              </Link>

              {!task.apiTask && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Obriši
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-center text-muted mt-3">
            Nema zadataka za prikaz.
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;

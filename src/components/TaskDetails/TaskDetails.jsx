import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TaskDetails = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const taskFromState = location.state?.task;

  const [task, setTask] = useState(taskFromState || null);
  const [loading, setLoading] = useState(!taskFromState);

  useEffect(() => {
    if (!taskFromState && type === "api") {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTask({ ...data, category: "API", apiTask: true });
          setLoading(false);
        })
        .catch(console.error);
    } else {
      setLoading(false);
    }
  }, [id, type, taskFromState]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (!task)
    return (
      <div className="alert alert-danger mt-4 text-center">
        Zadatak nije pronađen.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Detalji zadatka</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>ID:</strong> {task.id}
          </p>
          <p>
            <strong>Naslov:</strong> {task.title}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={task.completed ? "text-success" : "text-warning"}>
              {task.completed ? "Dovršeno" : "Nedovršeno"}
            </span>
          </p>
          <p>
            <strong>Kategorija:</strong> {task.category}
          </p>

          <button
            className="btn btn-outline-secondary mt-3"
            onClick={() => navigate(-1)}
          >
            ← Nazad
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

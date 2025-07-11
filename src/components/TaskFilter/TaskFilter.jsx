const TaskFilter = ({ selectedCategory, onChange }) => {
  return (
    <>
      <label htmlFor="filter">Category filter for tasks</label>
      <select
        name="filterCategory"
        id="filter"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All categories</option>
        <option value="Posao">Posao</option>
        <option value="Osobno">Osobno</option>
        <option value="Obitelj">Obitelj</option>
      </select>
    </>
  );
};

export default TaskFilter;

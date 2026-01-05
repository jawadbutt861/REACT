const Display = ({
  expenses,
  onDelete,
  onEdit,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <>
      <h2>Expenses</h2>

      {/* FILTER */}
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
      </select>

      {/* SORT */}
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      {/* CONDITIONAL */}
      {expenses.length === 0 && <p>No expenses found</p>}

      {expenses.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Amount: {item.amount}</p>
          <p>Date: {item.date}</p>
          <p>Category: {item.category}</p>

          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Display;

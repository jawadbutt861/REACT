import { useState } from "react";
import Form from "../component/Form";
import Display from "../component/Display";
import Total from "./component/Total";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // ADD
  const onAddExpense = (expense) => {
    setExpenses((prev) => [...prev, { ...expense, id: Date.now() }]);
  };

  // DELETE
  const onDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // EDIT (select)
  const onEditExpense = (expense) => {
    setEditExpense(expense);
  };

  // UPDATE
  const onUpdateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    );
    setEditExpense(null);
  };

  // FILTER
  const filtered =
    category === "all"
      ? expenses
      : expenses.filter((e) => e.category === category);

  // SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date);
  });

  // TOTAL
  const total = sorted.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <>
      <h1>Expense App (Props + Lift State Up)</h1>

      <Form
        onAddExpense={onAddExpense}
        onUpdateExpense={onUpdateExpense}
        editExpense={editExpense}
      />

      <Total total={total} />

      <Display
        expenses={sorted}
        onDelete={onDeleteExpense}
        onEdit={onEditExpense}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />
    </>
  );
}

export default Home;

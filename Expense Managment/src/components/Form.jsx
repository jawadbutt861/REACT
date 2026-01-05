import { useEffect, useRef } from "react";

const Form = ({ onAddExpense, onUpdateExpense, editExpense }) => {
  const name = useRef();
  const amount = useRef();
  const date = useRef();
  const category = useRef();

  // EDIT MODE
  useEffect(() => {
    if (editExpense) {
      name.current.value = editExpense.name;
      amount.current.value = editExpense.amount;
      date.current.value = editExpense.date;
      category.current.value = editExpense.category;
    }
  }, [editExpense]);

  const submitHandler = (e) => {
    e.preventDefault();

    const expense = {
      id: editExpense ? editExpense.id : null,
      name: name.current.value,
      amount: amount.current.value,
      date: date.current.value,
      category: category.current.value,
    };

    editExpense ? onUpdateExpense(expense) : onAddExpense(expense);

    e.target.reset();
  };

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Name" ref={name} required />
      <input type="number" placeholder="Amount" ref={amount} required />
      <input type="date" ref={date} required />
      <input placeholder="Category" ref={category} required />

      <button>{editExpense ? "Update Expense" : "Add Expense"}</button>
    </form>
  );
};

export default Form;

import { useState, useEffect } from "react";
export default function det() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!amount || !description) return;
    const newExpense = { id: Date.now(), amount: parseFloat(amount), description };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDescription("");
  };

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Daily Expense Tracker</h2>
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={addExpense}
      >
        Add Expense
      </button>
      <h3 className="mt-4 text-lg font-semibold">Total: ${totalExpense.toFixed(2)}</h3>
      <ul className="mt-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="border-b py-2">
            {expense.description} - ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

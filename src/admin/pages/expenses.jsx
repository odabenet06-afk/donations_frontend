import React from "react";
import useAdminStore from "../services/store/adminStore";
import Expenses from "../components/expenseMain";

const expenses = () => {
  const { expenses } = useAdminStore();

  return (
    <div>
      <Expenses expenses={expenses} />
    </div>
  );
};

export default expenses;

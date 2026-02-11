import React, { useEffect } from "react";
import Card from "../components/card";
import useAdminStore from "../services/store/adminStore";
import Home from "../../ledger/pages/home";

const Dashboard = () => {
  const { stats, language, loadDashboardData } = useAdminStore();

  useEffect(() => {
 
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    loadDashboardData(year, month);
  }, []);

  if (!stats) return <p>Loading...</p>;

  const donations = stats.raised;
  const expenses = stats.spent;
  const donors = stats.total_donors;

  const data = [
    { property: "Donations", amount: donations },
    { property: "Expenses", amount: expenses },
    { property: "Reserve", amount: donations - expenses },
    { property: "Donors", amount: donors },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-slate-50 min-h-full w-full box-border">
      <Home footer={false} lang={language} isDashboard={true} />

      <div className="grid grid-cols-12 gap-6 w-full">
        {data.map((field, index) => (
          <Card key={index} data={field} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

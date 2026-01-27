import React from "react";
import Card from "../components/card";
import useAdminStore from "../services/store/adminStore";
import Logs from "../components/logs";

const dashboard = () => {
  const { stats } = useAdminStore();

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
      <div className="grid grid-cols-12 gap-6 w-full">
        {data.map((field, index) => (
          <Card key={index} data={field} />
        ))}
      </div>
      <Logs />
    </div>
  );
};

export default dashboard;

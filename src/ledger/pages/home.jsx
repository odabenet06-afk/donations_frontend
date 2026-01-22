import React from "react";
import Header from "../components/header";
import Card from "../components/card";
import List from "../components/list";

const home = () => {
  const donations = 10000;
  const expenses = 5000;

  const data = [
    { property: "Donations", amount: donations },
    { property: "Expenses", amount: expenses },
    { property: "Reserve", amount: donations - expenses },
  ];
  const date = {
    month: "January",
    year: "2026",
  };

  const ListData = [
    {
      donor: "John Doe",
      purpose: "General Donation",
      date: "2026-01-15",
      amount: 5000,
    },
    {
      donor: "Acme Corp",
      purpose: "Project Support",
      date: "2026-01-20",
      amount: 15000,
    },
    {
      donor: "Jane Smith",
      purpose: "Event Sponsorship",
      date: "2026-01-25",
      amount: 3000,
    },
    {
      category: "Salary",
      purpose: "Staff Payment",
      date: "2026-01-10",
      amount: 4000,
    },
    {
      category: "Utilities",
      purpose: "Office Rent",
      date: "2026-01-18",
      amount: 2000,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <div className="grid grid-cols-1 p-6 gap-6">
        {data.map((item, index) => (
          <Card key={index} data={data[index]} date={date} />
        ))}
        <List data={ListData} type={"donations"} />
      </div>
    </div>
  );
};

export default home;

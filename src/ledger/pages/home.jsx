import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Card from "../components/card";
import List from "../components/list";
import useData from "../hooks/useData";
import Footer from "../components/footer";
import useDataStore from "../services/store/dataStore";

const home = ({ reusable, footer }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const { storeData } = useDataStore();

  const listData = reusable ? reusable : storeData;

  const currentMonthName = today.toLocaleString("en-US", {
    month: "long",
  });
  const donations =
    listData?.donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const expenses =
    listData?.expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  const data = [
    {},
    { property: "Donations", amount: donations },
    { property: "Expenses", amount: expenses },
    { property: "Reserve", amount: donations - expenses },
    {},
  ];
  const date = {
    month: currentMonthName,
    year: currentYear,
  };

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (listData) {
      setFilteredData(listData);
    }
  }, [listData]);

  return (
    <div className="bg-slate-50  min-h-screen">
      <div className="grid grid-cols-1 lg:gap-y-20 lg:grid-cols-8 p-6 gap-6">
        {data.map((item, index) => (
          <Card key={index} data={data[index]} date={date} />
        ))}
        <List
          data={filteredData}
          type={"donations"}
          onFilter={setFilteredData}
        />
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default home;

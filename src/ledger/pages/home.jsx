import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Card from "../components/card";
import List from "../components/list";
import useData from "../hooks/useData";
import Footer from "../components/footer";
import useDataStore from "../services/store/dataStore";
import { useOutletContext } from "react-router-dom";

const Home = ({ reusable, footer, lang: propLang, isDashboard }) => {
  const context = useOutletContext() || {};
  const lang = propLang || context.lang || "en";
  const today = new Date();
  const currentYear = today.getFullYear();
  const { storeData } = useDataStore();

  const listData = reusable ? reusable : storeData;

  const dict = {
    en: {
      Donations: "Donations",
      Expenses: "Expenses",
      Reserve: "Reserve",
      locale: "en-US",
    },
    sq: {
      Donations: "Donacionet",
      Expenses: "Shpenzimet",
      Reserve: "Rezerva",
      locale: "sq-AL",
    },
    mk: {
      Donations: "Донации",
      Expenses: "Трошоци",
      Reserve: "Резерва",
      locale: "mk-MK",
    },
  };

  const currentLang = dict[lang] || dict.en;

  const currentMonthName = today.toLocaleString(currentLang.locale, {
    month: "long",
  });

  const donations =
    listData?.donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const expenses =
    listData?.expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  const data = [
    {},
    { property: currentLang.Donations, amount: donations },
    { property: currentLang.Expenses, amount: expenses },
    { property: currentLang.Reserve, amount: donations - expenses },
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
    <div className={`bg-slate-50 ${isDashboard ? "min-h-0" : "min-h-screen"}`}>
      <div className="grid grid-cols-1 lg:gap-y-20 lg:grid-cols-8 p-6 gap-6">
        {data.map((item, index) => (
          <Card key={index} data={data[index]} date={date} lang={lang} />
        ))}
        <List
          data={filteredData}
          type={"donations"}
          onFilter={setFilteredData}
          lang={lang}
        />
      </div>
      {footer && <Footer lang={lang} />}
    </div>
  );
};

export default Home;

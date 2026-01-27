import { useState, useEffect } from "react";
import fetchData from "../services/functions/fetchData";
import useDataStore from "../services/store/dataStore";

const useData = (year, month) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { setDataStore } = useDataStore();

  useEffect(() => {
    const useFetchData = async () => {
      setLoading(true);
      const response = await fetchData(year, month);

      if (!response.success) {
        setError(response.error);
        setLoading(false);
        return;
      }
      setData(response.data);
      setDataStore(response.data);
      setLoading(false);
    };

    useFetchData();
  }, []);

  return { data, error, loading };
};

export default useData;

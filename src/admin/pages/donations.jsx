import React from "react";
import useAdminStore from "../services/store/adminStore";
import Donations from "../components/donationsMain";

const donations = () => {
  const { donations } = useAdminStore();

  return (
    <div>
      <Donations donations={donations} />
    </div>
  );
};

export default donations;

import React from "react";
import useAdminStore from "../services/store/adminStore";
import DonorList from "../components/donorList";

const Donors = () => {
  const { donors } = useAdminStore();

  return (
    <div>
      
      <DonorList donors={donors}/>
    </div>
  );
};

export default Donors;

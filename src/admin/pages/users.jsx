import React from "react";
import useAdminStore from "../services/store/adminStore";
import User from "../components/usersMain";

const users = () => {
  const { users } = useAdminStore();

  return (
    <div>
      <User users={users} />
    </div>
  );
};

export default users;

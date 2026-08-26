"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    CreateNewUser();
  }, []);

  async function CreateNewUser() {
    try {
      const response = await axios.post("/api/users");
      console.log(response.data);
      setUserDetail(response);
    } catch (error) {
      console.error("Failed to create/get user:", error);
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

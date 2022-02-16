import axios from "axios";
import { useEffect, useState } from "react";
import AdminGrid from "../../components/AdminGrid/AdminGrid";
import { useAuthorization } from "../../hooks/useAuthorization";
import "./AdminPage.css";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminPage() {
  const [usersData, setUsersData] = useState();
  const { userSession } = useAuthorization();

  useEffect(() => {
    async function getAllUser() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const response = await axios.get(`${REACT_APP_BACKEND_API}users`, config);
      setUsersData(response.data.data);
    }
    getAllUser();
  }, [userSession]);

  console.log(usersData);

  return <AdminGrid usersData={usersData} />;
}

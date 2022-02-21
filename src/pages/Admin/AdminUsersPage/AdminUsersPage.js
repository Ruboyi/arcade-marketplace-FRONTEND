import axios from "axios";
import { useEffect, useState } from "react";
import AdminGrid from "../../../components/AdminGrid/AdminGrid";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import { useAuthorization } from "../../../hooks/useAuthorization";
import "./AdminUsersPage.css";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminUsersPage() {
  const [usersData, setUsersData] = useState();
  const { userSession } = useAuthorization();

  async function getAllUser() {
    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`,
      },
    };
    const response = await axios.get(`${REACT_APP_BACKEND_API}users`, config);
    setUsersData(response.data.data);
  }

  useEffect(() => {
    getAllUser();
  }, [userSession]);

  console.log(usersData);

  return (
    <div>
      <MenuAdmin />
      <div className="Admin-grid-container">
        <AdminGrid usersData={usersData} getAllUser={getAllUser} />
      </div>
    </div>
  );
}

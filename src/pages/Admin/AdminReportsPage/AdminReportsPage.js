import axios from "axios";
import { useEffect, useState } from "react";
import AdminReportsGrid from "../../../components/AdminReportsGrid/AdminReportsGrid";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import { useAuthorization } from "../../../hooks/useAuthorization";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminReportsPage() {
  const [reportsData, setReportsData] = useState();
  const { userSession } = useAuthorization();

  async function getAllReports() {
    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`,
      },
    };

    const response = await axios.get(`${REACT_APP_BACKEND_API}reports`, config);
    setReportsData(response.data.data);
  }

  useEffect(() => {
    getAllReports();
  }, [userSession]);

  console.log(reportsData);
  return (
    <div>
      <MenuAdmin />
      <div className="Admin-grid-container">
        <AdminReportsGrid
          reportsData={reportsData}
          getAllReports={getAllReports}
        />
      </div>
    </div>
  );
}

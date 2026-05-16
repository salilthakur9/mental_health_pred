import { Navigate } from "react-router-dom";

import { useAuth }
from "../context/AuthContext";


function ProtectedRoute({ children }) {

  const { user, loading } = useAuth();


  if (loading) {

    return (

      <div className="text-white min-h-screen flex items-center justify-center bg-black">

        Loading...

      </div>

    );

  }


  if (!user) {

    return <Navigate to="/login" />;

  }


  return children;

}

export default ProtectedRoute;
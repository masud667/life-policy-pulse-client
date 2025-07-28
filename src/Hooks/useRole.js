
import { useEffect, useState } from "react";
import AuthSecureAxios from "./AuthSecureAxios";

const useRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthSecureAxios.get("/dashboard")
      .then((res) => setRole(res.data.role))
      .catch(() => setRole(null))
      .finally(() => setLoading(false));
  }, []);

  return { role, loading };
};

export default useRole;

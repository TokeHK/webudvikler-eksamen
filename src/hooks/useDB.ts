import { useEffect, useState, useCallback } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function useDB<T = any>(
  GET_Endpoint: string,
  CRUD_Endpoint?: string, 
  method: Method = "GET"
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const API_GET = `http://localhost:3001/${GET_Endpoint}`;
  const API_WRITE = `http://localhost:3001/${CRUD_Endpoint ?? GET_Endpoint}`;/* CRUD har fallback til GET */

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_GET, { method: "GET" });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const result = (await response.json()) as T;
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    } 
  }, [API_GET]);

  useEffect(() => {
    if (method === "GET") fetchData();
  }, [fetchData, method]);

  /* ændring af data i en variabel er en mutation, her er variablen data til useDB */
  const mutate = async <B = any>(
    path: string = "",
    body?: B,
    method: Method = "POST" /* POST som standard */
  ) => {
    try {
      const response = await fetch(`${API_WRITE}${path}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      
      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      /* GET nye data efter mutation/CRUD */
      await fetchData();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    post: <B = any>(body: B) => mutate("", body, "POST"),
    put: <B = any>(id: string | undefined, body: B) => mutate(id && id.length > 0 ? `/${id}` : "", body, "PUT"),
    patch: <B = any>(id: string | undefined, body: B) => mutate(id && id.length > 0 ? `/${id}` : "", body, "PATCH"),
    del: (id: string) => mutate(id && id.length > 0 ? `/${id}` : "", undefined, "DELETE"),
  };
}

export default useDB;
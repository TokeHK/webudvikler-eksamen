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

  const API_GET = `http://localhost:5029/${GET_Endpoint}`;
  const API_WRITE = `http://localhost:5029/${CRUD_Endpoint ?? GET_Endpoint}`;/* CRUD har fallback til GET */

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

/*
B rug af useDB i webudvikler/grenaa/proeve_eksamen

interface Hero {
  _id?: string;
  show: boolean;
  title1: string;
  title2: string;
  content: string;
  link: string;
}

  frontend GET
  const { data, loading, error } = useGetDB<Hero[]>("hero");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  ---

  "hero" GET_Endpoint, "hero/admin" CRUD_Endpoint
  const { data, loading, error, post, put, patch, del } = useDB<Hero[]>("hero", "hero/admin");
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [newHero, setNewHero] = useState<Hero>({
    show: true,
    title1: "",
    title2: "",
    content: "",
    link: "",
  });

  useEffect(() => {
    if (data) setHeroes(data);
  }, [data]);//hvis der er data og når data ændrer sig, setHeroes(data)

  // POST bruger {post} som standard fra useDB
  const addHero = async () => {
    await post(newHero);
    setNewHero({ show: true, title1: "", title2: "", content: "", link: "" });
  };

  // PUT
  const updateHero = async (hero: Hero) => {
    if (hero._id) await put(hero._id, hero);
  };

  // PATCH
  const toggleShow = async (hero: Hero) => {
    if (hero._id) await patch(hero._id, { show: !hero.show });
  };

  // DELETE
  const deleteHero = async (hero: Hero) => {
    if (hero._id) await del(hero._id);
  };

  const handleChange = (id: string, field: keyof Hero, value: any) => {
    setHeroes((prev) =>
      prev.map((hero) => (hero._id === id ? { ...hero, [field]: value } : hero))
    );
  };

*/
const BASE_URL = "http://localhost:3001/auth";

async function request(url: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}

export const login = (email: string, password: string) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }
);

export const register = (email: string, password: string) =>
  request("/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }
);

export const logout = () =>
  request("/logout", {
    method: "POST",
  }
);
// authentication.js

export const login = async (email, password) => {
    const response = await fetch("http://localhost:3001/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
    } else {
      throw new Error(data.message);
    }
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token != null;
  };
  
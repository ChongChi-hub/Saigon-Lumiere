import axios from "./api";
import type { User } from "../types/user";

export const authService = {
  // Login by checking if username/email and password match.
  // json-server allows filtering by multiple paths e.g /users?email=test&password=123
  login: async (email: string, password: string):Promise<User[]> => {
    // Note: in a real app this is a POST request, but for json-server we do a GET to filter.
    const response = await axios.get<User[]>(`/users?email=${email}&password=${password}`);
    return response.data;
  },

  // Register by posting to /users
  register: async (userPayload: Omit<User, 'id'> & { password?: string }) => {
    // Check if email already exists first
    const existing = await axios.get<User[]>(`/users?email=${userPayload.email}`);
    if (existing.data.length > 0) {
        throw new Error("Email_Exists");
    }

    const response = await axios.post<User>("/users", {
        ...userPayload,
        role: "customer", // Enforce role
        avatar: "https://res.cloudinary.com/dj6kb7ej4/image/upload/v1773281288/avatar-default_q3ntch.svg",
        // json-server auto-generates ID if we don't provide it, 
        // but we can pass a random one to mimic the current db.json behavior.
        id: `user_${Date.now()}` 
    });
    return response.data;
  }
};

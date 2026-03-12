export type Role = 'manager' | 'chef' | 'waiter' | 'admin' | 'customer';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  email?: string;
  phone?: string;
  avatar?: string;
}

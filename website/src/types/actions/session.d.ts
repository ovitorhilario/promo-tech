export type Session = {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER'; // admin or user
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
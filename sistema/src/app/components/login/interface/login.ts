export type Roles = 'SUSCRIPTOR' | 'ADMIN';
export interface Login{
    Username:string;
    Password:string;
    Token:string;
}

export interface UserResponse extends Login {
    message: string;
    token: string;
    userId: number;
    role: Roles;
  }
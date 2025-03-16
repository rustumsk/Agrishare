//user object
type Role = "ADMIN" | "USER";

export interface User{
    user_name: string,
    password: string,
    user_email: string,
    bio?: string | null,
    contact_no: string|null,
    image_url?: string | null,
    role: Role
}
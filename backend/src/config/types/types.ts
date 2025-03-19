//user object
type Role = "ADMIN" | "USER";
type GoogleType = "Existing" | "New"
import { Profile } from 'passport';

export interface User{
    user_name: string,
    password: string,
    user_email: string,
    bio?: string | null,
    google_id?:string | null,
    contact_no: string|null,
    image_url?: string | null,
    role: Role
}

export interface Blog{
  user_id: number,
  blog_content: JSON,
}

export interface GoogleProfile extends Profile {
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  };
}

export interface GoogleUser{
    type: GoogleType,
    token?: string,
    additionalInfo?:{
        email: string,
        google_id: string
    };
};

export interface Post {
  user_id: number;
  post_title: string;
  post_description: string;
  post_images?: string[]; 
  post_videos?: string[];
}
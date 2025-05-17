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

export interface Pool{
  user_id: number,
  post_title: string,
  post_description: string,
  post_videos?: object | null,
  post_photos?: object | null
}

export interface Blog{
  user_id: number,
  blog_title: string,
  blog_slug: string,
  blog_description: string,
  blog_photo: string,
  blog_content: object,
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
export interface Message {
  roomId: string;
  senderId: string;
  content: string;
  timestamp?: string; // optional, can be added server-side
}
export interface Post {
  user_id: number;
  post_description: string;
}

export interface PostMedia{
  url: string,
  public_id: string,
  resource_type: string
}
export interface PostMediaResponse{
  url: string,
  public_id: string,
  resource_type: string
}     
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  like: (data: { post_id: number; like_count: number; user_id: number }) => void;
  unlike: (data: { post_id: number; like_count: number; user_id: number }) => void;
  comment: (data: { post_id: number; comments: any;}) => void;
  newMessage: (msg: Message) => void;
  notification: (msg: any) => void;
  blogLike: (data: { check: boolean, blog_count: any, user_id: number, blog_id: number}) => void;
  blogUnlike: (data: { check: boolean, blog_count: any, user_id: number, blog_id: number}) => void;
  blogComment: (data: { user_id:number, blog_id: number; comments: any;}) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  joinRoom: (roomId: any) => void;
  sendMessage: (msg: Message) => void;
  notify: (data: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
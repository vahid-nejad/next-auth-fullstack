import Test from "../user-post/Test";
import User from "./page";


export default function UserLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <section><User/>{children}</section>
    );
  }





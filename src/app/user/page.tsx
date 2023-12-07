
import { getSession } from "next-auth/react";

const User = ({ session }:any) => {

  if (session?.user.name === "sakura") {
    return <div>Access Denied</div>;
  }

  return <div>Only User</div>;
};

export async function getServerSideProps(context:any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default User;






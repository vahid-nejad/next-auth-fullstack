
import React from "react";
import Test from "./Test";

const UserPostPage = () => {
  return <div>Only Authenticated user should access to this page
    <Test/>
  </div>;
};

export default UserPostPage;

'use client'

import { useSession } from "next-auth/react";
import React from "react";

const Test = () => {
  const { data: session } = useSession();
  console.log(session?.user);
  return <div>Test</div>;
};

export default Test;
import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600" />
    </div>
  );
};

export default Loader;

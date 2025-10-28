import React from "react";

const navbar = () => {
  return (
    <div className="bg-slate-700 rounded-2xl flex justify-between  text-white my-2 p-4">
      <div className="logo">
        <span className="text-xl p-4 font-bold">myTask</span>
      </div>
      <ul className="mx-100 flex gap-10  text-xl">
        <li className="cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold">Your Task</li>
      </ul>
    </div>
  );
};

export default navbar;

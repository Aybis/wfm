/** @format */

import Heading from "components/atoms/Heading";
import React from "react";
import MobileMenu from "section/MobileMenu";

export default function Dashboard() {
  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <Heading heading="Dashboard" />
      <MobileMenu />
    </div>
  );
}

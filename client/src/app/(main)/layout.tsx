import Footer from "@/components/public/footer";
import Navbar from "@/components/public/navbar";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;

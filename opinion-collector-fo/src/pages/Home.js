import React from "react";
import HeroSection from "../common/components/HeroSection/HeroSection";
import HeroCard from "../common/components/HeroCard/HeroCard";
import PopularProducts from "../common/components/PopularProducts/PopularProducts";

function Home() {
  return (
    <>
      <HeroSection />
      <HeroCard />
      <PopularProducts />
    </>
  );
}

export default Home;

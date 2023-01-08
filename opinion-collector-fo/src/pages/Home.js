import React from "react";
import HeroSection from "../common/components/HeroSection/HeroSection";
import HeroCard from "../common/components/HeroCard/HeroCard";
import PopularProducts from "../common/components/PopularProducts/PopularProducts";
import Footer from "../common/layouts/components/Footer/Footer";
import {ProductDetails} from "./ProductDetails";

function Home() {
  return (
    <>
      <HeroSection />
      <HeroCard />
      <PopularProducts />
      <Footer />
    </>
  );
}

export default Home;

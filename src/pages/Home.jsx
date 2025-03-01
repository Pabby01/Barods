/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PropertyList from "../components/PropertyList";
import HotDeals from "../components/HotDeals";
import ExploreCities from "../components/CityList";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <PropertyList />
      <HotDeals />
      <ExploreCities />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;

/* eslint-disable no-unused-vars */
import React from "react";
import HeroSection from "../components/HeroSection";
import PropertyList from "../components/PropertyList";
import HotDeals from "../components/HotDeals";
import ExploreCities from "../components/CityList";
import Testimonials from "../components/Testimonials";
import AdvertiseWithUs from "../components/AdvertiseWithus";
import PartnersSection from "../components/partnerSection";
import Agents from "../components/Agents";

const Home = () => {
  return (
    <div>
      
      <HeroSection />
      <PropertyList />
      <HotDeals />
      <ExploreCities />
      <Agents />
      <PartnersSection />
      <Testimonials />
      <AdvertiseWithUs />
      
    </div>
  );
};

export default Home;

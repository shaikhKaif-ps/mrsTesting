import React, { useEffect } from "react";
import Header from "../components/global/header";
import HomeAbout from "../components/sections/Home/homeAbout";
// import Homeadvantage from "../components/sections/Home/homeAdvantage"
import HomeSpotlight from "../components/sections/Home/homeSpotlight";
import Homesolution from "../components/sections/Home/homeSolution";
import HomeSolutionSticky from "../components/sections/Home/homeSolutionSticky";
import HomeSector from "../components/sections/Home/homeSector";
import HomeClients from "../components/sections/Home/homeClients";
import HomeSuccStory from "../components/sections/Home/homeSuccStory";
import HomeTestimonial from "../components/sections/Home/homeTestimonial";
import HomeBlog from "../components/sections/Home/homeBlog";
import Footer from "../components/global/footer";
import Advantage from "../components/sections/Home/homeAdvantage";
import Header2 from "../components/global/header2";
import HomeSolution2 from "../components/sections/Home/homeSolution2";
import FormSection from "../components/sections/Contact/formSection";

// import { Helmet } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
// import helmetPkg from "react-helmet-async";
// const { Helmet } = helmetPkg;

export default function Homepage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1; // Set opacity to 1 when in viewport
          animateText(entry.target);
          observer.unobserve(entry.target); // No need to disconnect the observer
        }
      });
    }

    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines",
      });

      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2,
      });
    }

    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5,
      });
      observer.observe(element);
    });

    AOS.init();
  });

  return (
    <>
      <div className="pg-body viewport">
        <Helmet>
          <title>MRS Supply Chain & Warehousing Solutions in Mundra</title>
          <meta
            name="description"
            content="MRS Supply Chain delivers reliable 3PL, warehousing, and logistics solutions in Mundra, ensuring seamless end-to-end supply chain management for global operations."
          />
          <meta
            name="keywords"
            content="Supply Chain Solutions, Logistics Services, Warehousing Solutions, Customs Brokerage, Last-Mile Delivery, Road and Rail Transport, Best Supply Chain Company in India"
          />
        </Helmet>

        <div id="scroll-container" className="scroll-container">
          <Header2 />
          <HomeSpotlight />
          <HomeAbout />
          <Advantage />
          <HomeSolution2 />
          <HomeSector />
          <HomeClients />
          <HomeBlog />
          <FormSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

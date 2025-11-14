import React, { useEffect } from "react";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer";
import SectorSpotlight from "../../components/sections/Sectors/RenewablEenergy/1.Spotlight";
import SectorAbout from "../../components/sections/Sectors/RenewablEenergy/2.About";
import Cta from "../../components/sections/About/aboutCTA";
import SectorSolutions from "../../components/sections/Sectors/RenewablEenergy/3.Solutions";
import KeySector from "../../components/sections/Sectors/RenewablEenergy/4.KeySector";
import InnerCTA from "../../components/sections/Sectors/Arts/7.innerCTA";
import Header2 from "../../components/global/header2";
import { Helmet } from "react-helmet-async";

import FormSection from "../../components/sections/Contact/formSection";

export default function RenewableEnergyPage() {
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
      <Helmet>
        <title>Mundra Renewable Energy & Project Logistics Solutions</title>
        <meta
          name="description"
          content="MRS provides renewable energy, infrastructure, and project logistics, including warehousing, transport, and supply chain solutions across Mundra."
        />
        <meta
          name="keywords"
          content="Renewable Energy Logistics, Infrastructure Supply Chain, Logistics for Renewable Projects, Efficient Infrastructure Transport, Supply Chain for Energy Projects"
        />
      </Helmet>

      <Header2 />
      <SectorSpotlight />
      <SectorAbout />
      <SectorSolutions />
      <KeySector />
      <InnerCTA />
      <FormSection />
      <Footer />
    </>
  );
}

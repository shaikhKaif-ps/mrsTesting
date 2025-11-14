import React, { useEffect } from "react";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer";
import ServicesSpotlight from "../../components/sections/Services/Multiuser-Warehousing/1.ServicesSpotlight";
import MultiUserAbout from "../../components/sections/Services/Multiuser-Warehousing/2.multiUserAbout";
import MultiUserBuilt from "../../components/sections/Services/Multiuser-Warehousing/3.Built-to-Suit";
import CustomBonded from "../../components/sections/Services/Multiuser-Warehousing/5.CustomsBonded";
import InPlant from "../../components/sections/Services/Multiuser-Warehousing/6.inPlant";
import MultiWarehousing from "../../components/sections/Services/Multiuser-Warehousing/4.MultiuserWarehousing";
import InnerCTA from "../../components/sections/Services/Multiuser-Warehousing/7.innerCTA";
import HomeSuccStory from "../../components/sections/Home/homeSuccStory";
import Header2 from "../../components/global/header2";

import FormSection from "../../components/sections/Contact/formSection";

import { Helmet } from "react-helmet-async";

export default function multiuserWarehousing() {
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
      <div>
        <Helmet>
          <title>
            Multi-User Warehousing & Warehouse Solutions Services in Mundra
          </title>
          <meta
            name="description"
            content="MRS offers multi-user warehousing, warehouse solutions, storage, and inventory management services across Mundra for seamless warehouse operations."
          />
          <meta
            name="keywords"
            content="Multiuser Warehousing Solutions, Compliant Warehousing, Grade A Warehousing, Best Warehouse for FMCG, Warehousing for Pharma and Medical Devices"
          />
        </Helmet>

        <Header2 />
        <ServicesSpotlight />
        <MultiUserAbout />
        <MultiUserBuilt />
        <MultiWarehousing />
        <CustomBonded />
        <InPlant />
        {/* <HomeSuccStory /> */}
        <InnerCTA />
        <FormSection />
        <Footer />
      </div>
    </>
  );
}

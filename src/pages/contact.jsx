import React, { useEffect } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/footer";
import FormSection from "../components/sections/Contact/formSection";
import ContactSpotlight from "../components/sections/Contact/contactSpotlight";
import AddressSection from "../components/sections/Contact/addressSection";
import MapSection from "../components/sections/Contact/map";
import Header2 from "../components/global/header2";

import { Helmet } from "react-helmet-async";

export default function Contactpage() {
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
        <title>
          Contact Logistics & Supply Chain Experts | Warehousing & Transport
          Gujarat
        </title>
        <meta
          name="description"
          content="Contact MRS for logistics, supply chain, warehousing, transport services across Gujarat. Get in touch with experts for efficient solutions."
        />
      </Helmet>

      <Header2 />
      <ContactSpotlight />
      <AddressSection />
      <FormSection />
      {/* < MapSection />             */}
      <Footer />
    </>
  );
}

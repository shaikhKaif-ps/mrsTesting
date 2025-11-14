import React, { useEffect } from "react";
import Header2 from "../../components/global/header2";
import ImportManageServicesSpotlight from "../../components/sections/Services/Import-Mangement/ImportManageServicesSpotlight";
import ImportManagemultiUserAbout from "../../components/sections/Services/Import-Mangement/ImportManagemultiUserAbout";
import ImportManageBuiltoSuit from "../../components/sections/Services/Import-Mangement/ImportManageBuilt-to-Suit";
import ImportManageMultiuserWarehousing from "../../components/sections/Services/Import-Mangement/ImportManageMultiuserWarehousing";
import ImportManageCustomsBonded from "../../components/sections/Services/Import-Mangement/ImportManageCustomsBonded";
import ImportManageinPlant from "../../components/sections/Services/Import-Mangement/ImportManageinPlant";
import ImportManageinnerCTA from "../../components/sections/Services/Import-Mangement/ImportManageinnerCTA";
import Footer from "../../components/global/footer";
import FormSection from "../../components/sections/Contact/formSection";
import { Helmet } from "react-helmet-async";

const ImportanMagement = () => {
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
        <title>Import Management & Customs Clearance Services in Gujarat</title>
        <meta
          name="description"
          content="MRS offers import management, customs clearance, freight, warehousing, and logistics services across Gujarat for efficient supply chain operations."
        />
        <meta
          name="keywords"
          content="Customs Brokerage Services, Regulatory Compliance, Best CHA in Gujarat, Customs Clearance Solutions, Import and Export Compliance"
        />
      </Helmet>
      <Header2 />
      <ImportManageServicesSpotlight />
      <ImportManagemultiUserAbout />
      <ImportManageBuiltoSuit />
      <ImportManageMultiuserWarehousing />
      <ImportManageCustomsBonded />
      <ImportManageinPlant />
      <ImportManageinnerCTA />
      <FormSection />
      <Footer />
    </>
  );
};

export default ImportanMagement;

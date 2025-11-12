import React, { useEffect } from "react";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer"
import CustomsServicesSpotlight from "../../components/sections/Services/Pioneering-Warehousing/1.ServicesSpotlight"
import CustomsMultiUserAbout from "../../components/sections/Services/Pioneering-Warehousing/2.multiUserAbout"
import CustomsMultiUserBuilt from "../../components/sections/Services/Pioneering-Warehousing/3.Built-to-Suit"
import CustomBonded from "../../components/sections/Services/Pioneering-Warehousing/4.CustomsBonded"
import CustomsMultiWarehousing from "../../components/sections/Services/Pioneering-Warehousing/5.MultiuserWarehousing"
import Cta from "../../components/sections/About/aboutCTA"
import InnerCTA from "../../components/sections/Services/Pioneering-Warehousing/7.innerCTA"
import Header2 from '../../components/global/header2'
import {Helmet} from "react-helmet";

import FormSection from '../../components/sections/Contact/formSection'

export default function PioneeringWarehousing() {

    useEffect (() => {

        function handleAnimation(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = 1; // Set opacity to 1 when in viewport
              animateText(entry.target);
              observer.unobserve(entry.target); // No need to disconnect the observer
            }
          });
        }
    
        function animateText(target) {
          let split = new SplitType(target, {
              split: 'lines'
          });
      
          let tl = gsap.timeline();
          tl.from(split.lines, {
              opacity: 0,
              y: 50,
              duration: 0.6,
              ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              stagger: 0.2
          });
        }
    
        document.querySelectorAll('.js-split-text').forEach(element => {
          let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
          observer.observe(element);
        });       
        
        AOS.init();

        
 })


  return (
    <>

          <Helmet>
            <title>Duty-Free Warehousing Solutions in Gujarat | FTWZ & SEZ Storage in India</title>
            <meta name="description" content="Discover MRS Supply Chain's duty-free warehousing in Gujarat. FTWZ and SEZ solutions for customs-free storage." />
            <meta name="keywords" content="Duty-Free Warehousing, FTWZ Solutions, SEZ Warehousing, Best Duty-Free Warehouse in Gujarat, Customs-Free Storage" />
          </Helmet>
      
        <Header2 />
        <CustomsServicesSpotlight /> 
        <CustomsMultiUserAbout />
        <CustomsMultiUserBuilt />  
        <CustomBonded />    
        <CustomsMultiWarehousing />       
        <InnerCTA />
        <FormSection />
        <Footer />
      
    </>
  )
}

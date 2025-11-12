import React, { useEffect } from "react";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer"
import Spotlight from "../../components/sections/Services/Customs-Brokerage-Compliance/1.Spotlight"
import About from "../../components/sections/Services/Customs-Brokerage-Compliance/2.About"
import Cta from "../../components/sections/About/aboutCTA"
import CustomsBrokServices from "../../components/sections/Services/Customs-Brokerage-Compliance/3.CustomsBrokServices"
import ForeignTrade from "../../components/sections/Services/Customs-Brokerage-Compliance/4.ForeignTrade"
import Comprehensive from "../../components/sections/Services/Customs-Brokerage-Compliance/5.Comprehensive"
import Advantages from "../../components/sections/Services/Customs-Brokerage-Compliance/6.Advantages"
import HomeSuccStory from "../../components/sections/Home/homeSuccStory"
import InnerCTA from "../../components/sections/Services/Customs-Brokerage-Compliance/7.innerCTA"
import Header2 from '../../components/global/header2'

import {Helmet} from "react-helmet";

import FormSection from '../../components/sections/Contact/formSection'

export default function CustomsBrokerageCompliance() {

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
          <title>Customs Brokerage Services & Regulatory Compliance in Gujarat</title>
          <meta name="description" content="Partner with the best CHA in Gujarat for seamless customs clearance & import-export compliance." />
          <meta name="keywords" content="Customs Brokerage Services, Regulatory Compliance, Best CHA in Gujarat, Customs Clearance Solutions, Import and Export Compliance" />
        </Helmet>  

        <Header2 />
        <Spotlight />
        <About />
        <CustomsBrokServices />
        <ForeignTrade />
        <Comprehensive />
        <Advantages />
        <InnerCTA />    
        <FormSection />
        <Footer />      
    </>
  )
}

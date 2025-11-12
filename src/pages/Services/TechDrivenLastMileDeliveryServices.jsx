import React, { useEffect } from "react";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer"
import BuiltServicesSpotlight from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/1.ServicesSpotlight"
import BuiltmultiUserAbout from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/2.multiUserAbout"
import BuiltMultiUserBuilt from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/3.Built-to-Suit"
import BuiltCustomBonded from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/4.CustomsBonded"
import BuiltMultiWarehousing from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/5.MultiuserWarehousing"
import BenefitTechService from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/6.BeneftTechService"
import InnerCTA from "../../components/sections/Services/Tech-Driven-Last-Mile-Delivery-Services/7.innerCTA"
import Cta from "../../components/sections/About/aboutCTA"
import $ from "jquery";
import Header2 from '../../components/global/header2'
import {Helmet} from "react-helmet";

import FormSection from '../../components/sections/Contact/formSection'

export default function TechDrivenService() {

    useEffect (() => {

      // Text animtion code ---------------------------------------------------------------

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


        // On Scroll Add class ---------------------------------------------------------------       
           
        
 })


  return (
    <>
        <Helmet>
            <title>Tech-Driven Last-Mile Delivery Services in India</title>
            <meta name="description" content="Experience fast e-commerce delivery services powered by cutting-edge logistics technology." />
            <meta name="keywords" content="Last-Mile Delivery Services, Tech-Driven Logistics, Efficient Last-Mile Solutions, Fast Delivery Services, E-commerce Delivery" />
        </Helmet>  

        <Header2 />
        <BuiltServicesSpotlight />
        <BuiltmultiUserAbout />
        <BuiltMultiUserBuilt />
        <BuiltCustomBonded />
        <BenefitTechService />
        <BuiltMultiWarehousing />        
        <InnerCTA />    
        <FormSection />
        <Footer />
      
    </>
  )
}

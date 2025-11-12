import React, { useEffect } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/footer";
import CareerSpotlight from "../components/sections/Careers/careerSpotlight"
import AboutCareer from "../components/sections/Careers/aboutCareer"
import OurCulture from "../components/sections/Careers/ourCulture"
import ApplyNow from "../components/sections/Careers/applyNow"
import Header2 from '../components/global/header2'
import {Helmet} from "react-helmet";

import FormSection from '../components/sections/Contact/formSection'

export default function Contactpage() {

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
              <title>Careers - MRS</title>
              <meta name="description" content="Explore Opportunities: Embark on a Rewarding Career with MRS Group" />
      </Helmet>

      <Header2 /> 
      <CareerSpotlight />
      <AboutCareer />  
      <OurCulture /> 
      <ApplyNow />
      <FormSection />
      <Footer />    
    </>
  )
}

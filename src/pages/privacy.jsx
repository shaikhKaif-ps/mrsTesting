import React, { useEffect } from "react";
import Header2 from '../components/global/header2'
import PrivacyHdr from '../components/sections/Privacy/1Hdr'
import PrivacyContent from '../components/sections/Privacy/2Content'
import Footer from "../components/global/footer"
import FormSection from '../components/sections/Contact/formSection'

export default function Privacypage() {


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
            <Header2 />
            <PrivacyHdr />
            <PrivacyContent />
            <FormSection />
            <Footer />
        </>
            
        
    )
}

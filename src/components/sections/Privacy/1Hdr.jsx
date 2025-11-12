import React, { useEffect } from "react";
import '../../../assets/css/about.css' 
import '../../../assets/css/blog.css' 
import '../../../assets/css/Services/MultiuserWarehousing.css'

const PrivacyHdr = () => {

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

  // const altText = featureImage.split('/').pop().replace(/\.[^/.]+$/, '');


  return (
    <>
      <div className="section inner-spotlight-sec section-padd-LR overflow blogarchive-sec" >
              <div className="main-container width-1250 flex">
                  <div className="inner-spot-clm-1">
                      <h1 className="js-split-text white">Privacy Policy</h1>
                      <h2 className="sldr-sub-ttl blg-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400"></h2> 
                      <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>Privacy Policy</a>
                    </div>
                  </div>                
              </div>
      </div>

    </>
  );
};

export default PrivacyHdr;

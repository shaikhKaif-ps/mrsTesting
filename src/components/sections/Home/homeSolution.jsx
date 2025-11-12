import React, { useEffect } from "react";
import '../../../assets/css/home.css';
import '../../../assets/img/home_img/Home_about.png'

export default function HomeSolution() {
  useEffect(() => {

  //   //text revelAnimation inside page
  //   var isInViewport = function(elem) {
  //     var distance = elem.getBoundingClientRect();
  //     return (
  //     distance.top >= 0 &&
  //     distance.left >= 0 &&
  //     distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     distance.right <= (window.innerWidth || document.documentElement.clientWidth)
  //     );
  // };

  // var findMe = document.querySelectorAll('.animte');
  
  // window.addEventListener('scroll', function(event) {
  // // add event on scroll
  // findMe.forEach(element => {
  //     //for each .thisisatest
  //     if (isInViewport(element)) {
  //         //if in Viewport
  //         element.classList.add("animt");
  //     }
  // });
  // }, false);

 
  // AOS.init();


})

  return (
    <>
      <div className="section solution-sec section-padd-LR">
        <div className="main-container width-1200">
          <div className="soltn-inner-container" data-aos="fade-up"  data-aos-duration="1500" data-aos-once="true">
            <div className="clm-2 soltn-clm1">              
                <h2 className="white js-split-text">Solutions <br />We Offer </h2>                             
            </div>
            <div className="clm-2 soltn-clm2">
              <div className="ovrflw-hdn">
                <p className="js-split-text">Logistics solutions tailored to your business needs for seamless supply chain excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
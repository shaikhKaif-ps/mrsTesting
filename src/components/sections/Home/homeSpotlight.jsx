import React from "react";
import supplyChainImage from '../../../assets/img/home_img/Slider/Supply_Chain.png';
import Slider2 from '../../../assets/img/home_img/Slider/WarehouseManagement.jpg';
import Slider3 from '../../../assets/img/home_img/Slider/CustomsCompliance.png';
import Slider3_mob from '../../../assets/img/home_img/Slider/CustomsCompliance.png';
import Slider4 from '../../../assets/img/home_img/Slider/MultimodalLogistics.jpg';
import Slider5 from '../../../assets/img/home_img/Slider/ForeignTrade.jpg';
import Slider6 from '../../../assets/img/home_img/Slider/custom_brkg.webp';
import Slider7 from '../../../assets/img/home_img/Slider/Import Management Spotlight.png';
import '../../../assets/css/slider-sec.css';
import { useEffect, useState } from 'react';

import QuoteForm from "../../global/popupForm/QuoteForm";

export default function HomeSpotlight() {

    useEffect(() => {

        var swiper = new Swiper(".thumbSlider", {
            spaceBetween: 10,
            slidesPerView: 1,
            freeMode: true,
            watchSlidesProgress: true,
            allowTouchMove: false,
            speed: 900,
        });
        var swiper2 = new Swiper(".mainSlider", {
            speed: 1100,
            spaceBetween: 10,
            allowTouchMove: false,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction"
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
            swiper: swiper,
            },
            effect: "fade",
        });



    })

    // ------------------
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = (e) => {
        e.preventDefault(); // Ensure this doesn't refresh the page on button click
        setIsPopupOpen(true);
      };
    const closePopup = () => setIsPopupOpen(false);
// ------------------

return (
    <>
        <div className="section slider-sec section-padd-LR " data-aos="fade-in" data-aos-duration="500" data-aos-once="true">
            <div className="main-container width-1250 flex">            
                    <div className="swiper thumbSlider">
                        <div className="swiper-wrapper">

                        <div className="swiper-slide">                                           
                                {/* <h1 className="white" data-aos="fade-up" data-aos-duration="500" data-aos-once="true">Make Your Supply Chain A Competitive Advantage</h1>                         */}

                                <h1 className="js-split-text white width-100">Import <br /> Management</h1>
                                <h2 className="sldr-sub-ttl hm-sldr-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400">Efficient, Reliable, and Compliant Import Management Services Across Industries</h2>                                                                                                      
                                <p className="white sldr-para" data-aos="fade-up" data-aos-duration="900" data-aos-once="true" data-aos-delay="500">Streamline Your Imports with India’s Leading Import Management Partner.</p>  
                                <div data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">
                                    <a className="btn white hm-spt-btn" id="btn-styl"   onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                                </div>                                                    
                                                            
                        </div>
                        <div className="swiper-slide">                                           
                                {/* <h1 className="white" data-aos="fade-up" data-aos-duration="500" data-aos-once="true">Make Your Supply Chain A Competitive Advantage</h1>                         */}

                                <h1 className="js-split-text white width-100">Make Your Supply Chain <br />Competitive Advantage</h1>
                                <h2 className="sldr-sub-ttl hm-sldr-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400">Optimize Advantage</h2>                                                                                                      
                                <p className="white sldr-para" data-aos="fade-up" data-aos-duration="900" data-aos-once="true" data-aos-delay="500">Port to Factory logistics and integrated software, built together to drive business results.</p>  
                                <div data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">
                                    <a className="btn white hm-spt-btn" id="btn-styl"   onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                                </div>                                                    
                                                            
                        </div>
                        <div className="swiper-slide">
                            <div className="ovrflw-hdn">
                                <h1 className="white">Simplify Your Warehouse Management</h1>
                            </div>
                            <h2 className="sldr-sub-ttl hm-sldr-sub-ttl">Streamlined Storage</h2>
                            <p className="white sldr-para">Elevate efficiency and precision in inventory management with our cutting-edge warehousing solutions.</p>
                            <a className="btn white hm-spt-btn" id="btn-styl"  onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                        </div>
                        <div className="swiper-slide">
                            <h1 className="white">Enhance Efficiency with Duty-Free Warehousing </h1>
                            <h2 className="sldr-sub-ttl hm-sldr-sub-ttl">Strategic Storage</h2>
                            <p className="white sldr-para">Optimize international logistics with secure, cost-effective duty-free warehousing for greater operational flexibility.</p>
                            <a className="btn white hm-spt-btn" id="btn-styl" onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                        </div>
                        <div className="swiper-slide">
                            <h1 className="white">Optimize with Multimodal Logistics Solutions </h1>
                            <h2 className="sldr-sub-ttl hm-sldr-sub-ttl">Flexible Freight</h2>
                            <p className="white sldr-para">Boost supply chain efficiency with our tailored multimodal logistics, ensuring seamless transportation.</p>
                            <a className="btn white hm-spt-btn" id="btn-styl"  onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                        </div>
                        <div className="swiper-slide">
                            <h1 className="white">Advance with Tech-Driven Last-Mile Delivery </h1>
                            <h2 className="sldr-sub-ttl hm-sldr-sub-ttl">Smart Delivery</h2>
                            <p className="white sldr-para">Elevate your last-mile logistics with our tech-driven solutions for timely, accurate, and visible deliveries.</p>
                            <a className="btn white hm-spt-btn" id="btn-styl"  onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                        </div>
                        <div className="swiper-slide">
                            <h1 className="white">Navigating Global Trade with Expert Customs Brokerage</h1>
                            <h2 className="sldr-sub-ttl hm-sldr-sub-ttl">Seamless and Stress-free</h2>
                            <p className="white sldr-para">We streamline complex processes, making international trade efficient and hassle-free.</p>
                            <a className="btn white hm-spt-btn" id="btn-styl" onClick={openPopup} ><span className="btn_name">Let Connect</span></a>
                        </div>

                        </div>
                    </div>  

                    <div className="swiper mainSlider">
                        <div className="swiper-wrapper">
                        <div className="swiper-slide">
                                <img src={Slider7} alt="supplyChainImage" />
                            </div>
                            <div className="swiper-slide">
                                <img src={supplyChainImage} alt="supplyChainImage" />
                            </div>
                            <div className="swiper-slide">
                                <img src={Slider2} alt="supplyChainImage" />
                            </div>
                            <div className="swiper-slide">
                                <img src={Slider3} alt="supplyChainImage" className="desk"/>
                                <img src={Slider3_mob} alt="supplyChainImage" className="mob slider3-img"/>
                            </div>
                            <div className="swiper-slide">
                                <img src={Slider4} alt="supplyChainImage" />
                            </div>
                            <div className="swiper-slide">
                                <img src={Slider5} alt="supplyChainImage" />
                            </div>
                            <div className="swiper-slide">
                                <img src={Slider6} alt="supplyChainImage" />
                            </div>
                        </div>                        
                    </div> 
                    <div className="pegination-arrow">
                            <div className="swiper-button-next cursor">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M12 20H28" stroke="white" strokeLinecap="round" /><path d="M21 12L29 20L21 28" stroke="white" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" transform="matrix(-1 0 0 1 41 0)" stroke="white"/></g></svg>
                            </div>
                            <div className="swiper-button-prev cursor">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M29 20H13" stroke="white" strokeLinecap="round"/><path d="M20 12L12 20L20 28" stroke="white" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" stroke="white"/></g></svg>                              
                            </div>
                            <div className="swiper-pagination"></div>
                    </div>
            </div>         
        </div>
        <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
    </>
)
}   




  




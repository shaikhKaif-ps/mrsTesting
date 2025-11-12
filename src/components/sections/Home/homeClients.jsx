import React from "react";
import { useEffect } from "react";
import '../../../assets/css/home.css';
import adani_Solar from '../../../assets/img/home_img/logos/adani_Solar.svg'
import amneal from '../../../assets/img/home_img/logos/amneal.svg'
import borosil from '../../../assets/img/home_img/logos/borosil.svg'
import Caterpillar from '../../../assets/img/home_img/logos/Caterpillar.svg'
import MondelezLogo from '../../../assets/img/home_img/logos/Mondelez-Logo.svg'
import shahi from '../../../assets/img/home_img/logos/shahi.svg'
import Sterling_biotech from '../../../assets/img/home_img/logos/Sterling_biotech.svg'
import SwissMilitary from '../../../assets/img/home_img/logos/Swiss-Military.svg'
import Tatva_chintan from '../../../assets/img/home_img/logos/Tatva_chintan.svg'
import zydus from '../../../assets/img/home_img/logos/zydus.svg'
// import Quntaum_Electronics from '../../../assets/img/home_img/logos/Quntaum_Electronics.svg'
import first_Company_in_Kutch from '../../../assets/img/home_img/first_Company_in_Kutch.png'
import CTA_ARROW from '../../../assets/img/home_img/CTA-ARROW.svg'
// import Adani from '../../../assets/img/home_img/logos/adani_Solar.png'



export default function HomeClients () {

    useEffect (() =>  {
        var swiper1 = new Swiper(".client-sldr", {
            slidesPerView: 4.5,
            spaceBetween: 0,
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            speed: 3500,
            breakpoints: {
                320: {
                  slidesPerView: 2.1,
                },
                768: {
                  slidesPerView: 3.1,
                },
                1024: {
                    slidesPerView: 4.5,
                  },
            }
        });

        var swiper2 = new Swiper(".client-sldr2", {
            slidesPerView: 4.1,
            spaceBetween: 0,
            allowTouchMove: false,
            loop: true,            
            autoplay: {
                delay: 0,
                reverseDirection: true,
                disableOnInteraction: false,
            },
            speed: 3500,
              breakpoints: {
                320: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3.1,
                },
                1024: {
                    slidesPerView: 4.5,
                  },
            }
        });

        var swiper3 = new Swiper(".cta-sldr", {
            fadeEffect: { crossFade: true },
            virtualTranslate: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800, 
            slidersPerView: 1,
            effect: "fade",
            pagination: {
                el: ".testml-pegination",
                clickable: true,
            },
            // navigation: {   
            //     nextEl: ".cta-swiper-button-next",
            //     prevEl: ".cta-swiper-button-prev",
            // },          
        });

        
        
    })
    return (
        <>
        <div className="client-sec section-padd-LR">
                <div className="main-container">
                    <div className="ovrflw-hdn">
                        <h2 className="black js-split-text">Our Clients</h2>
                    </div>
                    <p className="client-para black" data-aos="fade-up" data-aos-duration="700" data-aos-once="true" data-aos-delay="">Trusted by industry leaders for customized supply chain excellence worldwide.</p>
                </div> 
                        <div className="swiper client-sldr" data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <img src={adani_Solar} alt="adani_Solar" />                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={amneal} alt="amneal" />                                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={borosil} alt="borosil" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={Caterpillar} alt="Caterpillar" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={MondelezLogo} alt="MondelezLogo" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={shahi} alt="shahi" />  
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={Sterling_biotech} alt="Sterling_biotech" />                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={SwissMilitary} alt="SwissMilitary" />                                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={Tatva_chintan} alt="Tatva_chintan" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={zydus} alt="zydus" />                                      
                                    </div>
                                    {/* Repeat Slide */}
                                    
                                </div>
                        </div>

                        <div className="swiper client-sldr2" data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="">
                                <div className="swiper-wrapper">
                                    
                                    <div className="swiper-slide">
                                        <img src={MondelezLogo} alt="MondelezLogo" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={Tatva_chintan} alt="Tatva_chintan" />                                      
                                    </div>                                       
                                    <div className="swiper-slide">
                                        <img src={Sterling_biotech} alt="Sterling_biotech" />                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={zydus} alt="zydus" />                                      
                                    </div>                                                                       
                                    <div className="swiper-slide">
                                        <img src={Caterpillar} alt="Caterpillar" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={borosil} alt="borosil" />                                      
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={amneal} alt="amneal" />                                    
                                    </div>
                                    <div className="swiper-slide">
                                        <img src={adani_Solar} alt="adani_Solar" />                    
                                    </div> 
                                    <div className="swiper-slide">
                                        <img src={shahi} alt="shahi" />  
                                    </div>                                    
                                    <div className="swiper-slide">
                                        <img src={SwissMilitary} alt="SwissMilitary" />                                    
                                    </div>
                                    
                                </div>
                        </div>

                <div className="main-container client-main-container2 width-1250" data-aos="fade-in" data-aos-duration="800" data-aos-once="true">
                    <div className="client-img-bx">
                        <img className="first_Company-img" src={first_Company_in_Kutch} alt="1st_Company_in_Kutch"/>
                        <div className="client-contnt-bx">
                            <div className="swiper3 cta-sldr">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <h2 className="white ttl-60px">MRS is the 1st Logistics Company in Kutch to use RFID & block Chain technology for Real time visibilty for last Mile Delivery</h2>                  
                                            </div>
                                            <div className="swiper-slide">
                                                <h2 className="white ttl-60px">MRS is the 1st Company to provide Grade A Warehousing services in Kutch</h2>                                         
                                            </div>
                                            <div className="swiper-slide">
                                                <h2 className="white ttl-60px">MRS is 1st company to build single location based Grade A Compliant Warehouse of 1 lacs Sq Ft.</h2>                                          
                                            </div>
                                            <div className="swiper-slide">
                                                <h2 className="white ttl-60px">MRS is the 1st company to provide 3 PL Solution to One of the Largest Medical Device company in the world.</h2>                                        
                                            </div>
                                            
                                        </div>

                                        <div class="testml-pegination"></div>

                                        {/* <div className="testml-pegination" data-aos="fade-in"  data-aos-duration="900" data-aos-once="true" data-aos-delay="">
                                            <div className="cta-swiper-button-next cursor">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M12 20H28" stroke="#929292" strokeLinecap="round" /><path d="M21 12L29 20L21 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" transform="matrix(-1 0 0 1 41 0)" stroke="#929292"/></g></svg>
                                            </div>
                                            <div className="cta-swiper-button-prev cursor">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M29 20H13" stroke="#929292" strokeLinecap="round"/><path d="M20 12L12 20L20 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" stroke="#929292"/></g></svg>                              
                                            </div>
                                        </div> */}
                            </div>
                                
                            {/* <h2 className="white ttl-60px" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">We are the 1st Company in Kutch to use RFID & Blockchain Cargo Saftey for its Last Mile Delivery for cargo Safety and real time visibility!</h2> */}
                            <div className="client-btn enquire_btn" id="btn-styl" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="600">
                                    <a><span className="btn_name">Elevate Your<br/>Supply Chain Today</span> <img src={CTA_ARROW} alt="Arrow" className="hm-cta"/></a>
                            </div>
                            
                        </div>                        
                    </div>
                </div> 

                                          
        </div>
        </>
    )
}
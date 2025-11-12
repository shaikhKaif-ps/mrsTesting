import React from "react";
import { useEffect } from "react";
import '../../../../assets/css/home.css';
import Science_and_Health_Care from '../../../../assets/img/home_img/Science_and_Health_Care.jpg'
import RenewableEnergy from '../../../../assets/img/home_img/RenewableEnergy.jpg'
import Industrial from '../../../../assets/img/home_img/Industrial.jpg'
import Chemicals from '../../../../assets/img/home_img/Chemicals.jpg'
import Ecommerce from '../../../../assets/img/home_img/E-commerce.jpg'
import Arts from '../../../../assets/img/home_img/Arts.jpg'

export default function KeySector () {

    useEffect ( () => {
        var swiper = new Swiper(".sector-sldr", {
            navigation: {
              nextEl: ".sector-swiper-button-next",
              prevEl: ".sector-swiper-button-prev",
            },
            slidesPerView: 3.1,
            spaceBetween: 40,
            breakpoints: {
                320: {
                  slidesPerView: 1.1,
                },
                768: {
                  slidesPerView: 2.1,
                },
                1024: {
                    slidesPerView: 3.1,
                  },
              }
          });
    })

    return (
        <>            
            <div className="sector-sec section-padd-LR">
                <div className="main-container width-1250"> 
                    <div className="ovrflw-hdn">
                        <h2 className="sectr-ttl black js-split-text">Key Sectors we work with</h2>         
                    </div>    
                        <div className="swiper sector-sldr" data-aos="fade-in"  data-aos-duration="800" data-aos-once="true"  data-aos-delay="500"> 
                             <div className="pegination-arrow2">
                                    <div className="sector-swiper-button-next cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M12 20H28" stroke="#929292" strokeLinecap="round" /><path d="M21 12L29 20L21 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" transform="matrix(-1 0 0 1 41 0)" stroke="#929292"/></g></svg>
                                    </div>
                                    <div className="sector-swiper-button-prev cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M29 20H13" stroke="#929292" strokeLinecap="round"/><path d="M20 12L12 20L20 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" stroke="#929292"/></g></svg>                              
                                    </div>
                            </div>

                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={Science_and_Health_Care} alt="Science_and_Health_Care" />
                                        <div className="content-dv">
                                            <h2>Renewable Energy and Infrastructure Projects:  </h2>
                                            <div className="inner-content-dv">
                                                <p>Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale.</p>                                        
                                                <a className="btn grey" id="btn-styl" href="/sector/renewable-energy-and-infrastructure-projects"><span className="btn_name">Read more</span></a>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                                <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={RenewableEnergy} alt="RenewableEnergy" />
                                        <div className="content-dv">
                                            <h2>Manufacturing, Automotive, Technology, and Consumer Goods: </h2>
                                            <div className="inner-content-dv">
                                                <p>Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly.</p>                                        
                                                <a className="btn grey" id="btn-styl" href="/sector/manufacturing-automotive-technology-and-consumer-goods"><span className="btn_name">Read more</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={Industrial} alt="Industrial" />
                                        <div className="content-dv">
                                            <h2>Industrial Equipment:</h2>
                                            <div className="inner-content-dv">
                                                <p>Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational.</p>                                        
                                                <a className="btn grey" href="#">Read more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={Chemicals} alt="Chemicals" />
                                        <div className="content-dv">
                                            <h2>Agriculture, Chemicals, Construction, and Energy: </h2>
                                            <div className="inner-content-dv">
                                                <p>Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures.</p>                                        
                                                <a className="btn grey" id="btn-styl" href="/sector/chemicals-construction-energy-and-agriculture"><span className="btn_name">Read more</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={Ecommerce} alt="Ecommerce" />
                                        <div className="content-dv">
                                            <h2>E-commerce and Retail:</h2>
                                            <div className="inner-content-dv">
                                                <p>Revolutionising retail with cutting-edge logistics, delivering the future of commerce today.</p>                                        
                                                <a className="btn grey" id="btn-styl" href="/sector/e-commerce-and-retail"><span className="btn_name">Read more</span></a>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                                <div className="swiper-slide">
                                    <div className="sector-bx">
                                        <img src={Arts} alt="Arts" />
                                        <div className="content-dv">
                                            <h2>Arts, Exhibitions, and Luxury Goods: </h2>
                                            <div className="inner-content-dv">
                                                <p>Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form.</p>                                        
                                                <a className="btn grey" id="btn-styl" href="/sector/arts-exhibitions-and-luxury-Goods"><span className="btn_name">Read more</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                </div>
            </div>
        </>
    )
}
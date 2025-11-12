import React from 'react';
import { useEffect } from 'react';

export default function aboutHistory () {

    useEffect(() => {

        var swiper = new Swiper(".year-sldr", {
            navigation: {
              nextEl: ".year-swiper-button-next",
              prevEl: ".year-swiper-button-prev",
            },
            slidesPerView: 4.1,
            spaceBetween: 0,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
          });

    })

    return (
        <>
            <div className="history-section section-padd-LR overflow">
                <div className="main-container width-1250">
                    <h2 className='white js-split-text'>Our History</h2>
                    <div className="history-pegination-arrow">
                                    <div className="year-swiper-button-next cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M12 20H28" stroke="#929292" strokeLinecap="round" /><path d="M21 12L29 20L21 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" transform="matrix(-1 0 0 1 41 0)" stroke="#929292"/></g></svg>
                                    </div>
                                    <div className="year-swiper-button-prev cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="0.7"><path d="M29 20H13" stroke="#929292" strokeLinecap="round"/><path d="M20 12L12 20L20 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" stroke="#929292"/></g></svg>                              
                                    </div>
                            </div>
                    <div className="swiper year-sldr" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true">                            
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="history-bx">                                        
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2016</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <h2><span>January:</span>  Incorporation of MRS Shipping LLP</h2>
                                                <ul className='histry-ul'>
                                                    <li>Branch: 1 </li>
                                                    <li>Team: 2</li>
                                                    <li>Customer Base: 7-8</li>
                                                    <li>Revenue: INR 70 Lacs</li>
                                                </ul>                                        
                                                <h2><span>May:</span>  Acquisition of Custom Broker License from Indian Customs</h2>
                                                <h2><span>July:</span>  Commencement of Commercial Operations of Custom Brokerage in Mundra, Kandla, Hazira, and Ahmedabad</h2>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                                <div className="swiper-slide">
                                    <div className="history-bx">
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2017</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <h2><span>January:</span>  Entry into the EXIM business, handling a total of 240 TEUs</h2>                                                                                       
                                                <h2><span>March:</span>  Expansion of EXIM business with a client base in Kutch and Ahmedabad</h2>
                                                <h2><span>July:</span>  Partnership for the Implementation of RFID System by Indian Customs, contributing to ease of doing business</h2>
                                                <ul className='histry-ul'>
                                                    <li>Team: 5 </li>
                                                    <li>Team: 2</li>
                                                    <li>Customer Base: 1300</li>
                                                    <li>Revenue: INR 271 Lacs</li>
                                                </ul> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide">
                                    <div className="history-bx">
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2018</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <ul className='histry-ul'>
                                                    <li>March: Channel partnership with Transecure, approved for Electronic Cargo Tracking System (ECTS) for cross-border trade by surface transport </li>
                                                    <li>November: Expansion into Karnataka with customs clearance services and RFID seal distribution for the southern regionBranches: 5</li>
                                                    <li>Team: 19</li>
                                                    <li>Customer Base: 1800</li>
                                                    <li>Revenue: INR 452 Lacs</li>
                                                </ul> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="swiper-slide">
                                    <div className="history-bx">
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2019</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <ul className='histry-ul'>
                                                    <li>March: Establishment of a PAN India client baseBranches: 7 </li>                                                    
                                                    <li>Team: 24</li>
                                                    <li>Customer Base: 2700</li>
                                                    <li>Revenue: INR 500 Lacs</li>
                                                </ul>                                       
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="history-bx">
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2020</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <ul className='histry-ul'>
                                                    <li>Introduction of the Domestic Cargo Transportation & Aggregation business vertical, in partnership with industry leaders</li>                                                    
                                                </ul>                                   
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                                
                                {/* <div className="swiper-slide">
                                    <div className="history-bx">
                                        <div className="history-content-dv">
                                            <div className='year'>
                                                <h3>2021</h3>
                                            </div>                                         
                                            <div className="inner-history-dv">
                                                <h2>ipsum dolor sit amet, consectetur </h2>
                                                <p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit.</p>                                        
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
            </div>            
        </>
    )
}
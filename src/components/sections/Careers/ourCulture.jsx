import React from 'react';
import { useEffect } from 'react';
import Awards_ttl from '../../../assets/img/about_img/Awards_ttl.svg'
import Awrds1 from '../../../assets/img/about_img/awrds1.jpg'
import '../../../assets/css/careers.css'
import Collaborative from '../../../assets/img/career_img/Collaborative.jpg'
import Commitment from '../../../assets/img/career_img/Commitment.jpg'
import Continuous from '../../../assets/img/career_img/Continuous.jpg'
import Diversity from '../../../assets/img/career_img/Diversity.jpg'
import Culture from '../../../assets/img/career_img/Culture.svg'



export default function ourCulture () {

    useEffect(() => {

        var swiper = new Swiper(".awards-sldr", {
            navigation: {
              nextEl: ".awards-swiper-button-next",
              prevEl: ".awards-swiper-button-prev",
            },
            slidesPerView: 3,
            spaceBetween: 50,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                }
            }
          });

    })

    return (
        <>
            <div className="awards-section section-padd-LR overflow culture-sec">
                <div className='awrd-ttl culture-ttl' data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true">
                    <img src={Culture} alt='Culture' className='cultr-ttl-img'/>                    
                </div>
                <div className="main-container">
                    <h2 className='awrd-ttl-mob'>Culture</h2>          
                    <h2 className='grey awrds-sub-ttl culture-sub-ttl orange' data-aos="fade-in" data-aos-duration="500" data-aos-delay="600" data-aos-once="true">Our Culture: Thriving Together</h2>                    
                    <div className="swiper awards-sldr" data-aos="fade-in" data-aos-duration="500" data-aos-delay="800" data-aos-once="true">  

                    <div className="awards-pegination-arrow" id='culture-pegination-arrow'>
                                    <div className="awards-swiper-button-next cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="1"><path d="M12 20H28" stroke="#929292" strokeLinecap="round" /><path d="M21 12L29 20L21 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" transform="matrix(-1 0 0 1 41 0)" stroke="#929292"/></g></svg>
                                    </div>
                                    <div className="awards-swiper-button-prev cursor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><g opacity="1"><path d="M29 20H13" stroke="#929292" strokeLinecap="round"/><path d="M20 12L12 20L20 28" stroke="#929292" strokeLinecap="round"/>    <circle cx="20.5" cy="20.5" r="20" stroke="#929292"/></g></svg>                              
                                    </div>
                    </div>

                            <div className="swiper-wrapper white">
                                <div className="swiper-slide">
                                    <div className="award-bx">                                        
                                        <img src={Collaborative} alt='Collaborative' />
                                        <h2>Collaborative Environment</h2>
                                        <p>At MRS, teamwork is at the heart of our operations. We believe in the power of collaboration, fostering a supportive atmosphere where ideas are shared, and achievements are collective.</p>
                                    </div>                                        
                                </div>
                                <div className="swiper-slide">
                                    <div className="award-bx">                                        
                                        <img src={Commitment} alt='Commitment' />
                                        <h2>Commitment to Excellence</h2>
                                        <p>Our dedication to quality shapes our culture. We strive for excellence in every task, ensuring our services exceed expectations and set industry standards.</p>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="award-bx">                                        
                                        <img src={Continuous} alt='Continuous' />
                                        <h2>Continuous Learning</h2>
                                        <p>Growth is a constant pursuit at MRS. We invest in ongoing training and professional development, enabling our team to stay ahead in a fast-evolving industry.</p>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="award-bx">                                        
                                        <img src={Diversity} alt='Diversity' />
                                        <h2>Diversity and Inclusion</h2>
                                        <p>We celebrate diversity, believing that a wide range of perspectives enhances our creativity and problem-solving abilities. An inclusive environment ensures everyone feels valued and respected.</p>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
            </div>            
        </>
    )
}
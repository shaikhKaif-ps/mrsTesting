import React, { useEffect } from "react";
import Why from '../../../assets/img/about_img/why.svg'
import MRS_Van from '../../../assets/img/about_img/MRS_Van.png'


export default function aboutWhyMRS () {

    useEffect (() => {

        $('.tab-link').click( function() {
	
            var tabID = $(this).attr('data-tab');
            
            $(this).addClass('active').siblings().removeClass('active');
            
            $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
        }); 
       
     })

    return (
        <>
        <div className="whyMrs-section section-padd-LR overflow">
            <div className="main-container width-1250 black whyMRS-container1">
                <img src={Why} alt='AboutUs' className="why-img" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true"/>
                <div className='row'>
                    <div className='clm-2'>
                        <h3 className='grey why-mrs-txt' data-aos="fade-in" data-aos-duration="500" data-aos-delay="500" data-aos-once="true">Your trusted ally in Gujarat, providing end-to-end supply chain solutions for seamless operations.</h3>
                    </div>
                    <div className='clm-2'>
                        <img src={MRS_Van} alt='MRS_Van' className="mrs-van" data-aos="fade-in" data-aos-duration="500" data-aos-delay="600" data-aos-once="true"/>
                    </div>
                </div>
            </div>
            <div className="main-container width-1250 black whyMRS-container2">
                <div className="why-wrapper">		
                        <div className="tab-wrapper">
                            <ul className="tabs">
                                    <li className="tab-link active" data-tab="1" data-aos="fade-in" data-aos-duration="500" data-aos-delay="700" data-aos-once="true">Technology</li>
                                    <li className="tab-link" data-tab="2" data-aos="fade-in" data-aos-duration="500" data-aos-delay="800" data-aos-once="true">Quality</li>
                                    <li className="tab-link" data-tab="3" data-aos="fade-in" data-aos-duration="500" data-aos-delay="900" data-aos-once="true">Sustainability</li>
                            </ul>
                        </div>
                    
                        <div className="content-wrapper" data-aos="fade-in" data-aos-duration="500" data-aos-delay="1000" data-aos-once="true">
                    
                            <div id="tab-1" className="tab-content active">
                                <p>At MRS, we harness the power of cutting-edge technology to redefine logistics efficiency. Our advanced systems and innovative solutions ensure real-time visibility, seamless communication, and streamlined operations, setting new benchmarks in the logistics landscape.</p>                                 
                            </div>
                    
                            <div id="tab-2" className="tab-content">
                                <p>Quality is the cornerstone of our operations at MRS. From meticulous handling of goods to precision in every process, we are committed to delivering excellence. Our unwavering dedication to high standards ensures that every client experience is synonymous with reliability and satisfaction.</p> 
                            </div>
                    
                            <div id="tab-3" className="tab-content">
                                <p>Sustainability is integral to our ethos at MRS. We are dedicated to eco-friendly practices, from optimizing routes for fuel efficiency to leveraging green warehousing solutions. Our commitment to sustainability not only benefits the environment but also adds value to our clients' supply chains.</p>
                            </div>                
                        </div>
            
                </div>
            </div>
        </div>
                
            
        </>
    )
}
import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/lastMileService.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import Enhanced from '../../../../assets/img/services_img/Tech/Enhanced.svg' 
import Operational from '../../../../assets/img/services_img/Tech/Operational.svg' 
import Scalability from '../../../../assets/img/services_img/Tech/Scalability.svg' 
import Eco from '../../../../assets/img/services_img/Tech/Eco.svg'    

export default function benefitTechService () {

    useEffect (() =>  {
        $('.readMore-button').off('click').on('click', function () {
            $('.readMore-button').toggleClass('rotate');
            $('.moretext').slideToggle();
            if ($(this).text() == "Read more") {
                $(this).text("Read less");
            } else {
                $(this).text("Read more");
            }
        });
        
    })
    return (
        <>
        
        <div className="benefit-sec section-padd-LR overflow">
            <div className="main-container width-1250 black built-to-suit-container1">     
                <h3 className='we-offer-txt advtg-txt orange js-split-text'>Benefits of Choosing Our Tech-Driven Service</h3>
                <img className='built-line-img' src={GreyLine} alt="GreyLine" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"/>     
                <p className='mob-mrgin-btm-o center benefit-para' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1200">Choosing MRS Supply Chain's tech-driven last-mile delivery services brings numerous benefits:</p> 

                <div className='advant-containr'>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400" >
                        <img src={Enhanced} alt='Enhanced' />
                        <h4>Enhanced Customer Satisfaction</h4>
                        <p>A skilled and knowledgeable team well-versed in the nuances of international logistics.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <img src={Operational} alt='Operational' />
                        <h4>Operational Efficiency</h4>
                        <p>Proficiency in handling a wide variety of cargo types, ensuring versatility in service.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <img src={Scalability} alt='Scalability' />
                        <h4>Scalability</h4>
                        <p>Commitment to providing solutions specifically tailored to meet your unique requirements.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <img src={Eco} alt='Eco' />
                        <h4>Eco-Friendly Deliveries</h4>
                        <p>Ensuring your cargo moves efficiently and compliantly through global trade channels.</p>
                    </div>
                </div>   
                     
            </div>
        </div>
                
            
        </>
    )
}
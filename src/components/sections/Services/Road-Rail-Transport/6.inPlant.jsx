import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import CustomsBonded from '../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'
import Inplant from '../../../../assets/img/services_img/MultiuserWarehousing/In-Plant.jpg'


export default function BuiltcustomBonded () {

    useEffect (() =>  {
        $('.cstm-bondReadMore').off('click').on('click', function () {
            $('.cstm-bondReadMore').toggleClass('rotate');
            $('.bond-moretext').slideToggle();
            if ($(this).text() == "Read more") {
                $(this).text("Read less");
            } else {
                $(this).text("Read more");
            }
        });

        $('.accordion-list > li > .answer').hide();
    
        $('.accordion-list > li').off('click').on('click', function () {
            if ($(this).hasClass("active")) {
            $(this).removeClass("active").find(".answer").slideUp();
            } else {
            $(".accordion-list > li.active .answer").slideUp();
            $(".accordion-list > li.active").removeClass("active");
            $(this).addClass("active").find(".answer").slideDown();
            }
            return false;
        });
        
    })
    return (
        <>
        <div className="custom-bonded-sec2 section-padd-LR overflow roadRailLast-sec">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt blue js-split-text'>Key advantages of choosing rail freight services with MRS Supply Chain:</h3>
                <img className='built-line-img' src={GreyLine} alt="GreyLine" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"/>   

                <div className='row built-row T-B-Padding50' id='road-key-adv-rw'>
                    <div className='clm-2 built-img-clm'>
                        <img src={Inplant} alt='Inplant' data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="800"/>
                    </div>
                    <div className='clm-2'>   
                        <ul className="accordion-list accordn-last-sec" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                            <li>
                                <h3 className='black'>Diverse Delivery Products</h3>
                                <div className="answer">
                                    <p>We offer a range of delivery options, including both forward and reverse logistics, to suit different logistic needs.</p>       
                                </div>                         
                            </li>
                            <li>
                                <h3 className='black'>Multimodal Freight Services</h3>
                                <div className="answer">
                                    <p>Our customised solutions are designed to provide flexibility and efficiency, integrating different modes of transport to optimise the supply chain.</p>
                                </div>
                            </li>
                            <li>
                                <h3 className='black'>Guaranteed Timely and Safe Delivery</h3>
                                <div className="answer">
                                    <p>We commit to a 100% on-time delivery rate, ensuring your valuable consignments are delivered safely and promptly.</p>
                                </div>
                            </li>
                            <li>
                                <h3 className='black'>Professional and Trained Drivers</h3>
                                <div className="answer">
                                    <p>Our drivers are not only trained but also adhere to 8-hour shifts coupled with rest breaks, ensuring safety and reliability in your goods transportation.</p>
                                </div>
                            </li>                        
                        </ul>
                        <p className='mob-mrgin-btm-o road-trans-sec-para' id='road-key-adv-para' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">Whether you need Express or Regular FTL/PTL services, MRS Road Transport is equipped to handle your logistics requirements with the utmost care and professionalism. Our commitment to quality, safety, and timely delivery makes us the ideal partner for your transportation needs. Connect with us to experience a service that not only meets but exceeds your expectations.</p>    
                    </div>

                   
                </div>     

                 
                  
            </div>
        </div>
                
            
        </>
    )
}
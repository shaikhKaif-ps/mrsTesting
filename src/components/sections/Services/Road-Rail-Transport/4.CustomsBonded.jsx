import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import CustomsBonded from '../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'
import Keyadvantages from '../../../../assets/img/services_img/RoadRailTransport/Keyadvantages.jpg'


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
        <div className="custom-bonded-sec2 section-padd-LR overflow roadRailadvantage-sec">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt white js-split-text'>Key advantages of choosing rail freight services with MRS Supply Chain:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900"/>

                <div className='row built-row T-B-Padding' id='road-advnt-accr-rw'>
                    <div className='clm-2'>   
                    <ul className="accordion-list road-accordn white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <li>
                            <h3>Rail Freight Efficiency and Network</h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <li>Cost-Efficiency: Enhance the cost-effectiveness of your rail cargo transport.</li>
                                    <li>Extensive Rail Network: Tap into our vast rail distribution network for nationwide reach.</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Rail Transport Reliability and Precision</h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <li>On-Time Delivery Assurance: Improve the reliability of your rail transport schedules for punctual deliveries.</li>
                                    <li>Precision Rail Handling: We ensure precise rail cargo handling, eliminating offloading and over-carrying risks.
</li>
                                    <li>Damage-Free Rail Delivery: Cargo safety is our priority, assuring damage-free rail transport.</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Versatile Rail Cargo Handling</h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <li>Versatile Cargo Solutions: We cater to various rail cargo types, including piece cargo, oversized goods, bulk cargo, and dangerous goods rail freight.</li>
                                    <li>Piece Cargo Expertise: Manual or mechanical loading with closed containers and wagons.</li>
                                    <li>Oversized or Heavyweight Rail Cargo: Crane-assisted loading with open cars, transporters, and platforms.</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Specialized Rail Transport Services</h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <li>Safe Handling of Dangerous Goods: We specialise in rail transport of dangerous goods, adhering to special rules, marking, packaging, and safety standards.</li>
                                    <li>Cargo Hazard Class Consideration: We utilise specialised containers based on the hazard class of your rail cargo.</li>
                                    <li>Expert Rail Transportation Services: Our rail transport capabilities extend to various cargo types, including cars, vehicles, machines, oversized goods, perishables with temperature maintenance, and bulk lightweight cargoes.</li>
                                </ul>
                            </div>
                        </li>                        
                    </ul>
                    <p className='white mob-mrgin-btm-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">By choosing MRS Rail Transport Services, you're not just opting for rail freight; you're choosing efficiency, reliability, and sustainability. Contact us today for a personalised railway freight services plan and elevate your rail operations to new heights. </p>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={Keyadvantages} alt='Keyadvantages' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>
                    </div>
                </div>     

            </div>
        </div>
                
            
        </>
    )
}
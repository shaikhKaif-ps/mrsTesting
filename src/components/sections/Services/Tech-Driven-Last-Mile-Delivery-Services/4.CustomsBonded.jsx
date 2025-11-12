import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/lastMileService.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import CustomsBonded from '../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'
import Inplant from '../../../../assets/img/services_img/LastMileDelivery/Last-MileDeliveryFeatures.jpg'



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
        <div className="custom-bonded-sec2 section-padd-LR overflow lastMile-accr-sec">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt white js-split-text key-fetr-ttl'>Key Features of Our Last Mile Delivery Service:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>

                <div className='row built-row T-B-Padding B-padding-o' id='lastMile-accro-rw'>
                    <div className='clm-2'>   
                    <ul className="accordion-list last-mile-accrdn white" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">
                        <li>
                            <h3>Customer Support: </h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <p>MRS Supply Chain provides dedicated customer support to address any inquiries or concerns related to last mile deliveries, ensuring a positive customer experience.</p>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Automated Dispatch: </h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <p>Our automated dispatch system intelligently assigns delivery tasks to drivers based on factors such as proximity to the delivery location, driver availability, and vehicle capacity. This automated process eliminates manual intervention, ensuring swift dispatch and minimizing idle time, ultimately leading to faster deliveries.</p>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Dynamic Route Optimization: </h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <p>Leveraging advanced route optimization algorithms, we dynamically adjust delivery routes in real-time to account for factors like traffic congestion, road closures, and delivery priority. By continuously optimizing routes, we maximize efficiency, reduce delivery times, and enhance overall service reliability.</p>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <h3>Cost Efficiency: </h3>
                            <div className="answer">
                                <ul className='accordn-list'>
                                    <p>By optimizing routes and leveraging technology, MRS Supply Chain maximizes cost efficiency in last mile deliveries, helping businesses minimize transportation costs and improve profitability.</p>
                                </ul>
                            </div>
                        </li>                        
                    </ul>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={Inplant} alt='Inplant' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>
                    </div>
                </div>     

            </div>
        </div>
                
            
        </>
    )
}
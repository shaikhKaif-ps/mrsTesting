import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/LastMileDelivery/PartnerWithUs.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'

import '../../../../assets/css/Services/MultiuserWarehousing.css'
import Inplant from '../../../../assets/img/services_img/MultiuserWarehousing/In-Plant.jpg'
import Line from '../../../../assets/img/services_img/MultiuserWarehousing/black_Line.svg'


export default function BuiltmultiWarehousing () {

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
        <div className="multiwarehouse section-padd-LR overflow road-trnsfm-sec">
            <div className="main-container width-1200 black built-to-suit-container1 multiwar-cont1">     
                <div className='row built-row road-trnsf-built-rw'>
                    
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text blue'>Why Partner with Us for Last-Mile Delivery?</h2>                      
                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">MRS Supply Chain is not just a provider; we are your partner in achieving logistics excellence. Our commitment to innovation, combined with our deep understanding of the logistics and supply chain challenges, makes us the ideal choice for businesses looking to enhance their last-mile delivery capabilities. With MRS, you can expect a seamless, efficient, and future-proof delivery solution that grows with your business.</p>                                                
                    </div>   
                    <div className='clm-2 built-img-clm'>
                        <img src={MultiuserWarehousing} alt='Inplant' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                    </div>                 
                </div>                
            </div>
        </div>                
            
        </>
    )
}
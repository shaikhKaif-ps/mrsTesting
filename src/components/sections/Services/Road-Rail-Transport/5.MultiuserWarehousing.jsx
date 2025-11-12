import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/RoadRailTransport/RoadTransportation.jpg'
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
        <div className="multiwarehouse section-padd-LR overflow road-trnsfm-sec" id='road'>
            <div className="main-container width-1200 black built-to-suit-container1 multiwar-cont1">     
                <div className='row built-row road-trnsf-built-rw'>
                    
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>Road Transportation</h2>                      
                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">At MRS Supply Chain, we pride ourselves on offering a complete range of surface transport services tailored to meet the diverse needs of our customers. Our comprehensive suite of services includes Full Truck Load (FTL), Part Truck Load (PTL), Mid-Mile Goods Transport, Last Mile Delivery (LMD), Long-Haul Transportation, and specialised transportation options such as automobile carriers and liquid tankers.</p>                        

                        <div className='moretext'>
                            <p>This array of services ensures that no matter the size or nature of your consignment, we have the perfect solution to meet your requirements.</p>                         
                        </div>
                        <a className="readMore-button" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a>
                        
                    </div>   
                    <div className='clm-2 built-img-clm road-trnsfm-img'>
                        <img src={MultiuserWarehousing} alt='Inplant' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                    </div>                 
                </div>                
            </div>
        </div>

        <div className="section-padd-LR overflow road-trans-sec">
            <div className="main-container width-1200 black built-to-suit-container1">     
            <h3 className='we-offer-txt blue js-split-text road-transp-txt'>Why MRS Road Transportation Stands Out:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"
/>
                <div>
                    <ul className='built-ul inplant-ul inplant-ul-bl'>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">
                        <h3>Full Truck Load (FTL) & Part Truck Load (PTL) Services:</h3>
                        <p>Whether you require an entire truck or just a part of it, our FTL and PTL services are designed to cater to both large and smaller consignments, offering flexibility and efficiency in your cargo movement.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <h3>Mid-Mile & Last Mile Delivery:</h3>
                        <p>We understand the importance of the entire supply chain, from mid-mile goods transport ensuring the rapid movement of goods from warehouses to local distribution centres, to last mile delivery ensuring timely and safe delivery to the final destination.</p>
                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <h3>Long-Haul Transportation & Specialized Services:</h3>
                        <p>Our long-haul transportation services are perfect for moving goods over long distances, while our specialised transportation options like automobile carriers and liquid tankers are ideal for specific types of cargo requiring particular care. </p>

                    </li>
                    </ul>

                    {/* <p className='margin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">Elevate your manufacturing efficiency with MRS In-Plant Warehousing Services – where precision, innovation, and adaptability converge to enhance your operational excellence.</p> */}
                </div>   
            </div>
        </div>
                
            
        </>
    )
}
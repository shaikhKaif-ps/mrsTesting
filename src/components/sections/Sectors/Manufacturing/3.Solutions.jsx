import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/lastMileService.css'
import '../../../../assets/css/sector.css'
import Line from '../../../../assets/img/line_img/Black_Line.svg'
import Inplant from '../../../../assets/img/sectors_img/Renewabl-Eenergy/RenewablEenergy_solutions.jpg'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'



export default function SectorSolutions () {

    
    return (
        <>
        <div className="custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec">
            <div className="main-container width-1250 built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt black js-split-text key-fetr-ttl'>Streamlining Production and Distribution with Expert Solutions</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay=""/>

                <div className='row built-row T-B-Padding B-padding-o '>
                    <div className='clm-2 solution-clm'>   
                        <h3 data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Regulatory Compliance and Documentation</h3>
                        <p data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Navigating the intricate web of customs and international trade regulations is critical for these sectors, and MRS provides the expertise needed to ensure seamless operations.</p>

                        <h3 data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Tech-Driven Last-Mile Delivery</h3>
                        <p data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Advanced delivery services tailored to the needs of fast-paced manufacturing and consumer goods sectors, enhancing supply chain efficiency.</p> 

                        <h3 data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Duty-Free Warehousing</h3>
                        <p data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Strategic warehousing solutions that complement the manufacturing process, from raw materials storage to finished goods distribution, ensuring a smooth supply chain flow.</p>                    
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={MultiuserWarehousing} alt='MultiuserWarehousing' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="500"/>
                    </div>
                </div>     

            </div>
        </div>
                
            
        </>
    )
}
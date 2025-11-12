import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/lastMileService.css'
import '../../../../assets/css/sector.css'
import Line from '../../../../assets/img/line_img/Black_Line.svg'
import Inplant from '../../../../assets/img/services_img/Poineering/Pioneering_spot.jpg'



export default function SectorSolutions () {

    
    return (
        <>
        <div className="custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec">
            <div className="main-container width-1250 built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt black js-split-text key-fetr-ttl'>Specialised Logistics Solutions for Arts, Exhibitions, and Luxury Goods:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay=""/>

                <div className='row built-row T-B-Padding B-padding-o '>
                    <div className='clm-2 solution-clm'>   
                        <h3 data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">High-Value Commodities and Exhibition Cargo</h3>
                        <p data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Handling and logistics for exhibitions, art pieces, and luxury items, ensuring their pristine condition and timely delivery for global showcases.</p>
                        <h3 data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Duty-Free Warehousing</h3>
                        <p data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="">Secure, climate-controlled storage solutions that leverage duty-free benefits, providing an ideal environment for the preservation and staging of valuable goods.</p>                    
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={Inplant} alt='Inplant' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="500"/>
                    </div>
                </div>     

            </div>
        </div>
                
            
        </>
    )
}
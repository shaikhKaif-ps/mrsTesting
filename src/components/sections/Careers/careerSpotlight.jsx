import React from "react";
import '../../../assets/css/about.css'  
import '../../../assets/css/Services/MultiuserWarehousing.css'
import Line from '../../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg'
import Career_spot from '../../../assets/img/career_img/career_spot.jpg'

export default function CareerSpotlight () {
    return (
        <>
        <div className="service-spotlight section inner-spotlight-sec section-padd-LR overflow" id="career-hdr">
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1">
                    <h1 className="js-split-text white">Careers</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="500">Join Our Team</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="700"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Explore Opportunities: Embark on a Rewarding Career with MRS Group</p>
                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60' >Careers</a>
                    </div>
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={Career_spot} alt="Career_spot" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
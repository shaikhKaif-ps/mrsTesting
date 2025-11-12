import React, { useEffect } from 'react';
import '../../../assets/css/about.css'   
import '../../../assets/css/Services/MultiuserWarehousing.css'
import Line from '../../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg'


export default function ContactSpotlight () {

    useEffect (() =>  {
        
    })

    return (
        <>
        <div className="service-spotlight section inner-spotlight-sec section-padd-LR overflow contct-hdr">
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1">
                    <h1 className="js-split-text white">Contact Us</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="500">Your Logistics Partner</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="700"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">We're Here to Help: Connect with Our Expert Team Today</p>                    

                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>Contact us</a>
                    </div>
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={Warehousing_Solution} alt="supplyChainImage" className='lToR' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
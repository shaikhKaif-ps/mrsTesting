import React, { useEffect } from 'react';
import '../../../../assets/css/about.css'   
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/pioneeringWarehousing.css'
import Line from '../../../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../../../assets/img/services_img/RoadRailTransport/Road&RailTransport.jpg'


export default function CustomsServicesSpotlight () {

    useEffect (() =>  {
        
    })

    return (
        <>
        <div className="service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow roadRailTrans-hdr" >
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1 servcs-spot-clm1">
                    <h1 className="js-split-text white">Road & Rail<br />Transport</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Dependable. Streamlined.</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="1000"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="900" data-aos-once="true" data-aos-delay="1000">Associate with us to experience seamless, efficient road and rail services</p>
                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="1100">
                        <a className='white-60' href="#">Home </a>{' > '}
                        <a className='white-60'>Services </a>{' > '}
                        <a className='white-60' >Road & Rail Transport</a>
                    </div>
                    {/* <a className="btn inner-spt-btn white" href="#" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">Home {' > '} Services {' > '} Road & Rail Transport</a> */}
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={Warehousing_Solution} alt="supplyChainImage" className='lToR' data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="800"/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
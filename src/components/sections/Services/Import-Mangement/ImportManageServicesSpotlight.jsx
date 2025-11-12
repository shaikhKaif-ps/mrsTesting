import React, { useEffect } from 'react';
import '../../../../assets/css/about.css'   
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import Line from '../../../../assets/img/home_img/Line.svg'
import ImportManagement from '../../../../assets/img/home_img/Slider/Import Management Spotlight.png'


export default function ImportManageServicesSpotlight () {

    useEffect (() =>  {
        
    })

    return (
        <>
        <div className="service-spotlight section inner-spotlight-sec section-padd-LR overflow wareHousing-hdr" >
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1">
                    <h1 className="js-split-text white">Import<br />Management</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Efficient, Reliable, and Compliant Import Management Services Across Industries</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">Streamline Your Imports with India’s Leading Import Management Partner.</p>
                    {/* <a className="btn inner-spt-btn white" href="#" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">Home {' > '} Services {' > '} Warehousing Solutions</a> */}

                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>Services </a>{' > '}
                        <a className='white-60' >Import Management</a>
                    </div>
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={ImportManagement} alt="supplyChainImage" className='lToR' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
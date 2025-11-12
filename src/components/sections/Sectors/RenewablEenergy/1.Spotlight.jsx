import React, { useEffect } from 'react';
import '../../../../assets/css/about.css'   
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/pioneeringWarehousing.css'
import Line from '../../../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../../../assets/img/sectors_img/Renewabl-Eenergy/RenewablEenergy.jpg'


export default function SectorSpotlight () {

    useEffect (() =>  {
        
    })

    return (
        <>
        <div className="service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow renewalEnergy-hdr" >
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1" id='inner-spot-clm-1'>
                    <h2 className="sldr-sub-ttl" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="0">Sector Solutions</h2>
                    <h1 className="js-split-text white">Renewable Energy and <br />Infrastructure Projects </h1>                    
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="300"/>
                    <p className="white" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="300">Powering Progress with Logistics Solutions</p>

                    <div className="btn inner-spt-btn white" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true" data-aos-delay="300">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>Sectors </a>{' > '}
                        <a className='white-60'>Renewable Energy and Infrastructure Projects</a>
                    </div>
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={Warehousing_Solution} alt="supplyChainImage" className='lToR' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="300"/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
import React, { useEffect } from 'react';
import '../../../../assets/css/about.css'   
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import Line from '../../../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg'


export default function InPlantServicesSpotlight () {

    useEffect (() =>  {
        
    })

    return (
        <>
        <div className="service-spotlight section inner-spotlight-sec section-padd-LR overflow" id='light-blue-bg'>
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1">
                    <h1 className="js-split-text white">Your Warehousing<br />Solution</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400">Dependable. Streamlined.</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="800"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="900" data-aos-once="true" data-aos-delay="500">Seamless warehousing solutions designed to meet the diverse needs of your business.</p>

                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">
                        <a className='white-60' href="/">Home {' > '}</a>
                        <a className='white-60'>Services {' > '}</a>
                        <a className='white-60' >Warehousing Solutions</a>
                    </div>

                    {/* <a className="btn inner-spt-btn white" href="#" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">Home {' > '} Services {' > '} Warehousing Solutions</a> */}
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">                    
                    <img src={Warehousing_Solution} alt="supplyChainImage" className='lToR'/>                    
                </div>
            </div>

        </div>
        
        </>
    )
}
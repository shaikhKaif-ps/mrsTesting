import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import BuiltWarehousing from '../../../../assets/img/services_img/LastMileDelivery/AboutLast-MileDelivery.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'


export default function BuiltmultiUserAbout () {
    return (
        <>
        <div className="built-to-suit-sec section-padd-LR overflow">
            <div className="main-container width-1200 built-to-suit-container1 white">     
                <div className='row built-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800"/>
                    </div>

                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">Last-Mile Delivery</h2>                      
                        <p className='last-mile-cntn' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">At MRS Supply Chain, technology is the backbone of our last-mile delivery solutions. Our approach leverages the latest in AI, IoT, and machine learning to streamline delivery processes, from automated dispatching to dynamic route optimization. Real-time tracking and advanced analytics empower us to make informed decisions, adapt to changing conditions, and consistently deliver on time, every time.</p>
                    </div>                    
                </div>                
            </div>
        </div>
                
            
        </>
    )
}
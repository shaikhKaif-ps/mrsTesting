import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import BuiltWarehousing from '../../../../assets/img/services_img/RoadRailTransport/RailFreight.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'


export default function BuiltmultiUserAbout () {
    return (
        <>
        <div className="built-to-suit-sec section-padd-LR overflow" id="rail">
            <div className="main-container width-1200 built-to-suit-container1 white">     
                <div className='row built-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900"/>
                    </div>

                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>Rail Freight</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">When it comes to rail transport, whether for small or large volumes, MRS Supply Chain offers the flexibility and affordability you need across Pan India. Our rail freight services are designed to cater to your unique requirements, ensuring seamless, reliable, and cost-effective solutions.</p>
                    </div>                    
                </div>

                <div>
                    <ul className='built-ul road-built-ul'>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500">
                        <h3>Your Railway Partner:</h3>
                        <p> At MRS Supply Chain, we excel in providing rail freight services that connect Mundra Port to the Northern Part of India. Supported by cutting-edge logistics management and technology, we stand ready to meet the dynamic demands of today's rail transport landscape. Our approach is driven by a commitment to generating group synergy, allowing us to adapt swiftly to evolving needs.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <h3>Efficiency through Expertise</h3>
                        <p>Our team of rail transport experts meticulously scrutinises your rail supply and logistics chain, ensuring that your cargo is handled with utmost efficiency and care. We leave no stone unturned in our quest for speedy and secure railway freight services.</p>
                    </li>                    
                    </ul>
                </div>
                
            </div>
        </div>
                
            
        </>
    )
}
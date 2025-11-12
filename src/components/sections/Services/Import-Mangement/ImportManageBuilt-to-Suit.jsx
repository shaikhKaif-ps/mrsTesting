import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import BuiltWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/BuiltWarehousing.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'


export default function ImportManageBuiltoSuit () {
    return (
        <>
        <div className="built-to-suit-sec section-padd-LR overflow" id='DetailedServicesBreakdown'>
            <div className="main-container width-1200 built-to-suit-container1 white">     
                <div className='row built-row'>
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>Detailed Services Breakdown</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">Import management oversees the efficient flow of goods from foreign suppliers to a business, handling logistics, documentation, and customs compliance. By navigating complex trade regulations and coordinating each step, it ensures timely, cost-effective delivery and smooth supply chain operations.</p>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900"/>
                    </div>
                </div>

                <h3 className='we-offer-txt js-split-text'>At MRS, we offer a cutting-edge solution with your business in mind:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                <div>
                    <ul className='built-ul'>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500">
                        <h3>Customs Brokerage</h3>
                        <p>Expert handling of all customs documentation and procedures.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <h3>Compliance Assurance</h3>
                        <p>Ensuring all imports meet India’s regulatory standards.</p>
                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <h3>Logistics Coordination</h3>
                        <p>Streamlined logistics solutions from the point of origin to your doorstep.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <h3>End-to-End Handling</h3>
                        <p>From documentation to delivery, we manage every aspect of your import process.</p>

                    </li>
                    
                    </ul>

                    <p className='margin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">At MRS, we provide seamless import solutions. Our Customs Brokerage ensures expert handling of all documentation, while Compliance Assurance keeps you aligned with India’s regulations. With Logistics Coordination and End-to-End Handling, we manage everything from origin to delivery, so you can focus on your business.</p>
                </div>
                
            </div>
        </div>
                
            
        </>
    )
}
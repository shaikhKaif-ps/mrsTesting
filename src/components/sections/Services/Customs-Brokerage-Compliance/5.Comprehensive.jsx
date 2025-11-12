import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/CustomBrokServices.css'
import Comprehensive from '../../../../assets/img/services_img/CustomsBrokerageCompliance/ComprehensiveCustoms.jpg'
import Line from '../../../../assets/img/line_img/Black_Line.svg'


export default function comprehensive () {
    return (
        <>
        <div className="section-padd-LR overflow">
            <div className="main-container width-1200 built-to-suit-container1 black">  
                <h3 className='ttl-45px js-split-text'>Comprehensive Customs & Foreign Trade Compliance Services </h3>
                <p className='ttl-25px bold mrgin-btm-o' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Your Partner in Comprehensive Customs & Foreign Trade Compliance Services</p>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                <div className='row built-row customs-row'>                    
                    <div className='clm-2'>   
                        <p className='ttl-25px trade-para' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">At MRS, we are more than just a service provider; we are your partner in navigating the complex world of customs. Our extensive range of customised customs services is designed to align with the unique requirements of your business. From the initial planning stages to the final delivery, our dedicated team is equipped to manage every aspect of the customs process. We ensure a seamless and stress-free experience, allowing you to focus on your core business operations while we handle the intricacies of customs compliance and documentation.</p>
                        <ul className='built-ul customsBrok-ul'>
                            <li data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="500">
                                <h3>Pre/Post Shipment Consultancy Services:</h3>
                                <p>Our consultancy services are designed to assist businesses in both pre and post-shipment stages. We provide expert advice on the most efficient and cost-effective shipping methods, documentation requirements, and customs procedures. This proactive approach helps anticipate and resolve potential issues before they arise, ensuring smooth transit of your goods.</p>
                            </li>
                            
                        </ul>
                    </div>     
                    <div className='clm-2 built-img-clm'>
                        <img src={Comprehensive} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000"/>
                    </div>               
                </div>                             
            </div>
        </div>
                
            
        </>
    )
}
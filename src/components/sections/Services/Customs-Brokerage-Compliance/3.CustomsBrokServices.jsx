import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/CustomBrokServices.css'
import BuiltWarehousing from '../../../../assets/img/services_img/CustomsBrokerageCompliance/ForeignTrade.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'


export default function customsBrokServices () {
    return (
        <>
        <div className="built-to-suit-sec section-padd-LR overflow" id='customs'>
            <div className="main-container width-1200 built-to-suit-container1 white">  
                <h3 className='ttl-45px js-split-text'>Customs Brokerage Service </h3>
                <p className='ttl-25px bold mrgin-btm-o' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Foreign Trade Compliance: Expert guidance for compliance and regulatory success</p>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                <div className='row built-row customs-row compliance-row'>
                    <div className='clm-2'>   
                        <ul className='built-ul customsBrok-ul compliance-ul'>
                            <li data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">
                                <h3>Experienced Customs Team</h3>
                                <p>Our team at MRS is not just skilled; they are seasoned experts in customs brokerage. With extensive qualifications and a wealth of experience, they handle a wide array of customs documentation for various cargo types. Our successful case studies reflect our proficiency in delivering exceptional service, consistently ensuring that our clients' consignments clear customs swiftly and without any hitches.</p>

                            </li>
                            <li data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">
                                <h3>Centralised Documentation Cell (CDC)</h3>
                                <p>The Centralised Documentation Cell (CDC) at MRS is a cornerstone of our customs brokerage service. This specialised unit manages and simplifies the extensive documentation requirements inherent in international trade. By centralising this function, we have significantly enhanced the efficiency of the documentation process, reducing risks and saving valuable time for our clients.</p>
                            </li>
                        </ul>
                    </div>
                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000"/>
                    </div>
                </div>                             
            </div>
        </div>
                
            
        </>
    )
}
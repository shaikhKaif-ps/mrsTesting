import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/CustomBrokServices.css'
import BuiltWarehousing from '../../../../assets/img/services_img/CustomsBrokerageCompliance/ForeignTradeCompliance.jpg'
import Line from '../../../../assets/img/line_img/Blue_Line.svg'


export default function foreignTrade () {
    return (
        <>
        <div className="section-padd-LR overflow grey-bg" id='foreign'>
            <div className="main-container width-1200 built-to-suit-container1 black">  
                <h3 className='ttl-45px js-split-text'>Foreign Trade Compliance </h3>
                <p className='ttl-25px bold mrgin-btm-o blue' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Expert guidance for compliance and regulatory success</p>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                <div className='row built-row customs-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900"/>
                    </div>
                    <div className='clm-2'>   
                        <p className='ttl-25px trade-para' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="1000">Our depth of knowledge in Foreign Trade compliance, including Free Trade Agreements and their compliance, Export and Import benefits, duty-free import licenses like EPCG, Advance Authorization, MOOWR scheme, etc., is unmatched. Our team stays abreast of the ever-changing regulations, ensuring that your business is not only compliant but also protected from potential noncompliance, penalties, and delays. We understand the intricacies of foreign trade laws and utilize this expertise to facilitate smooth and lawful international trade for our clients.</p>
                    </div>                    
                </div>                             
            </div>
        </div>
                
            
        </>
    )
}
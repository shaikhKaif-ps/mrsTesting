import React, { useEffect } from 'react';
import '../../../assets/css/Services/MultiuserWarehousing.css'
import WarehousingNeeds from '../../../assets/img/safety_img/safety_contnt.jpg'

export default function SafetyContent () {

    useEffect (() =>  {
        
    })
    return (
        <>
        <div className="multiwarehouse section-padd-LR overflow safety-contn-sec">
            <div className="main-container width-1200 black built-to-suit-container1 multiwar-cont1">     
                <div className='row safety-row'>
                    
                    <div className='clm-2 built-cntnt-clm safety-cntnt'>   
                        <h2 className='js-split-text blue'>Safety Policy</h2>                      
                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">This policy reflects MRS Group’s dedication to maintaining and promoting a safe and healthy work environment at all our operating locations. Our objective is to effectively manage and reduce any risks associated with environmental health and safety that could impact the well-being of our employees and the efficiency of our operations. By implementing rigorous safety protocols, responsible processes, and a well-defined organisational structure, we aim to foster a secure and positive atmosphere. Our approach is designed to continuously improve our safety culture, contributing to the overall development and growth of our company.</p>                        
                        
                    </div> 

                    <div className='clm-2 built-img-clm'>
                        <img src={WarehousingNeeds} alt='WarehousingNeeds' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                    </div>                   
                </div>                
            </div>
        </div>
                
            
        </>
    )
}
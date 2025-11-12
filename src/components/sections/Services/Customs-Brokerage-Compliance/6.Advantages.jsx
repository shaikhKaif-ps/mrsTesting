import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import Line from '../../../../assets/img/line_img/White_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import Experienced from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Experienced.svg'
import Diverse from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Diverse.svg'
import Custom from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Custom.svg'
import Smooth from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Smooth.svg'
import Deep from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Deep.svg'
import Reduced from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Reduced.svg'
import Minimise from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Minimise.svg'
import Enhanced from '../../../../assets/img/services_img/CustomsBrokerageCompliance/Enhanced.svg'



export default function Advantages () {
    return (
        <>
        <div className="compliance-sec section-padd-LR overflow">
            <div className="main-container width-1200 white built-to-suit-container1">     
                <h3 className='we-offer-txt advtg-txt js-split-text orange'>Key advantages of choosing MRS Supply Chain:</h3>
                <img className='built-line-img' src={Line} alt="GreyLine" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800"/>     

                <div className='advant-containr compliance-containr'>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900" >
                        <img src={Experienced} alt='Experienced' />
                        <h4 className='orange'>Experienced Team</h4>
                        <p>A skilled and knowledgeable team well-versed in the nuances of international logistics.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Diverse} alt='Diverse' />
                        <h4 className='orange'>Diverse Cargo Expertise</h4>
                        <p>Proficiency in handling a wide variety of cargo types, ensuring versatility in service.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Custom} alt='Custom' />
                        <h4 className='orange'>Custom-Tailored Solutions</h4>
                        <p>Commitment to providing solutions specifically tailored to meet your unique requirements.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900" >
                        <img src={Smooth} alt='Smooth' />
                        <h4 className='orange'>Smooth Cargo Movement</h4>
                        <p>Ensuring your cargo moves efficiently and compliantly through global trade channels.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Deep} alt='Deep' />
                        <h4 className='orange'>Deep Regulatory Knowledge</h4>
                        <p>In-depth understanding of customs regulations and procedures.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Reduced} alt='Reduced' />
                        <h4 className='orange'>Reduced Delays</h4>
                        <p>Expertise that translates into fewer delays in the shipping process.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Minimise} alt='Minimise' />
                        <h4 className='orange'>Minimise Risk of Penalties</h4>
                        <p>Vigilant compliance strategies to minimise the risk of penalties and fines.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <img src={Enhanced} alt='Enhanced' />
                        <h4 className='orange'>Enhanced Operational Efficiency</h4>
                        <p>Streamlining your logistics operations for greater efficiency and cost-effectiveness.</p>
                    </div>
                </div>   
                <p className='mob-mrgin-btm-o complieance-Advbottom-para txt-center' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">Choose MRS multi-user warehousing to unlock a world of efficiency, flexibility, and cost-effectiveness for your supply chain. Experience shared success in warehousing that adapts to your every requirement.</p>      
            </div>
        </div>
                
            
        </>
    )
}
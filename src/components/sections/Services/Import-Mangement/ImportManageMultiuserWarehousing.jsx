import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/Versatile.svg'
import Flexible from '../../../../assets/img/services_img/MultiuserWarehousing/Flexible.svg'
import Scalable from '../../../../assets/img/services_img/MultiuserWarehousing/Scalable.svg'


export default function ImportManageMultiuserWarehousing () {

    useEffect (() =>  {
        $('.readMore-button').off('click').on('click', function () {
            $('.readMore-button').toggleClass('rotate');
            $('.moretext').slideToggle();
            if ($(this).text() == "Read more") {
                $(this).text("Read less");
            } else {
                $(this).text("Read more");
            }
        });
        
    })
    return (
        <>
        <div className="multiwarehouse section-padd-LR overflow" id='AboutIME'>
            <div className="main-container width-1200 black built-to-suit-container1 multiwar-cont1">     
                <div className='row built-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={MultiuserWarehousing} alt='Inplant' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                    </div>
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>About MRS’s Import Management Expertise</h2>                      
                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">MRS Supply Chain Solutions has cemented its position as a leader in import management services throughout India. With over a decade of expertise, we navigate the complexities of customs and import regulations to bring you a seamless, compliant, and efficient import process. Our robust network and deep understanding of international trade laws ensure your goods move smoothly and swiftly across borders.
                        </p>                        

                        <div className='moretext'>
                            <p>Shared Space, Shared Success - With our extensive warehouse network, knowledge sharing, extensive experience, and ongoing collaborative improvement projects, we stand committed to providing the highest quality solutions for your products. Our multi-user warehousing concept fosters synergy, ensuring your goods are handled with care and precision.</p>                         
                        </div>
                        <a className="readMore-button" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a>
                        
                    </div>                    
                </div>                
            </div>
        </div>

        <div className="inPlant-sec2 section-padd-LR overflow">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt advtg-txt blue js-split-text'>Advantages of Import Management with MRS</h3>
                <img className='built-line-img' src={GreyLine} alt="GreyLine" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"/>     

                <div className='advant-containr'>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400" >
                        <img src={VersatileStorage} alt='VersatileStorage' />
                        <h4>Versatile Solutions</h4>
                        <p>Whether you need support for occasional shipments or ongoing import operations, our services are designed to meet your unique requirements.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <img src={Flexible} alt='Flexible' />
                        <h4>Cost-Effective Options</h4>
                        <p>Benefit from tailored financial solutions that align with your budget and operational needs, ensuring maximum value for your investment.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <img src={Scalable} alt='Scalable' />
                        <h4>Scalable Operations</h4>
                        <p>Easily adjust to fluctuations in demand with our flexible import management capabilities, designed to handle everything from small shipments to large-scale operations.</p>
                    </div>
                </div>   
                <p className='mob-mrgin-btm-o txt-center' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1200">Choose MRS for import management that delivers efficiency, compliance, and reliability. Experience seamless import processes tailored to your business needs, ensuring smooth operations and shared success.</p>      
            </div>
        </div>
                
            
        </>
    )
}
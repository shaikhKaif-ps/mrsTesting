import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import WarehousingNeeds from '../../../../assets/img/services_img/Poineering/WarehousingNeeds.jpg'

export default function CustomsmultiWarehousing () {

    useEffect (() =>  {
        // $('.readMore-button').off('click').on('click', function () {
        //     $('.readMore-button').toggleClass('rotate');
        //     $('.moretext').slideToggle();
        //     if ($(this).text() == "Read more") {
        //         $(this).text("Read less");
        //     } else {
        //         $(this).text("Read more");
        //     }
        // });
        
    })
    return (
        <>
        <div className="multiwarehouse section-padd-LR overflow">
            <div className="main-container width-1200 black built-to-suit-container1 multiwar-cont1">     
                <div className='row built-row'>
                    
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text blue'>Choose MRS Supply Chain for Your Warehousing Needs</h2>                      
                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">MRS Supply Chain is your ideal partner for navigating the intricacies of free trade warehousing. Our facilities in Kandla, Mundra, and Nava Sheva are tailored to enhance your operational efficiency and support your global trading activities. By choosing us, you're not just selecting a warehousing service; you're opting for a strategic partner in your growth and expansion in international trade.</p>                        

                        {/* <div className='moretext'>
                            <p>At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours.</p>                         
                        </div>
                        <a className="readMore-button" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a> */}
                        
                    </div> 

                    <div className='clm-2 built-img-clm'>
                        <img src={WarehousingNeeds} alt='WarehousingNeeds' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                    </div>                   
                </div>                
            </div>
        </div>

        {/* <div className="inPlant-sec2 section-padd-LR overflow">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt advtg-txt blue js-split-text'>Advantages of Multi-user Warehousing:</h3>
                <img className='built-line-img' src={GreyLine} alt="GreyLine" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"/>     

                <div className='advant-containr'>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400" >
                        <img src={VersatileStorage} alt='VersatileStorage' />
                        <h4>Versatile Storage Solutions</h4>
                        <p>Whether you require short-term, medium-term, or long-term storage, our Multi-user Warehousing accommodates your unique needs.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <img src={VersatileStorage} alt='VersatileStorage' />
                        <h4>Versatile Storage Solutions</h4>
                        <p>Whether you require short-term, medium-term, or long-term storage, our Multi-user Warehousing accommodates your unique needs.</p>
                    </div>
                    <div className='advan-bx' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <img src={VersatileStorage} alt='VersatileStorage' />
                        <h4>Versatile Storage Solutions</h4>
                        <p>Whether you require short-term, medium-term, or long-term storage, our Multi-user Warehousing accommodates your unique needs.</p>
                    </div>
                </div>   
                <p className='mob-mrgin-btm-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1200">Choose MRS multi-user warehousing to unlock a world of efficiency, flexibility, and cost-effectiveness for your supply chain. Experience shared success in warehousing that adapts to your every requirement.</p>      
            </div>
        </div> */}
                
            
        </>
    )
}
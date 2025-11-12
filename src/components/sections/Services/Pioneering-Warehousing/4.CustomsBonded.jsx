import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import CustomsBonded from '../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'
import ftwzServices from '../../../../assets/img/services_img/Poineering/ftwzServices.jpg'



export default function customBonded () {

    useEffect (() =>  {
        $('.cstm-bondReadMore').off('click').on('click', function () {
            $('.cstm-bondReadMore').toggleClass('rotate');
            $('.bond-moretext').slideToggle();
            if ($(this).text() == "Read more") {
                $(this).text("Read less");
            } else {
                $(this).text("Read more");
            }
        });

        $('.accordion-list > li > .answer').hide();
    
        $('.accordion-list > li').off('click').on('click', function () {
            if ($(this).hasClass("active")) {
            $(this).removeClass("active").find(".answer").slideUp();
            } else {
            $(".accordion-list > li.active .answer").slideUp();
            $(".accordion-list > li.active").removeClass("active");
            $(this).addClass("active").find(".answer").slideDown();
            }
            return false;
        });
        
    })
    return (
        <>
        {/* <div className="custom-bonded-sec section-padd-LR overflow">
            <div className="main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1">     
                <div className='row built-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={CustomsBonded} alt='CustomsBonded' />
                    </div>
                    <div className='clm-2 built-cntnt-clm white'>   
                        <h2 className='ttl-45px js-split-text'>Customs Bonded Warehousing</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500">When it comes to MRS Customs Bonded Warehousing, it's not merely a solution; it's a strategic advantage meticulously designed to benefit businesses like yours. Backed by an illustrious history of being the go-to partner for numerous corporate giants in Gujarat, MRS embodies unmatched proficiency in end-to-end supply chain management. </p>                        

                        <div className='bond-moretext'>
                            <p>At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours.</p>                         
                        </div>
                        <a className="cstm-bondReadMore white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a>
                        
                    </div>                    
                </div>                
            </div>
        </div> */}

        <div className="custom-bonded-sec2 accordin-sec section-padd-LR overflow">
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h2 className='ttl-45px white js-split-text'>Why Opt for MRS Supply Chain’s FTWZ Services?</h2>
                {/* <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"/> */}

                <div className='row built-row paddng-top' id='pinonr-accrd-rw'>
                    <div className='clm-2 built-img-clm'>
                        <img src={ftwzServices} alt='ftwzServices' className='accordn-img' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"/>
                    </div>

                    <div className='clm-2'>   
                    <ul className="accordion-list white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <li>
                            <h3>Duty Deferral:</h3>
                            <div className="answer">
                                <p>Maintain inventory in the FTZ without being subject to customs duties or taxes, facilitating efficient storage and distribution.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Inventory Management: </h3>
                            <div className="answer">
                                <p>Enjoy the advantages of storing goods with zero duty and tax implications, optimising cash flow and reducing transit times for shipping.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Streamlined Customs Procedures: </h3>
                            <div className="answer">
                                <p>Benefit from simplified customs procedures within the FTZ, minimizing paperwork and accelerating clearance times for imported goods.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Strategic Partnerships: </h3>
                            <div className="answer">
                                <p>MRS Supply Chain has established strategic partnerships with government agencies, customs authorities, and industry associations in FTWZ jurisdictions. These partnerships enable businesses to stay abreast of regulatory changes, access preferential treatment, and leverage additional resources to optimize their FTWZ operations.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Transparent Pricing Structure: </h3>
                            <div className="answer">
                                <p>MRS Supply Chain offers transparent pricing structures and competitive rates for their FTWZ solutions. With no hidden fees or unexpected charges, businesses can accurately forecast costs and budget effectively for their FTWZ operations.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Access to Major Ports: </h3>
                            <div className="answer">
                                <p>Kandla, Mundra, and Nhava Sheva boast some of the largest and busiest ports in India, handling a significant portion of the country's maritime trade. MRS Supply Chain's FTWZ facilities capitalize on this strategic advantage, providing seamless integration with port operations for efficient cargo handling and logistics management</p>
                            </div>
                        </li>
                        
                    </ul>
                    </div>

                    
                </div>     

                 
                {/* <p className='white mob-mrgin-btm-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">At MRS, we don't just provide warehousing; we offer a competitive edge. Choose MRS Customs Bonded Warehousing to streamline your supply chain, reduce costs, and ensure compliance. With us, your goods are secure, your operations remain undisrupted, and your compliance is assured. It's not just a solution; it's a partnership in your success. </p>       */}
            </div>
        </div>
                
            
        </>
    )
}
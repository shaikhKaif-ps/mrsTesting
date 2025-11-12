import React, { useEffect } from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import MultiuserWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg'
import GreyLine from '../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg'
import VersatileStorage from '../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg'
import CustomsBonded from '../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'
import Inplant from '../../../../assets/img/services_img/MultiuserWarehousing/In-Plant.jpg'


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
        <div className="custom-bonded-sec section-padd-LR overflow" id='customs'>
            <div className="main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1">     
                <div className='row built-row'>
                    <div className='clm-2 built-img-clm'>
                        <img src={CustomsBonded} alt='CustomsBonded' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500"/>
                    </div>
                    <div className='clm-2 built-cntnt-clm white'>   
                        <h2 className='ttl-45px js-split-text'>Customs Bonded Warehousing</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500">When it comes to MRS Customs Bonded Warehousing, it's not merely a solution; it's a strategic advantage meticulously designed to benefit businesses like yours. Backed by an illustrious history of being the go-to partner for numerous corporate giants in Gujarat, MRS embodies unmatched proficiency in end-to-end supply chain management. </p>                        

                        <div className='bond-moretext'>
                            <p>Our expansive network encompasses ten strategically positioned warehouses in close proximity to pivotal sea ports such as Hazira, Kandla, and Mundra. Additionally, we proudly operate a Free Trade Warehousing Zone in Mundra, delivering an extensive warehousing expanse totalling 5 Lakh Sq Ft. MRS Customs Bonded Warehousing is your key to a fortified supply chain, where customs compliance seamlessly aligns with secure storage, ensuring the utmost efficiency for your business.</p>                         
                        </div>
                        <a className="cstm-bondReadMore white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a>
                        
                    </div>                    
                </div>                
            </div>
        </div>

        <div className="custom-bonded-sec2 section-padd-LR overflow" >
            <div className="main-container width-1200 black built-to-suit-container1">     
                <h3 className='we-offer-txt bond-txt white js-split-text'>Advantages of MRS Customs Bonded Warehousing:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"/>

                <div className='row built-row' id='multi-usr-advnt-rw'>
                    <div className='clm-2'>   
                    <ul className="accordion-list white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <li>
                            <h3>Seamless Goods Handling</h3>
                            <div className="answer">
                                <p>Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Cost Efficiency</h3>
                            <div className="answer">
                                <p>By choosing MRS Customs Bonded Warehousing, you can enjoy cost-effective storage solutions (eliminating the need for separate ISO container rentals).</p>
                            </div>
                        </li>
                        <li>
                            <h3>Tax Benefits</h3>
                            <div className="answer">
                                <p>Your goods remain tax-free until they are ready for sale or shipment, saving you money and providing ample time to complete necessary import formalities.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Safety and Compliance</h3>
                            <div className="answer">
                                <p>For restricted and hazardous goods, our warehouses offer a secure environment for proper documentation and storage, ensuring compliance and safety for all.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Strategic Advantage</h3>
                            <div className="answer">
                                <p>Our extensive experience and commitment to continuous improvement projects mean that your goods are in expert hands, fostering long-lasting and mutually beneficial relationships.</p>
                            </div>
                        </li>
                        <li>
                            <h3>Legal Documentation</h3>
                            <div className="answer">
                                <p>We handle the paperwork for restricted goods, ensuring that you meet all legal requirements. Our Customs Bonded Warehouses allow for proper documentation and storage for up to — years.</p>
                            </div>
                        </li>
                        
                    </ul>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={Inplant} alt='Inplant' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"/>
                    </div>
                </div>     

                 
                <p className='white mob-mrgin-btm-o' id='multi-usr-advnt-para' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">At MRS, we don't just provide warehousing; we offer a competitive edge. Choose MRS Customs Bonded Warehousing to streamline your supply chain, reduce costs, and ensure compliance. With us, your goods are secure, your operations remain undisrupted, and your compliance is assured. It's not just a solution; it's a partnership in your success. </p>      
            </div>
        </div>
                
            
        </>
    )
}
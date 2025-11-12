import React from 'react';
import { useEffect } from 'react';
import Team1 from '../../../assets/img/about_img/team1.png'
import Linkdien from '../../../assets/img/about_img/linkdien.svg'
import TeamArrow from '../../../assets/img/about_img/TeamArrow.svg'
import WarehousingNeeds from '../../../assets/img/about_img/Expert Team.png'

export default function aboutTeam () {

    useEffect(() => {

        $(document).ready(function() {
            var $imgGallery = $(".team-container1");
            var originalHeight = $imgGallery.height(); // Store the original height
            
            $('.see-all').on('click', function () {
                $imgGallery.stop().animate({
                    maxHeight: $imgGallery.height() === originalHeight ? $imgGallery[0].scrollHeight : originalHeight
                }, 500, function() {
                    $('.team-arrow').toggleClass('rotate');
                    // console.log("rotate class toggled");

                    if($('.for-opacity').hasClass('opacity-30')){
                        $('.for-opacity').removeClass('opacity-30')
                     }else{
                       $('.for-opacity').toggleClass('opacity-30')
                     }
                });
            });
        });
        
        

    })

    return (
        <>
            <div className="team-section section-padd-LR overflow">
                <div className="main-container width-1250 black team-container1">
                    <h2 className='team-ttl js-split-text'>MRS Team, Driven by Expertise and Customer Commitment</h2>

                        <div className='row'>
                            <div className='clm1'>
                                <img src={Team1} alt='team1' data-aos="fade-in" data-aos-duration="500" data-aos-delay="800" data-aos-once="true"/>
                            </div>
                            <div className='clm2'>
                                <h2 className='foundr-name' data-aos="fade-in" data-aos-duration="600" data-aos-delay="800" data-aos-once="true">Rajiv Safaya</h2>
                                <h3 className='position orange' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">Co-founder & CEO</h3>
                                <p className='abt-foundr' data-aos="fade-in" data-aos-duration="500" data-aos-delay="900" data-aos-once="true">CA Rajiv Safaya, the visionary founder of MRS Supply Chain, brings 18 years of rich experience in managing corporate clients to the forefront of logistics and supply chain management. With an in-depth understanding of the complexities of Exim Trade and the challenges stakeholders encounter, he has strategically assembled a team of seasoned professionals. Guided by his foresight, MRS Supply Chain has expanded its reach beyond India, establishing a strong presence in international markets including Dubai, Singapore, and the USA, to better serve our global clientele.</p>
                            </div>
                        </div>

                        <div className='row built-row abt-team-clm'>                                    
                                    <div className='clm-2 built-cntnt-clm abt-team'>   
                                        <h2 className='blue' data-aos="fade-in" data-aos-duration="500" data-aos-delay="700" data-aos-once="true">Expert Team, Tailored Solutions: Navigating Logistics with Precision and Commitment</h2>                      
                                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">Our team, composed of dynamic logistics professionals, is adept in navigating the intricate landscape of Customs Law, Export & Import Processes, SEZ Rules, Bonded Warehousing Compliance, and other related regulations, ensuring seamless Supply Chain Management. </p> 

                                        <p data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="700">At our core, each team member possesses a profound understanding of our client's unique needs, driven by an unwavering commitment to exceed expectations and deliver unparalleled satisfaction. Our growth trajectory is a testament to our deep-seated dedication to our clients and the trust fostered with our partners, marking our journey with consistent progress fueled by mutual respect and commitment.</p>                        

                                        {/* <div className='moretext'>
                                            <p>At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours.</p>                         
                                        </div>
                                        <a className="readMore-button" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Read more</a> */}
                                        
                                    </div> 

                                    <div className='clm-2 built-img-clm'>
                                        <img src={WarehousingNeeds} alt='WarehousingNeeds' data-aos="fade-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="400"/>
                                    </div>                   
                                </div> 

                    <div className='team-container'>
                        {/* <div className='team-bx'>
                            <img src={Team1} alt='team1' />
                            <h4 className='tPosition'>Co-founder & CEO</h4>
                            <div className='flex name-bx'>
                                <h3 className='tNAme'>Kalmesh Gupta</h3>
                                <img src={Linkdien} alt='Linkdien' />
                            </div>                            
                        </div>
                        <div className='team-bx'>
                            <img src={Team1} alt='team1' />
                            <h4 className='tPosition'>Co-founder & CEO</h4>
                            <div className='flex name-bx'>
                                <h3 className='tNAme'>Kalmesh Gupta</h3>
                                <img src={Linkdien} alt='Linkdien' />
                            </div>                            
                        </div>
                        <div className='team-bx'>
                            <img src={Team1} alt='team1' />
                            <h4 className='tPosition'>Co-founder & CEO</h4>
                            <div className='flex name-bx'>
                                <h3 className='tNAme'>Kalmesh Gupta</h3>
                                <img src={Linkdien} alt='Linkdien' />
                            </div>                            
                        </div>
                        <div className='team-bx'>
                            <img src={Team1} alt='team1' />
                            <h4 className='tPosition'>Co-founder & CEO</h4>
                            <div className='flex name-bx'>
                                <h3 className='tNAme'>Kalmesh Gupta</h3>
                                <img src={Linkdien} alt='Linkdien' />
                            </div>                            
                        </div> */}

                        
                        
                    </div>                    
                </div>
            </div>
        </>
    )
}
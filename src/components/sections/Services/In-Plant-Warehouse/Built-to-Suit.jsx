import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import BuiltWarehousing from '../../../../assets/img/services_img/MultiuserWarehousing/BuiltWarehousing.jpg'
import Line from '../../../../assets/img/home_img/Line.svg'


export default function InPlantmultiUserAbout () {
    return (
        <>
        <div className="built-to-suit-sec section-padd-LR overflow" id='built'>
            <div className="main-container width-1200 built-to-suit-container1 white">     
                <div className='row built-row'>
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>Built to Suit Warehousing</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">We recognize that one size does not fit all when it comes to warehousing solutions. That's where MRS Built-to-Suit Warehousing comes into play, offering numerous advantages for businesses seeking a truly customised and strategic warehousing approach.</p>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={BuiltWarehousing} alt='BuiltWarehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900"/>
                    </div>
                </div>

                <h3 className='we-offer-txt js-split-text'>At MRS, we offer a cutting-edge solution with your business in mind:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900"/>
                <div>
                    <ul className='built-ul'>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="500">
                        <h3>Tailored to Your Needs</h3>
                        <p>Our Built-to-Suit Warehousing goes beyond standard offerings. We work closely with you to create a customised space that precisely aligns with your requirements. You specify your needs, we collaborate on the design, and once agreed upon, construction begins.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <h3>Future-Ready Infrastructure</h3>
                        <p>With technology advancements and evolving business demands, outdated and undersized facilities can hinder your operations. Our Built-to-Suit Warehousing ensures your facility is equipped with the latest technology and infrastructure, setting you up for long-term success.</p>
                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <h3>Tenant Commitment</h3>
                        <p>With a pre-leased agreement, you have the assurance of tenancy even before construction begins. This not only provides financial security but also peace of mind, knowing your space is reserved for your specific needs.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <h3>Cost-Efficiency</h3>
                        <p>By eliminating the need for development expertise and minimising capital requirements, you can redirect your savings towards your core business operations, enhancing your overall efficiency.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <h3>Adapt to Industry Trends</h3>
                        <p>In an era of increasing consolidation within the warehousing industry, our Built-to-Suit Warehousing solutions accommodate the growing demand for larger and more advanced spaces.</p>

                    </li>
                    </ul>

                    <p className='margin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">At MRS, we understand that your warehousing needs are unique. Our Built-to-Suit Warehousing is your key to a tailored, future-proof facility that not only meets but exceeds your expectations. </p>
                </div>
                
            </div>
        </div>
                
            
        </>
    )
}
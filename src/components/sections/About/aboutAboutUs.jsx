import React from 'react';
import AboutUs from '../../../assets/img/about_img/about_us.png'

export default function aboutAboutUs () {
    return (
        <>
        <div className="abt_us-section section-padd-LR overflow abt-sec2">
            <div className="main-container width-1250 black">
                <h2 className='ttl-45px abt-ttl' data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-delay="1200">MRS Group: Pioneering Progress, Inspiring Futures</h2>
                <div className='row'>
                    <div className='clm-2 contnt-clm'>
                        <h3 className='grey' data-aos="fade-in" data-aos-delay="400" data-aos-once="true">We are a leading integrated logistics service provider in India, established in 2016 as a shipping and customs brokerage company.</h3>
                        <p data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="800">Originating from humble beginnings in the heart of Kutch, Gujarat, we are now headquartered in Bangalore, with branches across the nation, offering comprehensive solutions for supply chain management. Our range of services encompasses various aspects of the supply chain, from international freight forwarding to project logistics, customs brokerage, air freight transhipment centres, free trade warehousing, customs bonded warehousing, contract logistics, and 4PL services. With MRS Group, the entire realm of logistics and distribution is made accessible with our infrastructure backed by technology and a presence in over 7 locations nationwide.</p>
                        <p data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="600">With a team of over 50 employees and a solid financial foundation, MRS Group has diversified into an international standard industrial infrastructure company, offering industrial parks and build-to-suit model infrastructure of Grade A quality. Recognising the growing demand for integrated services and cross-border trade, MRS Group  now provides comprehensive solutions under one roof. </p>
                    </div>
                    <div className='clm-2 img-clm'>
                        <img src={AboutUs} alt='AboutUs' data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="800"/>
                    </div>
                </div>
            </div>
            {/* <div className="main-container width-1100 multiuser-container2 road-abt-contnr2">  
                        <div className="user-numbers-sec" data-aos="fade-in" data-aos-duration="800" data-aos-delay="800" data-aos-once="true" >
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="0" data-aos-once="true">                                
                                <h4 className="numbers blue"> 41%</h4>                                                            
                                <p className="grey user-numbers-desc">Dolor sit amet, consectetur adipisci elit</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="300" data-aos-once="true">                                
                                <h4 className="numbers blue">83%</h4>                                                               
                                <p className="grey user-numbers-desc">Dolor sit amet, consectetur adipisci elit</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="500" data-aos-once="true">
                                <h4 className="numbers blue">67%</h4>                                                                 
                                <p className="grey user-numbers-desc">Dolor sit amet, consectetur adipisci elit</p>                                
                            </div>
                        </div>        
            </div> */}
        </div>
                
            
        </>
    )
}
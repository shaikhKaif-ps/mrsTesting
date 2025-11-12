import React, { useEffect, useRef } from 'react';
import '../../../assets/css/home.css';
import Solu_Supply_Chain from '../../../assets/img/home_img/Solu_Supply_Chain01.png'
import Logistics_and_Industrial from '../../../assets/img/home_img/Logistics_and_Industrial.jpg'
import Compliance_and_Documentation from '../../../assets/img/home_img/Compliance_and_Documentation.jpg'


export default function test() {

  useEffect(() => {
    
  
  })

  return (
    <>
      <div className='main-stck-sec'>
          <div className="container">
            <div className="sticky-section width-1200 section-padd-LR">
            <div className="solu-clm-3 sticky-solution">
                    <div className="solu-img solu-img1">
                      <img className='' src={Solu_Supply_Chain} alt="Solu_Supply_Chain" data-aos="fade-up" data-aos-duration="900" data-aos-once="true"/>
                    </div>
                    <p className="solu-numbers" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">01</p>
                    <div className="solu-content">
                      <div className="ovrflw-hdn">
                        <h2 className="white ttl-45px js-split-text">End-to-End Supply Chain<br />Management</h2>
                      </div>
                      <ul className="white solution-ul">
                        <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"><a href='/services/multiuser-warehousing'>Warehousing Solutions</a></li>
                        <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"><a href='/services/pioneering-duty-free-warehousing-solutions'>Free Trade Zone, Mundra SEZ</a></li>
                        <li data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="900"><a href='/services/road-and-rail-transport'>Surface & Rail Transport</a></li>
                      </ul>
                    </div>
                  </div>
            </div>
            <div className="sticky-section width-1200 section-padd-LR">
            <div className="solu-clm-3">
                    <div className="solu-img solu-img2">                      
                      <img className="" src={Compliance_and_Documentation} alt="Compliance_and_Documentation" data-aos="fade-up" data-aos-duration="1100" data-aos-once="true"/>
                    </div>
                    <p className="solu-numbers" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">02</p>
                    <div className="solu-content">
                    <div className="ovrflw-hdn">
                      <h2 className="white ttl-45px js-split-text">Regulatory Compliance <br />and Documentation </h2>
                    </div>
                      <ul className="white solution-ul">
                        <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"><a href='/services/customs-brokerage-and-regulatory-compliance'>Customs Brokerage</a></li>
                        <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"><a href='/services/customs-brokerage-and-regulatory-compliance#foreign'>Customs & Foreign Trade Compliance</a></li>
                        {/* <li data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="900">Surface & Rail Transport</li> */}
                      </ul>
                    </div>
                  </div>
            </div>
            <div className="sticky-section width-1200 section-three section-padd-LR">
            <div className="solu-clm-3">
                    <div className="solu-img solu-img3">
                    <img className="" src={Logistics_and_Industrial} alt="Logistics_and_Industrial" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"/>
                    </div>
                    <p className="solu-numbers" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">03</p>
                    <div className="solu-content">
                      <div className="ovrflw-hdn">
                        <h2 className="white ttl-45px js-split-text">Innovative Logistics and <br />Industrial Solutions</h2>
                      </div>
                      <ul className="white solution-ul">
                        <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"><a href='/services/tech-driven-last-mile-delivery-services'>Tech-Driven Last-Mile Delivery</a></li>
                        {/* <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800"><a href='#'>Industrial Park & Bespoke Solutions</a></li> */}
                        {/* <li data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="900">Surface & Rail Transport</li> */}
                      </ul>
                    </div>
                  </div>
            </div>
          </div>
      </div>
    </>
  );
}
import React, { useEffect } from "react";
import '../../../assets/css/home.css';
import Home_about from '../../../assets/img/home_img/Home_about.png'
import Home_about1 from '../../../assets/img/home_img/Home_about1.webp'
import blue_Arrow from '../../../assets/img/home_img/blue_Arrow.svg'
import Clients_icon from '../../../assets/img/home_img/Clients_icon.svg'
import MT_Cargo_icon from '../../../assets/img/home_img/MT_Cargo_icon.svg'
import TEUs_icon from '../../../assets/img/home_img/TEUs_icon.svg'
import Grey_Line from '../../../assets/img/line_img/Grey_Line.svg'

export default function HomeAbout() {

    useEffect (() => {

    })

    return (
        <>
            <div className="section section-padd-LR hm-abt-sec">
                <div className="main-container width-1100 flex" data-aos="fade-in" data-aos-duration="500" data-aos-once="true">                
                    <div className="clm-2">
                        <p className="grey uppercase normalidad-wide" data-aos="fade-up" data-aos-duration="500" data-aos-once="true">about US</p>
                        {/* <h2 className="ttl-60px txt">All Supply</h2>
                        <h2 className="ttl-60px black txt">Chains are Not</h2>
                        <h2 className="ttl-60px black txt">Created Equal</h2> */}
                        {/* <div className="ovrflw-hdn">                        
                            <h2 className="ttl-60px black animte">All Supply</h2>
                        </div>    
                        <div className="ovrflw-hdn">
                            <h2 className="ttl-60px black animte delay-5s">Chains are Not</h2>
                        </div> 
                        <div className="ovrflw-hdn">
                            <h2 className="ttl-60px black animte delay-7s">Created Equal</h2>                            
                        </div>  
                                                                   */}
                        <h2 className="js-split-text ttl-60px txt black">All Supply <br />Chains are Not <br />Created Equal </h2>

                        <img src={Home_about1} alt="Home about" data-aos="zoom-in" data-aos-duration="1000" data-aos-once="true" className="hm-abt-img"/>
                    </div>

                    <div className="clm-2">                        
                        <p className="black abt-para" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true" data-aos-delay="400">Welcome to MRS Group, your gateway to advanced logistics solutions since 2016. Based in Bangalore and rooted in Kutch, Gujarat, we specialise in a wide array of services including freight forwarding, warehousing, and comprehensive supply chain management. With a robust presence across 7 Indian locations, our dedicated team leverages state-of-the-art infrastructure to transform logistical challenges into successes, propelling your business into a future of endless possibilities.</p> 

                        {/* <button className="blue hm-abt-btn" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="0">Learn more about MRS Offerings <img src={blue_Arrow} alt="Arrow" /> </button> */}
                        
                        <a href="/about" className="blue hm-abt-btn btn" id="btn-styl" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="0"><span className="btn_name">Learn more about MRS Supply Chain </span><img src={blue_Arrow} alt="Arrow" /> </a>      

                        <div className="numbers-sec">
                            <div className="numbers-dv" data-aos="fade-in" data-aos-delay="900" data-aos-once="true">                                
                                <h4 className="numbers blue"> 1.5K+</h4>                                                            
                                <p className="grey numbers-desc">Total no. of <br />Clients Served</p>
                                <div className="img-bx"><img src={Clients_icon} alt="Clients_icon" /></div>
                            </div>
                            <img src={Grey_Line} alt="Grey_Line" className="numbr-line" data-aos="fade-in" data-aos-duration="950" data-aos-once="true" data-aos-delay="400"/>
                            <div className="numbers-dv" data-aos="fade-in" data-aos-delay="1000" data-aos-once="true">                                
                                <h4 className="numbers blue">18K+</h4>                                                               
                                <p className="grey numbers-desc">Total no. of <br />MT Cargo Handled</p>
                                <div className="img-bx"><img src={MT_Cargo_icon} alt="MT_Cargo_icon" /></div>
                            </div>
                            <img src={Grey_Line} alt="Grey_Line" className="numbr-line" data-aos="fade-in" data-aos-duration="1050" data-aos-once="true" data-aos-delay="400"/>
                            <div className="numbers-dv" data-aos="fade-in" data-aos-delay="1100" data-aos-once="true">
                                <h4 className="numbers blue">2K+</h4>                                                                 
                                <p className="grey numbers-desc num-third-para">Total no. of <br />TEUs Handled of Import Cargo Handled Every Year</p>
                                <div className="img-bx"><img src={TEUs_icon} alt="TEUs_icon" /></div>
                            </div>
                            <img src={Grey_Line} alt="Grey_Line" className="numbr-line" data-aos="fade-in" data-aos-duration="1150" data-aos-once="true" data-aos-delay="400"/>
                        </div>
                    </div>
                </div>
            </div>
          
        </>
    )
    }   
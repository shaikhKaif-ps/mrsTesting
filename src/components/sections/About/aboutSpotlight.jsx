import React from "react";
import '../../../assets/css/about.css'
import About_MRS from '../../../assets/img/about_img/About_MRS_hdr.jpg'
import Line from '../../../assets/img/home_img/Line.svg'


export default function AboutSpotlight () {
    return (
        <>
        <div className="section inner-spotlight-sec section-padd-LR overflow abt-hdr-sec" >
            <div className="main-container width-1250 flex">
                <div className="inner-spot-clm-1">
                    <h1 className="white js-split-text">About MRS Group</h1>
                    <h2 className="sldr-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="600">Legacy Insights</h2>
                    <img src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000"/>
                    <p className="white" data-aos="fade-up" data-aos-duration="900" data-aos-once="true" data-aos-delay="1000">MRS Group, an emerging leader in integrated logistics.</p>

                    <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="1100">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>About Us</a>
                    </div>
                </div>                
            </div>
            <div className="inner-img-sec">                
                <div className="inner-spot-clm-2">
                    <img src={About_MRS} alt="supplyChainImage"  data-aos="fade-in" data-aos-duration="800" data-aos-once="true" data-aos-delay="600"/>
                </div>
            </div>

        </div>
        
        </>
    )
}
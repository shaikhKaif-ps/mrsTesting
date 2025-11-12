import React, { useEffect } from "react";
import '../../../assets/css/about.css' 
import '../../../assets/css/blog.css' 
import '../../../assets/css/Services/MultiuserWarehousing.css'
// import Line from '../../assets/img/home_img/Line.svg'
// import Warehousing_Solution from '../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg'

const safetyHdr = () => {

  useEffect (() => {
    
    })

  // const altText = featureImage.split('/').pop().replace(/\.[^/.]+$/, '');


  return (
    <>
      <div className="section inner-spotlight-sec section-padd-LR overflow blogarchive-sec" >
              <div className="main-container width-1250 flex">
                  <div className="inner-spot-clm-1">
                      <h1 className="js-split-text white">Safety Policy</h1>
                      <h2 className="sldr-sub-ttl blg-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400"></h2>
                      <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>Safety Policy</a>
                    </div>
                  </div>                
              </div>
              
      </div>
    </>
  );
};

export default safetyHdr;

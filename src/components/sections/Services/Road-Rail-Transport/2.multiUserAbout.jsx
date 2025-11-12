import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/RoadRailTransport.css'


export default function BuiltmultiUserAbout () {
    return (
        <>
        <div className="abt_us-section roadRailAbt-sec section-padd-LR overflow">
            <div className="main-container width-1200 black">
                <div className='services-hdng black roadRailAbt-hdngs' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1200">
                    {/* <h2 data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Rail Freight</h2> */}
                    <a href="/services/road-and-rail-transport#rail" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1250">Rail Freight</a>
                    <a href="/services/road-and-rail-transport#road" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1500">Road Transportation</a>

                    {/* <h2 className='blue' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">Road Transportation</h2> */}
                </div> 

                <h2 className='ttl-45px trusted-ttl js-split-text'>MRS Transport Solutions: Pioneering Combined Road and Rail Transport from Mundra Port to Northern India.</h2>      

                <p className='mob-mrgin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">At MRS, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India. This strategic integration of both transportation modes has significantly reduced costs by nearly 30%, providing our clients with an efficient, cost-effective, and tailored approach to their logistics needs.</p>        
            </div>
            <div className="main-container width-1250 multiuser-container2 road-abt-contnr2" id='no-pad-mob'>  
                <div>
                </div>    
                        <div className="user-numbers-sec" data-aos="fade-in" data-aos-delay="400" data-aos-once="true">
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="0" data-aos-once="true">                                
                                <h4 className="numbers blue"> 30%</h4>                                                            
                                <p className="grey user-numbers-desc">Cost Saving</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="300" data-aos-once="true">                                
                                <h4 className="numbers blue">100%</h4>                                                               
                                <p className="grey user-numbers-desc">Safe Delivery</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="500" data-aos-once="true">
                                <h4 className="numbers blue">50%</h4>                                                                 
                                <p className="grey user-numbers-desc">Less Greenhouse Gas Emission</p>                                
                            </div>
                        </div>        
            </div>
        </div>
                
            
        </>
    )
}
import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import '../../../../assets/css/Services/RoadRailTransport.css'


export default function About () {
    return (
        <>
        <div className="abt_us-section roadRailAbt-sec section-padd-LR overflow">
            <div className="main-container width-1200 black">
                <div className='services-hdng black roadRailAbt-hdngs custom-hdng' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1500">
                    <a href="/services/customs-brokerage-and-regulatory-compliance#customs" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1800">Customs<br />Brokerage Service</a>
                    <a href="/services/customs-brokerage-and-regulatory-compliance#foreign" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1900">Foreign <br />Trade Compliance</a>
                </div> 

                <h2 className='ttl-45px js-split-text'>Seamless Imports/Exports , Stress-Free Compliance: Trust us as your Customs House Agents</h2>     

                <div className='row'>
                    <div className='clm-2'>                        
                        <p className='mob-mrgin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain. Our dedicated services are designed to streamline these processes, making them more efficient and less cumbersome for businesses of all sizes. </p>
                    </div>

                    <div className='clm-2' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <p className='mob-mrgin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">By leveraging our expertise in various domains, such as 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR, and allied compliances, which require very specific expertise to make operations seamless, our team of experts helps you navigate the maze of international trade regulations and paperwork, ensuring your operations are compliant and efficient.</p>
                    </div>
                </div> 
            </div>
            <div className="main-container width-1250 multiuser-container2 road-abt-contnr2" id='no-pad-mob'>  
                <div>
                </div>    
                        <div className="user-numbers-sec custom-brkrgNumSec" data-aos="fade-in" data-aos-delay="400" data-aos-once="true">
                            <div className="user-numbers-dv">                                
                                <h4 className="numbers blue"> 1.5K+</h4>                                                            
                                <p className="grey user-numbers-desc">Total no. of Clients Served</p>                                
                            </div>
                            <div className="user-numbers-dv">                                
                                <h4 className="numbers blue">18K+</h4>                                                               
                                <p className="grey user-numbers-desc">Total no. of MT Cargo Handled</p>                                
                            </div>
                            <div className="user-numbers-dv">
                                <h4 className="numbers blue">2K+</h4>                                                                 
                                <p className="grey user-numbers-desc">Total no. of TEUs Handled of Import Cargo Handled Every Year</p>                                
                            </div>
                        </div>        
            </div>
        </div>
                
            
        </>
    )
}
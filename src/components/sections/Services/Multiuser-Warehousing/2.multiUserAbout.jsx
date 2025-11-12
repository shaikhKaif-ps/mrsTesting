import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'


export default function multiUserAbout () {
    return (
        <>
        <div className="abt_us-section section-padd-LR overflow">
            <div className="main-container width-1200 black multiuser-container1">
                <div className='services-hdng black' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="400">
                    {/* <h2 data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">Built to Suit<br />Warehousing</h2>
                    <h2 className='blue' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">Multiuser <br />Warehousing</h2>
                    <h2 data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">Customs Bonded <br />  Warehouse</h2>
                    <h2 data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">In-Plant Warehouse <br />Management</h2> */}

                    <a href="/services/multiuser-warehousing#built" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="600">Built to Suit<br />Warehousing</a>
                    <a href="/services/multiuser-warehousing#multiuser" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="700">Multiuser <br />Warehousing</a>
                    <a href="/services/multiuser-warehousing#customs" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="800">Customs Bonded <br />  Warehouse</a>
                    <a href="/services/multiuser-warehousing#plant" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="900">In-Plant Warehouse <br />Management</a>
                </div> 

                <h2 className='ttl-45px trusted-ttl js-split-text'>Your trusted partner in Gujarat for end-to-end supply chain needs.</h2>              

                <div className='row'>
                    <div className='clm-2'>                        
                        <p className='mob-mrgin-o' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence. With a strategic presence near key sea ports such as Hazira, Kandla, and Mundra, and the privilege of overseeing a Free Trade Warehousing Zone in Mundra, we offer a remarkable total warehousing space of 3.5 Lakh Sq Ft.</p>
                    </div>

                    <div className='clm-2' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <p className='mob-mrgin-btm-o'>Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management," we are more than just warehousing; we are your partner in optimising logistics, streamlining operations, and ensuring unmatched efficiency.</p>
                    </div>
                </div>
            </div>
            <div className="main-container width-1250 multiuser-container2" id='no-pad-mob'>  
                <div>
                </div>    
                        <div className="user-numbers-sec" data-aos="fade-in" data-aos-delay="400" data-aos-once="true">
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="0" data-aos-once="true">                                
                                <h4 className="numbers blue"> 14 <span className='num-ttl'>years</span></h4>                                                            
                                <p className="grey user-numbers-desc">Experience in 3PL and Warehousing Services.</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="300" data-aos-once="true">                                
                                <h4 className="numbers blue">07 <sapn className='num-ttl'>Lacs Sq ft</sapn></h4>                                                               
                                <p className="grey user-numbers-desc">Warehouses Leased Out for Food Grains and Bulk Cargo.</p>                                
                            </div>
                            <div className="user-numbers-dv" data-aos="fade-in" data-aos-delay="500" data-aos-once="true">
                                <h4 className="numbers blue">3.5 <sapn className='num-ttl'>Lacs</sapn></h4>                                                                 
                                <p className="grey user-numbers-desc">Grade A Warehousing Space in Kutch.</p>                                
                            </div>
                        </div>        
            </div>
        </div>
                
            
        </>
    )
}
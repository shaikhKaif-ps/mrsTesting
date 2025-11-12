import React from 'react';
import '../../../../assets/css/Services/MultiuserWarehousing.css'
import Inplant from '../../../../assets/img/services_img/MultiuserWarehousing/In-Plant.jpg'
import In_Plant_warehousing from '../../../../assets/img/services_img/MultiuserWarehousing/In-Plant_warehousing.jpg'
import Line from '../../../../assets/img/services_img/MultiuserWarehousing/black_Line.svg'


export default function ImportManageinPlant () {
    return (
        <>
        <div className="inPlant-sec section-padd-LR overflow" id='CaseStudies'>
            <div className="main-container width-1200 black built-to-suit-container1 inPlant-container">     
                <div className='row built-row'>
                    <div className='clm-2 built-cntnt-clm'>   
                        <h2 className='ttl-45px js-split-text'>Case Studies Success Stories</h2>                      
                        <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">Feature two or three short case studies that show how MRS has successfully managed imports for other companies. Focus on diverse industries to show versatility.</p>
                    </div>

                    <div className='clm-2 built-img-clm'>
                        <img src={In_Plant_warehousing} alt='In_Plant_warehousing' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"/>
                    </div>
                </div>

                <h3 className='we-offer-txt blue js-split-text'>Our services encompass:</h3>
                <img className='built-line-img' src={Line} alt="Line" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600"
/>
                <div>
                    <ul className='built-ul inplant-ul '>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="400">
                        <h3 className='blue'>Tailored Import Solutions</h3>
                        <p>We understand that every business has unique import requirements. Our team of experts customises import strategies to optimize your supply chain, reduce costs, and ensure the smooth flow of goods from international suppliers.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="600">
                        <h3>Advanced Compliance Management</h3>
                        <p>Utilising cutting-edge systems, we ensure all your imports comply with international trade laws and India’s regulations. Our real-time tracking provides visibility and control, reducing the risk of delays or penalties.</p>
                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">
                        <h3>Efficient Logistics Handling</h3>
                        <p>Our import management services cover every aspect of logistics, from port to destination. We coordinate, transport, and safely deliver your goods with precision and efficiency, reducing transit time and costs.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">
                        <h3>Seamless Integration with Operations</h3>
                        <p>Our import management integrates seamlessly with your existing processes, aligning shipments with your production or business schedules. This coordination minimises downtime and keeps your operations running smoothly.</p>

                    </li>
                    <li data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                        <h3>Scalable and Adaptable Support</h3>
                        <p>As your business grows, so do our services. Whether you’re scaling up operations or managing fluctuating demand, our import solutions adapt to your needs, ensuring uninterrupted supply chain operations.</p>

                    </li>
                    </ul>

                    <p className='' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="800">Partner with MRS for import management services designed to drive efficiency, compliance, and reliability at every step.</p>
                </div>
                
            </div>
        </div>
                
            
        </>
    )
}
import React, { useEffect } from "react";
import '../../../assets/css/home.css';
import '../../../assets/img/home_img/Home_about.png'
import warehousing_cont from '../../../assets/img/home_img/solutions/Warehousing_big.svg'
import trade_zone_bg from '../../../assets/img/home_img/solutions/trade_zone_big.svg'
import transport_big from '../../../assets/img/home_img/solutions/transport_big.svg'
import borker_big from '../../../assets/img/home_img/solutions/borker_big.svg'
import custom_trade_big from '../../../assets/img/home_img/solutions/custom_trade_big.svg'
import lastTech from '../../../assets/img/home_img/solutions/lastTech.svg'

import ship from '../../../assets/img/home_img/solutions/ship.svg'
import trade_zone from '../../../assets/img/home_img/solutions/trade_zone.svg'
import transport from '../../../assets/img/home_img/solutions/transport.svg'


export default function HomeSolution2() {
  useEffect(() => {

      $(document).ready(function(){
        $(".servc-link").click(function(){
            // Remove the 'active' class from all servc-links
            $(".servc-link").removeClass("active");
            // Add the 'active' class to the clicked servc-link
            $(this).addClass("active");
            
            var targetId = $(this).data("target");
            
            // Hide all content containers except the target one with fade-out effect
            $(".solution-contnt-clm > .srvc-cont").not("#" + targetId).fadeOut();
            
            // Fade in the target content container with fade-in effect
            $("#" + targetId).fadeIn();
        });
      });


      // Hide all answers initially
      $('.accordion-list > li > .answer').hide();

      // Event handler for h3 within list items
      $('.accordion-list > li > h3').off('click').on('click', function () {
          // Find the parent list item (li)
          const listItem = $(this).parent();
          
          // Toggle the active class and answer display
          if (listItem.hasClass("active")) {
              listItem.removeClass("active").find(".answer").slideUp();
          } else {
              $(".accordion-list > li.active .answer").slideUp();
              $(".accordion-list > li.active").removeClass("active");
              listItem.addClass("active").find(".answer").slideDown();
          }
          
          // Prevent default action (navigation) on the h3 click
          return false;
      });



  })

  return (
    <>
    
      <div className="section solution-sec section-padd-LR" id="solution"> 
        <div className="main-container width-1200">
            <div className="soltn-inner-container">
                <div className="clm-2 soltn-clm1">              
                    <h2 className="white js-split-text">Solutions <br />We Offer </h2>                             
                </div>
                <div className="clm-2 soltn-clm2">
                <div className="ovrflw-hdn">
                    <p className="" data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="400">Logistics solutions tailored to your business needs for seamless supply chain excellence.</p>
                </div>
                </div>
            </div>

            <div className="row hm-solutuon-sec2" id="solution-desk">
                <div className="clm-2 solution-box-clm">
                    <div className="solution-grid">                        
                        <div className="servc-link active" id="servc-link1" data-target="srvc-cont1" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={ship} alt="RailTransport" /> */}
                                <h2 className="sol-btn1">Warehousing</h2>                            
                        </div>

                        <div className="servc-link" id="servc-link2" data-target="srvc-cont2" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={trade_zone} alt="trade_zone" /> */}
                                <h2 className="sol-btn1">Free Trade Zone</h2>                            
                        </div>

                        <div className="servc-link" id="servc-link3" data-target="srvc-cont3" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={transport} alt="transport" /> */}
                                <h2 className="sol-btn1">Surface<br /> & Rail Transport </h2>                            
                        </div>  

                        <div className="servc-link" id="servc-link4" data-target="srvc-cont4" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={ship} alt="RailTransport" /> */}
                                <h2 className="sol-btn1">Customs<br /> Brokerage</h2>                            
                        </div>

                        <div className="servc-link" id="servc-link5" data-target="srvc-cont5" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={ship} alt="RailTransport" /> */}
                                <h2 className="sol-btn1">Customs and Foreign Trade Compliance</h2>                            
                        </div>


                        <div className="servc-link" id="servc-link6" data-target="srvc-cont6" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="">                             
                                {/* <img className='' src={ship} alt="RailTransport" /> */}
                                <h2 className="sol-btn1">Tech-Driven Last-Mile Delivery</h2>                            
                        </div>
                    </div>
                </div>

                <div className="clm-2 solution-contnt-clm">  

                    <div id="srvc-cont1" className="srvc-cont" data-aos="fade-in" data-aos-duration="400" data-aos-once="true" data-aos-delay="400">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={warehousing_cont} alt="warehousing_cont" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Warehousing</h3> 
                        <p className="white">Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management"</p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/multiuser-warehousing" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>

                    <div id="srvc-cont2" className="srvc-cont hidden">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={trade_zone_bg} alt="trade_zone" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Free Trade Zone</h3> 
                        <p className="white">At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence. </p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/pioneering-duty-free-warehousing-solutions" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>

                    <div id="srvc-cont3" className="srvc-cont hidden">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={transport_big} alt="transport_big.svg" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Surface & Rail Transport</h3> 
                        <p className="white">At MRS Transport Solutions, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India. </p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/road-and-rail-transport" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>

                    <div id="srvc-cont4" className="srvc-cont hidden">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={borker_big} alt="borker_big.svg" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Customs Brokerage</h3> 
                        <p className="white">In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain. </p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/customs-brokerage-and-regulatory-compliance" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>

                    <div id="srvc-cont5" className="srvc-cont hidden">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={custom_trade_big} alt="custom_trade_big" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Customs and Foreign Trade Compliance</h3> 
                        <p className="white">By leveraging our expertise in various domain like 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR and allied compliances which need very specific expertise to make operation seamless our team of experts help you navigate the maze of international trade regulations and paperwork.</p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/customs-brokerage-and-regulatory-compliance#foreign" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>

                    <div id="srvc-cont6" className="srvc-cont hidden">
                        <div className="hm-soln-contnr">
                        <div className="soln-img-bx">
                          <img src={lastTech} alt="lastTech" /> 
                        </div>
                        <div className="soln-cntn-bx">
                          <h3 className="white">Tech-Driven Last-Mile Delivery</h3> 
                        <p className="white">In today's fast-paced world, the efficiency of last-mile delivery is not just an option but a necessity. MRS Supply Chain is at the forefront of revolutionizing this critical segment with our cutting-edge, tech-driven last-mile delivery services.</p>  
                        <a className="btn white hm-spt-btn" id="btn-styl" href="/services/tech-driven-last-mile-delivery-services" ><span className="btn_name">Learn More</span></a>
                        </div> 
                      </div>                                          
                    </div>
                </div>
            </div>

            <div className='row built-row' id='solution-mob'>
                    <div>   
                      <ul className="accordion-list white" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">
                          <li>
                              <h3>Warehousing</h3>                              
                              <div className="answer">
                                  <img src={warehousing_cont} alt="warehousing_cont" />
                                  <p>Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management"</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/multiuser-warehousing" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          <li>
                              <h3>Free Trade Zone</h3>                              
                              <div className="answer">
                                  <img src={trade_zone_bg} alt="warehousing_cont" />
                                  <p>At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence.</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/pioneering-duty-free-warehousing-solutions" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          <li>
                              <h3>Surface & Rail Transport</h3>                              
                              <div className="answer">
                                  <img src={transport_big} alt="warehousing_cont" />
                                  <p>At MRS Transport Solutions, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India.</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/road-and-rail-transport" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          <li>
                              <h3>Customs Brokerage</h3>                              
                              <div className="answer">
                                  <img src={borker_big} alt="warehousing_cont" />
                                  <p>In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain.</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/customs-brokerage-and-regulatory-compliance" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          <li>
                              <h3>Customs and Foreign Trade Compliance</h3>                              
                              <div className="answer">
                                  <img src={custom_trade_big} alt="warehousing_cont" />
                                  <p>By leveraging our expertise in various domain like 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR and allied compliances which need very specific expertise to make operation seamless our team of experts help you navigate the maze of international trade regulations and paperwork.</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/customs-brokerage-and-regulatory-compliance#foreign" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          <li>
                              <h3>Tech-Driven Last-Mile Delivery</h3>                              
                              <div className="answer">
                                  <img src={lastTech} alt="warehousing_cont" />
                                  <p>In today's fast-paced world, the efficiency of last-mile delivery is not just an option but a necessity. MRS Supply Chain is at the forefront of revolutionizing this critical segment with our cutting-edge, tech-driven last-mile delivery services.</p>
                                  <a className="btn white hm-spt-btn" id="btn-styl" href="/services/tech-driven-last-mile-delivery-services" ><span className="btn_name">Learn More</span></a>
                              </div>
                          </li>
                          
                      </ul>
                    </div>
                </div>  
        </div>
      </div>
    </>
  );
}
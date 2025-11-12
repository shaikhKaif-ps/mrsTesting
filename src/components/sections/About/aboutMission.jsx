import React from "react";
import Line from '../../../assets/img/home_img/Line.svg'
import { useEffect } from 'react';

export default function aboutMissin () {

    useEffect(() => {

        // $(document).ready(function() {

        //     $('.vision').on('mouseenter', function ()  {
        //       $('.mission-section').addClass('bg1');
        //       $('.vision h2').addClass('txt-shadw');
        //       $('.mission h2').removeClass('txt-shadw');
        //       $('.value h2').removeClass('txt-shadw');
        //       $('.mission-section').removeClass('bg2 bg3');
        //       $('.vision p').addClass('current');
        //       $('.mission p').removeClass('current');
        //       $('.value p').removeClass('current');
        //     });

        //     $('.mission').on('mouseenter', function ()  {
        //         $('.mission-section').addClass('bg2');
        //         $('.mission h2').addClass('txt-shadw');
        //         $('.vision h2').removeClass('txt-shadw');
        //         $('.value h2').removeClass('txt-shadw');
        //         $('.mission-section').removeClass('bg1 bg3');
        //         $('.vision p').removeClass('current');
        //         $('.mission p').addClass('current');
        //         $('.value p').removeClass('current');
        //     });

        //     $('.value').on('mouseenter', function ()  {
        //         $('.mission-section').addClass('bg3');
        //         $('.value h2').addClass('txt-shadw');
        //         $('.vision h2').removeClass('txt-shadw');
        //         $('.mission h2').removeClass('txt-shadw');
        //         $('.mission-section').removeClass('bg1 bg2');
        //         $('.vision p').removeClass('current');
        //         $('.mission p').removeClass('current');
        //         $('.value p').addClass('current');
        //     });
              
        //   });

        

        $(document).ready(function() {

            $('.vision').on('mouseenter', function ()  {
                $('.background-image').removeClass('show');
                $('.bg1').addClass('show');
        
                // H2 and p classes for vision section
                $('.vision h2, .vision p').addClass('txt-shadw current');
                $('.mission h2, .value h2').removeClass('txt-shadw');
                $('.mission p, .value p').removeClass('current');
            });
        
            $('.mission').on('mouseenter', function ()  {
                $('.background-image').removeClass('show');
                $('.bg2').addClass('show');
        
                // H2 and p classes for mission section
                $('.mission h2, .mission p').addClass('txt-shadw current');
                $('.vision h2, .value h2').removeClass('txt-shadw');
                $('.vision p, .value p').removeClass('current');
            });
        
            $('.value').on('mouseenter', function ()  {
                $('.background-image').removeClass('show');
                $('.bg3').addClass('show');
        
                // H2 and p classes for value section
                $('.value h2, .value p').addClass('txt-shadw current');
                $('.vision h2, .mission h2').removeClass('txt-shadw');
                $('.vision p, .mission p').removeClass('current');
            });
        
        });  
      
    })


    return (
        <>
        {/* <div className="mission-section section-padd-LR overflow bg1" >
            <div className="main-container width-1150 black flex">
                <div className="width-30">
                </div>
                <div className="width-70">
                    <div className="flex VMV-bx vision" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true">
                        <h2 className="VMV-ttl txt-shadw">Vision</h2>
                        <p className="vision-para">To be amongst one of top Supply Chain & Industrial Infrastructure Company worldwide.</p>
                    </div>

                    <img src={Line} alt="Line" className="line-img" data-aos="fade-in" data-aos-duration="500" data-aos-delay="500" data-aos-once="true"/>

                    <div className="flex VMV-bx mission" data-aos="fade-in" data-aos-duration="500" data-aos-delay="600" data-aos-once="true">
                        <h2 className="VMV-ttl">Mission</h2>
                        <p className="mission-para">To build a robust network of Supply Chain & Industrial Infrastructure by adopting the technology and global standard.</p>
                    </div>

                    <img src={Line} alt="Line" className="line-img" data-aos="fade-in" data-aos-duration="500" data-aos-delay="700" data-aos-once="true"/>

                    <div className="flex VMV-bx value" data-aos="fade-in" data-aos-duration="500" data-aos-delay="800" data-aos-once="true">
                        <h2 className="VMV-ttl">Values</h2>
                        <p className="value-para">At MRS we believe delivering our commitments to our clients and stake holders by providing world class service of Logistics and Distribution by incorporating Global Standards of supply chain with local approach of execution of task.</p>
                        
                    </div>
                </div>
            </div>
        </div>           */}

                <div class="mission-section section-padd-LR overflow">
                        <div class="background-images">
                                <div class="background-image bg1 show"></div>
                                <div class="background-image bg2"></div>
                                <div class="background-image bg3"></div>
                        </div>
                        <div className="main-container width-1150 black flex">
                            <div className="width-30">
                            </div>
                            <div className="width-70">
                                    <div className="flex VMV-bx vision" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true">
                                        <h2 className="VMV-ttl txt-shadw">Vision</h2>
                                        <p className="vision-para current">To be amongst one of the top Supply Chain & Industrial Infrastructure Company worldwide.</p>
                                    </div>

                                    <img src={Line} alt="Line" className="line-img" data-aos="fade-in" data-aos-duration="500" data-aos-delay="500" data-aos-once="true"/>

                                    <div className="flex VMV-bx mission" data-aos="fade-in" data-aos-duration="500" data-aos-delay="600" data-aos-once="true">
                                        <h2 className="VMV-ttl">Mission</h2>
                                        <p className="mission-para">To build a robust network of Supply Chain & Industrial Infrastructure by adopting the technology and global standards.</p>
                                    </div>

                                    <img src={Line} alt="Line" className="line-img" data-aos="fade-in" data-aos-duration="500" data-aos-delay="700" data-aos-once="true"/>

                                    <div className="flex VMV-bx value" data-aos="fade-in" data-aos-duration="500" data-aos-delay="800" data-aos-once="true">
                                        <h2 className="VMV-ttl">Values</h2>
                                        <p className="value-para">At MRS, we believe in delivering our commitments to our clients and stakeholders by providing world-class logistics and distribution services and incorporating global supply chain standards with a local approach to executing tasks.</p>
                                        
                                    </div>
                            </div>
                        </div>
                </div>

        </>
    )
}
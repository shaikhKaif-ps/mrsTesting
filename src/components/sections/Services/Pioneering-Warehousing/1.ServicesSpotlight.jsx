import React, { useEffect } from "react";
import "../../../../assets/css/about.css";
import "../../../../assets/css/Services/MultiuserWarehousing.css";
import "../../../../assets/css/Services/pioneeringWarehousing.css";
import Line from "../../../../assets/img/home_img/Line.svg";
import Warehousing_Solution from "../../../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg";
import Pioneering_spot from "../../../../assets/img/services_img/Poineering/Pioneering_spot.jpg";

export default function CustomsServicesSpotlight() {
  useEffect(() => {});

  return (
    <>
      <div className="service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow freeTradeZone-hdr">
        <div className="main-container width-1250 flex">
          <div className="inner-spot-clm-1 servcs-spot-clm1">
            <h1 className="js-split-text white">
              Pioneering Duty-Free
              <br />
              Warehousing Solutions
            </h1>
            <h2
              className="sldr-sub-ttl"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="400"
            >
              Dependable. Streamlined.
            </h2>
            <img
              src={Line}
              alt="Line"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="800"
            />
            <p
              className="white"
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-once="true"
              data-aos-delay="500"
            >
              Empower Your Business with MRS Supply Chain's Free Trade Zone
              Service
            </p>

            <div
              className="btn inner-spt-btn white"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="600"
            >
              <a className="white-60" href="/">
                Home{" "}
              </a>
              {" > "}
              <a className="white-60">Services </a>
              {" > "}
              <a className="white-60">
                Customs Brokerage and Regulatory Compliance
              </a>
            </div>
            {/* <a className="btn inner-spt-btn white" href="#" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">Home {' > '} Services {' > '} Customs Brokerage and<br />Regulatory Compliance</a> */}
          </div>
        </div>
        <div className="inner-img-sec">
          <div className="inner-spot-clm-2">
            <img
              src={Pioneering_spot}
              alt="Pioneering_spot"
              className="lToR"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="600"
            />
          </div>
        </div>
      </div>
    </>
  );
}

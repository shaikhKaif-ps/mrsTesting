import React, { useEffect } from "react";
import "../../../../assets/css/Services/MultiuserWarehousing.css";
import MultiuserWarehousing from "../../../../assets/img/services_img/MultiuserWarehousing/Multiuser-Warehousing.jpg";
import GreyLine from "../../../../assets/img/services_img/MultiuserWarehousing/grey_Line.svg";
import VersatileStorage from "../../../../assets/img/services_img/MultiuserWarehousing/VersatileStorageSolutions.svg";
import CustomsBonded from "../../../../assets/img/services_img/MultiuserWarehousing/CustomsBonded.jpg";
import Line from "../../../../assets/img/home_img/Line.svg";
import Inplant from "../../../../assets/img/services_img/MultiuserWarehousing/In-Plant.jpg";

export default function ImportManageCustomsBonded() {
  useEffect(() => {
    $(".cstm-bondReadMore")
      .off("click")
      .on("click", function () {
        $(".cstm-bondReadMore").toggleClass("rotate");
        $(".bond-moretext").slideToggle();
        if ($(this).text() == "Read more") {
          $(this).text("Read less");
        } else {
          $(this).text("Read more");
        }
      });

    $(".accordion-list > li > .answer").hide();

    $(".accordion-list > li")
      .off("click")
      .on("click", function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active").find(".answer").slideUp();
        } else {
          $(".accordion-list > li.active .answer").slideUp();
          $(".accordion-list > li.active").removeClass("active");
          $(this).addClass("active").find(".answer").slideDown();
        }
        return false;
      });
  });
  return (
    <>
      <div
        className="custom-bonded-sec section-padd-LR overflow"
        id="BenefitsChoosingMRS"
      >
        <div className="main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1">
          <div className="row built-row">
            <div className="clm-2 built-img-clm">
              <img
                src={CustomsBonded}
                alt="CustomsBonded"
                data-aos="fade-in"
                data-aos-duration="500"
                data-aos-once="true"
                data-aos-delay="500"
              />
            </div>
            <div className="clm-2 built-cntnt-clm white">
              <h2 className="ttl-45px js-split-text">
                Benefits of Choosing MRS
              </h2>
              <p
                data-aos="fade-in"
                data-aos-duration="500"
                data-aos-once="true"
                data-aos-delay="500"
              >
                Choosing MRS means partnering with an import management expert
                who prioritises your business’s efficiency and compliance. Our
                clients enjoy
              </p>

              <div className="bond-moretext">
                <p>
                  Cost Savings: Reduced operational costs through optimised
                  import processes
                </p>{" "}
                <br />
                <p>
                  Time Efficiency: Faster turnaround times thanks to our
                  streamlined operations.
                </p>{" "}
                <br />
                <p>
                  Regulatory Compliance: Assurance of adherence to all import
                  regulations, avoiding costly penalties.
                </p>{" "}
                <br />
                <p>
                  Single Point of Contact: Simplified communication with a
                  dedicated manager for all your import needs.
                </p>{" "}
                <br />
              </div>
              <a
                className="cstm-bondReadMore white"
                data-aos="fade-in"
                data-aos-duration="500"
                data-aos-once="true"
                data-aos-delay="600"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

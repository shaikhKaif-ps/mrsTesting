import React from "react";
import { useEffect } from "react";
import MRS_Logo from "../../assets/img/header_img/MRS-Logo.svg";
import Sub_menu from "../../assets/img/line_img/Sub_Menu_icon.svg";
import Close_icon from "../../assets/img/close_icon.svg";
import $ from "jquery";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Header() {
  const form_popup = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const nameinput_popup = React.useRef(null);
  const emailinput_popup = React.useRef(null);

  // const orginput = React.useRef(null);
  const phoneinput_popup = React.useRef(null);

  const departinput_popup = React.useRef(null);
  const msginput_popup = React.useRef(null);

  // All field validation error hide code
  const handleFocus_pp = (e) => {
    e.target.classList.remove("error_line");

    let er11 = document.getElementById("nm_errP");
    er11.classList.remove("show_error");

    let er11v = document.getElementById("nm_errP1");
    er11v.classList.remove("show_error");

    let er22 = document.getElementById("eml_errP");
    er22.classList.remove("show_error");

    let er22v = document.getElementById("eml_errP1");
    er22v.classList.remove("show_error");

    let er33 = document.getElementById("cmp_errP");
    er33.classList.remove("show_error");

    let er55 = document.getElementById("depart_errP");
    er55.classList.remove("show_error");

    let er66 = document.getElementById("msg_errP");
    er66.classList.remove("show_error");

    let er66v = document.getElementById("msg_errP1");
    er66v.classList.remove("show_error");
  };

  // Phone field validation error hide code
  const handleFocus_pp1 = (e) => {
    e.target.classList.remove("error_line");

    let er44 = document.getElementById("phn_errP");
    er44.classList.remove("show_error");

    let er44v = document.getElementById("phn_errP1");
    er44v.classList.remove("show_error");
  };

  // Form action code
  const sendEmail1 = async (e) => {
    e.preventDefault();

    // Fields get value Code
    let name_fld_popup = nameinput_popup.current.value;
    let email_fld_popup = emailinput_popup.current.value;

    // let org_fld = (orginput.current.value);
    let phone_fld_popup = phoneinput_popup.current.value;

    let dprt_fld_popup = departinput_popup.current.value;

    // let msg_fld_popup = (msginput_popup.current.value);

    // Phone Regex Code
    let phone_fltr = document.getElementById("phone_fld_popup");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;

    // Fields validation Code
    if (name_fld_popup == "") {
      let v1 = document.getElementById("name_fld_popup");
      v1.className += " error_line";

      let er11 = document.getElementById("nm_errP");
      er11.className += " show_error";
    } else if (!name_fld_popup.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld_popup");
      v1.className += " error_line";

      let er11v = document.getElementById("nm_errP1");
      er11v.className += " show_error";
    } else if (email_fld_popup == "") {
      let v2 = document.getElementById("email_fld_popup");
      v2.className += " error_line";

      let er22 = document.getElementById("eml_errP");
      er22.className += " show_error";
    } else if (!email_fld_popup.match(mailformat)) {
      let v2 = document.getElementById("email_fld_popup");
      v2.className += " error_line";

      let er22v = document.getElementById("eml_errP1");
      er22v.className += " show_error";
    } else if (phone_fld_popup == "") {
      let v4 = document.getElementById("phone_fld_popup");
      v4.className += " error_line";

      let er44 = document.getElementById("phn_errP");
      er44.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld_popup");
      v4.className += " error_line";

      let er44 = document.getElementById("phn_errP1");
      er44.className += " show_error";
    } else if (dprt_fld_popup == "") {
      let v5 = document.getElementById("dprt_fld_popup");
      v5.className += " error_line";

      let er55 = document.getElementById("depart_errP");
      er55.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(form_popup.current),
        }
      )
        .then((res) => {
          console.log("SUCCESSFULLY SUBMITTED");
          setLoading(false);
        })
        .catch((err) => console.log(err));

      emailjs
        .sendForm(
          "service_7xurfxj",
          "template_u6s227l",
          e.target,
          "SsPYHKCapw4h-xBn_"
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatusMessage("Your Message has been sent successfully");
            let bx = document.getElementById("thnk_boxP");
            bx.className += " thnk_show";

            let frm_bx = document.getElementById("popup_form_bx");
            frm_bx.className += " form_hide";
          },
          (error) => {
            console.log(error.text);
            setStatusMessage(`${error.text} happened`);
          }
        );
      e.target.reset();
    }
  };

  useEffect(() => {
    $(".enquire_btn").on("click", function () {
      $(".career_popup_box").fadeIn();
      $(".carrer_overlay").fadeIn();
      $("body").css("overflow", "hidden");
    });

    $(".career_cls_btn").on("click", function () {
      $(".career_popup_box").fadeOut();
      $(".carrer_overlay").fadeOut();
      $("body").css("overflow", "auto");
    });

    (function () {
      $(".has-children")
        .off("click")
        .on("click", function () {
          $(this).children("ul").slideToggle("slow", "swing");
          $(".icon-arrow").toggleClass("open");
        });
    })();

    $(document).ready(function () {
      $(".has-sub-menu").hover(
        function () {
          $(".desk-hdr-sec").addClass("hovered");
        },
        function () {
          $(".hdr-sec").removeClass("hovered");
        }
      );
    });

    $(function () {
      $(".sector-sub-menu")
        .mouseenter(function () {
          $(".sectr-lnk").addClass("menu-active");
        })
        .mouseleave(function () {
          $(".sectr-lnk").removeClass("menu-active");
        });
    });

    $(function () {
      $(".servc-sub-menu")
        .mouseenter(function () {
          $(".servc-lnk").addClass("menu-active");
        })
        .mouseleave(function () {
          $(".servc-lnk").removeClass("menu-active");
        });
    });

    $(function () {
      $(".servc-sub-menu")
        .mouseenter(function () {
          $(".list-one").addClass("hdr-animte");
          $(".list-three").addClass("hdr-animte");
          $(".list-two").addClass("hdr-animte");
        })
        .mouseleave(function () {
          $(".list-one").removeClass("hdr-animte");
          $(".list-two").removeClass("hdr-animte");
          $(".list-three").removeClass("hdr-animte");
        });
    });

    $(function () {
      $(".servc-lnk")
        .mouseenter(function () {
          $(".list-one").addClass("hdr-animte");
          $(".list-three").addClass("hdr-animte");
          $(".list-two").addClass("hdr-animte");
        })
        .mouseleave(function () {
          $(".list-one").removeClass("hdr-animte");
          $(".list-two").removeClass("hdr-animte");
          $(".list-three").removeClass("hdr-animte");
        });
    });
  });

  return (
    <>
      <div className="section hdr-sec desktop-menu desk-hdr-sec">
        <div
          className="main-container width-1250 flex head-container"
          data-aos="fade-in"
          data-aos-duration="500"
          data-aos-once="true"
        >
          <div className="clm-2 hdr-clm1">
            <a href="/">
              <img src={MRS_Logo} alt="MRS_Logo" />
            </a>
          </div>

          <div className="clm-2 hdr-clm2">
            <div className="head-links">
              <a href="/about">About Us</a>
              <div className="has-sub-menu">
                <a href="#" className="servc-lnk">
                  Service
                </a>
                <ul className="sub-menu servc-sub-menu">
                  <div className="sub-menu-innr">
                    <li className="list-one">
                      End-to-End Supply Chain
                      <br />
                      Management
                      <ul className="sub-menu-innr-ul">
                        <li>
                          <a href="/services/multiuser-warehousing">
                            Warehousing Solutions
                          </a>
                        </li>
                        <li>
                          <a href="/services/pioneering-duty-free-warehousing-solutions">
                            Free Trade Zone, Mundra SEZ
                          </a>
                        </li>
                        <li>
                          <a href="/services/road-and-rail-transport">
                            Surface & Rail Transport
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="list-two">
                      Regulatory Compliance and
                      <br /> Documentation
                      <ul className="sub-menu-innr-ul">
                        <li>
                          <a href="/services/customs-brokerage-and-regulatory-compliance">
                            Customs Brokerage
                          </a>
                        </li>
                        <li>
                          <a href="/services/customs-brokerage-and-regulatory-compliance#foreign">
                            Customs & Foreign Trade Compliance
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="list-three">
                      Innovative Logistics and
                      <br /> Industrial Solutions
                      <ul className="sub-menu-innr-ul">
                        <li>
                          <a href="/services/tech-driven-last-mile-delivery-services">
                            Tech-Driven Last-Mile Delivery
                          </a>
                        </li>
                        {/* <li><a href="#">Industrial Park & Bespoke Solutions</a></li> */}
                      </ul>
                    </li>
                  </div>
                </ul>
              </div>
              {/* <a href="#">Sectors</a> */}
              <div className="has-sub-menu">
                <a href="#" className="sectr-lnk">
                  Sectors
                </a>
                <ul className="sub-menu sector-sub-menu">
                  <div className="sub-menu-innr ">
                    <li>
                      <a href="/sector/arts-exhibitions-and-luxury-Goods">
                        Arts, Exhibitions, and Luxury Goods
                      </a>
                    </li>
                    <li>
                      <a href="/sector/industrial-sector">Industrial Sector</a>
                    </li>
                    <li>
                      <a href="/sector/e-commerce-and-retail">
                        E-commerce and Retail
                      </a>
                    </li>
                    <li>
                      <a href="/sector/renewable-energy-and-infrastructure-projects">
                        Renewable Energy and Infrastructure Projects
                      </a>
                    </li>
                    <li>
                      <a href="/sector/chemicals-construction-energy-and-agriculture">
                        Chemicals, Construction, Energy, and Agriculture
                      </a>
                    </li>
                    <li>
                      <a href="/sector/manufacturing-automotive-technology-and-consumer-goods">
                        Manufacturing, Automotive, Technology, and Consumer
                        Goods
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
              {/* <a href="#">Media Center</a> */}
              <a href="/careers">Careers</a>
              <a href="/blog">Blog</a>
              <a href="/contact-us">Contact Us</a>
              {/* <img src={Search_icon} alt="Search_icon" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="section hdr-sec mob-menu">
        <div
          className="main-container width-1250 flex head-container"
          data-aos="fade-in"
          data-aos-duration="500"
          data-aos-once="true"
        >
          <div className="clm-2 mob-clm1">
            <a href="/">
              <img src={MRS_Logo} alt="MRS_Logo" />
            </a>
          </div>

          <div className="clm-2 mob-clm2">
            <nav role="navigation">
              <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li className="has-children">
                    <a>
                      Services <img src={Sub_menu} className="icon-arrow" />
                    </a>
                    <ul className="children">
                      <li>
                        <a href="/services/multiuser-warehousing">
                          Multiuser Warehousing
                        </a>
                      </li>
                      <li>
                        <a href="/services/road-and-rail-transport">
                          Road & Rail Transport
                        </a>
                      </li>
                      <li>
                        <a href="/services/pioneering-duty-free-warehousing-solutions">
                          Pioneering Duty-Free Warehousing Solutions
                        </a>
                      </li>
                      <li>
                        <a href="/services/customs-brokerage-and-regulatory-compliance">
                          Customs Brokerage and Regulatory Compliance
                        </a>
                      </li>
                      <li>
                        <a href="/services/tech-driven-last-mile-delivery-services">
                          Tech-Driven Last-Mile Delivery Services
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/careers">Careers</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact Us</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Global Form Popup  */}
      <div className="carrer_overlay"></div>
      <div
        className="career_popup_box"
        data-aos="fade-in"
        data-aos-delay="400"
        data-aos-once="true"
      >
        <img className="career_cls_btn" src={Close_icon}></img>

        <div className="caeer_inner_dv">
          <h2 className="career_hd">Join us</h2>

          <form
            className="conversion_form"
            ref={form_popup}
            onSubmit={sendEmail1}
            id="popup_form_bx"
            data-aos="fade-in"
            data-aos-duration="500"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <input
              className="page_name"
              type="hidden"
              name="Page_name"
              value="Contact Page"
            />

            {/* <input className='current_date' type='hidden' name='Date' id='current_date' /> */}

            <div className="conv_frm_spc">
              <label className="form-label conv_frm_label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                id="name_fld_popup"
                ref={nameinput_popup}
                onFocus={handleFocus_pp}
              />
              <p className="error_msg" id="nm_errP">
                Please Enter Name
              </p>
              <p className="error_msg" id="nm_errP1">
                Letters and space only.
              </p>
            </div>
            <div className="conv_frm_spc">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                id="email_fld_popup"
                ref={emailinput_popup}
                onFocus={handleFocus_pp}
              />
              <p className="error_msg" id="eml_errP">
                Please Enter Email Address
              </p>
              <p className="error_msg" id="eml_errP1">
                Please Enter Valid Email Address
              </p>
            </div>
            {/* <div className="conv_frm_spc">
                                        <label className="form-label">Organisation</label>
                                        <input type="text" name='organisation' className="form-control" placeholder="Organisation"  id='org_fld' ref={orginput} onFocus={handleFocus_pp} />
                                        <p className='error_msg' id='cmp_errP'>Please Enter Organisation</p>
                                    </div> */}
            <div className="conv_frm_spc">
              <label className="form-label">Phone No</label>
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Phone"
                id="phone_fld_popup"
                ref={phoneinput_popup}
                onFocus={handleFocus_pp1}
              />
              <p className="error_msg" id="phn_errP">
                Please Enter Phone No
              </p>
              <p className="error_msg" id="phn_errP1">
                Please Enter Valid Phone No
              </p>
            </div>

            <div className="conv_frm_spc selectin-fld">
              <label className="form-label">Type of Enquiry</label>
              <select
                className="form-control enq_type cont_enq"
                name="enquiry"
                id="dprt_fld_popup"
                ref={departinput_popup}
                onFocus={handleFocus_pp}
              >
                <option value="" disabled selected>
                  You are interrested in
                </option>
                <option value="Built To Suit Warehousing">
                  End-to-End Supply Chain Management
                </option>
                <option value="Multiuser Warehousing">
                  Regulatory Compliance and Documentation
                </option>
                <option value="Customs Bonded Warehouse">
                  Innovative Logistics and Industrial Solutions
                </option>
              </select>
              <p className="error_msg" id="depart_errP">
                Please Select Type of Enquiry
              </p>
            </div>

            <div className="col-6 btn_col">
              <input
                type="submit"
                className="btn btn-primary conv_btn cont_form_btn"
                value="Submit"
              ></input>
            </div>
          </form>
          <p className="thnk txt_wht white" id="thnk_boxP">
            Your form has been sent successfully
          </p>
        </div>
      </div>
    </>
  );
}

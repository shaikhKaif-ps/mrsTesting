import React from "react";
import "../../components/global/header2.css";
import $ from "jquery";
import { useEffect } from "react";
import MRS_Logo from "../../assets/img/header_img/MRS-Logo.svg";

import Sub_menu from "../../assets/img/line_img/Sub_Menu_icon.svg";
import Close_icon from "../../assets/img/close_icon.svg";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Header2() {
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
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $(".mob-menu").addClass("hdr-scroll");
      } else {
        $(".mob-menu").removeClass("hdr-scroll");
      }
    });

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

    // (function () {
    //   $('.has-children').off('click').on ('click', function() {
    //        $(this).children('ul').slideToggle('slow', 'swing');
    //        $('.icon-arrow').toggleClass('open');
    //     });
    // })();

    (function () {
      $(".has-children")
        .off("click")
        .on("click", function () {
          var $children = $(this).children("ul");
          $(".has-children").not(this).children("ul").slideUp("slow", "swing");
          $(".has-children").not(this).find(".icon-arrow").removeClass("open");
          $children.slideToggle("slow", "swing");
          $(this).find(".icon-arrow").toggleClass("open");
        });

      $(".has-sub-children")
        .off("click")
        .on("click", function (e) {
          e.stopPropagation(); // Prevent parent menu from toggling
          var $subChildren = $(this).children(".sub-children");
          $(".has-sub-children")
            .not(this)
            .children(".sub-children")
            .slideUp("slow", "swing");
          $(".has-sub-children")
            .not(this)
            .find(".sub-icon-arrow")
            .removeClass("open");
          $subChildren.slideToggle("slow", "swing");
          $(this).find(".sub-icon-arrow").toggleClass("open");
        });
    })();

    //----------------------------------------------------------------------- Desktop Header 1 Jquery Code Start Here
    // $('.park_drp').on("click", function(e) {
    $(".park_drp").mouseenter(function (e) {
      $(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $(".esg_drp").find(".megamenu").removeClass("open_megamenu");

      $(".menu_animate_box").removeClass("submenu_animation");
      $(this).find(".megamenu").addClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".hdr_container").addClass("show_header_bg1");
      $(".park_drp .menu_animate_box").addClass("submenu_animation");
      $(this).toggleClass("add_black");
      e.stopPropagation();
    });

    $(".prk_menu2").mouseenter(function (e) {
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").addClass("show_header_bg_sticky2");
    });

    $(".park_drp").mouseleave(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      $(".dropdown").append(
        "<style>.dropdown a::after{right:2px !important;}</style>"
      );
    });

    $(".prk_menu2").mouseleave(function (e) {
      $(".hdr_container").removeClass("show_header_bg_sticky2");
    });

    // $('.solution_drp').on("click", function(e) {
    $(".solution_drp").mouseenter(function (e) {
      $(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $(".esg_drp").find(".megamenu").removeClass("open_megamenu");
      $(".park_drp").removeClass("add_black");
      $(".explore_drp").removeClass("add_black");
      $(".esg_drp").removeClass("add_black");

      $(".menu_animate_box").removeClass("submenu_animation");
      $(this).find(".megamenu").addClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".hdr_container").addClass("show_header_bg1");
      $(".solution_drp .menu_animate_box").addClass("submenu_animation");
      $(this).toggleClass("add_black");
      e.stopPropagation();
    });

    $(".solu_menu2").mouseenter(function (e) {
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").addClass("show_header_bg_sticky2");
    });

    $(".solution_drp").mouseleave(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      // $('.dropdown').append('<style>.dropdown a::after{right:2px !important;}</style>');
    });

    $(".solu_menu2").mouseleave(function (e) {
      $(".hdr_container").removeClass("show_header_bg_sticky2");
    });

    // $('.explore_drp').on("click", function(e) {
    $(".explore_drp").mouseenter(function (e) {
      $(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $(".esg_drp").find(".megamenu").removeClass("open_megamenu");
      $(".park_drp").removeClass("add_black");
      $(".solution_drp").removeClass("add_black");
      $(".esg_drp").removeClass("add_black");

      $(".menu_animate_box").removeClass("submenu_animation");
      $(this).find(".megamenu").addClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".hdr_container").addClass("show_header_bg1");
      $(".explore_drp .menu_animate_box").addClass("submenu_animation");
      $(this).toggleClass("add_black");
      e.stopPropagation();
    });

    $(".explo_menu2").mouseenter(function (e) {
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").addClass("show_header_bg_sticky2");
    });

    $(".explore_drp").mouseleave(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      // $('.dropdown').append('<style>.dropdown a::after{right:2px !important;}</style>');
    });

    $(".explo_menu2").mouseleave(function (e) {
      $(".hdr_container").removeClass("show_header_bg_sticky2");
    });

    // $('.esg_drp').on("click", function(e) {
    $(".esg_drp").mouseenter(function (e) {
      $(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $(".park_drp").removeClass("add_black");
      $(".solution_drp").removeClass("add_black");
      $(".explore_drp").removeClass("add_black");

      $(".menu_animate_box").removeClass("submenu_animation");
      $(this).find(".megamenu").addClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").addClass("show_header_bg2");
      $(".esg_drp .menu_animate_box").addClass("submenu_animation");
      $(this).toggleClass("add_black");
      e.stopPropagation();
    });

    $(".esg_drp").mouseleave(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      // $('.dropdown').append('<style>.dropdown a::after{right:2px !important;}</style>');
    });

    // $('.contact_link').on("click", function(e) {
    $(".contact_link").mouseenter(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      // $('.hdr_container').css({'background-color':'transparent','height':'180px'});
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      e.stopPropagation();
    });

    $(".contact_link").mouseleave(function (e) {
      $(".megamenu").removeClass("open_megamenu");
      $(".hdr_container").removeClass("show_header_bg1");
      $(".hdr_container").removeClass("show_header_bg2");
      $(".dropdown").removeClass("add_black");
      // $('.dropdown').append('<style>.dropdown a::after{right:2px !important;}</style>');
    });

    $(".dropdown").on("click", function (e) {
      $(".dropdown")
        .find("a.dropdown-toggle.nav-link")
        .css("padding-left", "2px");
      $(".dropdown").find("a::after").css("right", "2px");
      $(".dropdown").css("background-color", "transparent");

      // $(this).find('a.dropdown-toggle.nav-link').css("padding-left","7%");
    });

    $(".srvc-menu").mouseenter(function (e) {
      $(".srvc-lnk").addClass("chnag-color");
    });

    $(".srvc-menu").mouseleave(function (e) {
      $(".srvc-lnk").removeClass("chnag-color");
    });

    $(".sctr-menu").mouseenter(function (e) {
      $(".sctr-lnk").addClass("chnag-color");
    });

    $(".sctr-menu").mouseleave(function (e) {
      $(".sctr-lnk").removeClass("chnag-color");
    });

    //----------------------------------------------------------------------- Desktop Header 1 Jquery Code End Here

    $(".mob_menu_btn").on("click", function () {
      $(".mobile_nav").addClass("open_mob_nav");
    });

    $(".close_mob_nav").on("click", function () {
      $(".mobile_nav").removeClass("open_mob_nav");
    });

    $(".anchr_btn").on("click", function () {
      $(".mobile_nav").removeClass("open_mob_nav");
    });

    if ($(window).width() > 1023) {
      var prevScrollpos = window.pageYOffset;

      window.onscroll = function () {
        var header = document.getElementById("desk_header");
        var currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
          // header.classList.add("fixed");
          header.style.display = "block";
        } else {
          header.style.display = "none";
        }
        prevScrollpos = currentScrollPos;
      };

      $(window).on("scroll", function () {
        var sticky = $("#desk_header"),
          scroll = $(window).scrollTop();

        if (scroll <= 450) {
          sticky.hide();
        }
      });
    }

    if ($(window).width() < 1023) {
      var prevScrollpos = window.pageYOffset;
      window.onscroll = function () {
        var header = document.getElementById("desk_header_1");
        var currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
          header.classList.add("fixed");
        } else {
          header.classList.remove("fixed");
        }
        prevScrollpos = currentScrollPos;
      };

      $(window).on("scroll", function () {
        var sticky = $(".desktop_header1"),
          scroll = $(window).scrollTop();

        if (scroll == 0) {
          sticky.removeClass("fixed");
        }
      });
    }
  });

  return (
    <>
      {/*------------------------------------------------------------------------------------- Desktop header*/}
      <div
        className="header_sec snap_sec desktop_header1"
        id="desk_header_1"
        data-aos="fade-in"
        data-aos-delay="400"
        data-aos-once="true"
      >
        <div className="hdr_container">
          <div className="main-container width-1250 no-padding flex">
            <div className="clm-2 hdr-clm1">
              <a href="/">
                <img src={MRS_Logo} alt="MRS_Logo" />
              </a>
            </div>

            <div className="clm-2 hdr-clm2">
              <div className="desk_menu_row">
                <div className="zero_padding">
                  <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid no_padding">
                      <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav">
                          <li className="nav-item menu_link no_LR_margin contact_link">
                            <a className="nav-link" href="/about">
                              {" "}
                              About Us{" "}
                            </a>
                          </li>

                          <li className="nav-item dropdown has-megamenu menu_link explore_drp">
                            <a
                              className="nav-link dropdown-toggle srvc-lnk"
                              data-bs-toggle="dropdown"
                              data-bs-hover="dropdown"
                            >
                              {" "}
                              Services
                            </a>
                            <div
                              className="dropdown-menu megamenu srvc-menu"
                              role="menu"
                            >
                              <div className="row_border">
                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx1">
                                    <h5>End-to-End Supply Chain Management</h5>
                                    <ul className="list-unstyled">
                                      <li>
                                        <a href="/services/multiuser-warehousing">
                                          Warehousing Solutions
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/services/pioneering-duty-free-warehousing-solutions">
                                          Free Trade Zone
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/services/road-and-rail-transport">
                                          Surface & Rail Transport
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx2">
                                    <h5>
                                      Regulatory Compliance and Documentation
                                    </h5>
                                    <ul className="list-unstyled">
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
                                      <li><a href="/services/import-management">Import Management</a></li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx3">
                                    <h5>
                                      Innovative Logistics and Industrial
                                      Solutions
                                    </h5>
                                    <ul className="list-unstyled">
                                      <li>
                                        <a href="/services/tech-driven-last-mile-delivery-services">
                                          Tech-Driven Last-Mile Delivery
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="nav-item dropdown has-megamenu menu_link esg_drp">
                            <a
                              className="nav-link dropdown-toggle sctr-lnk"
                              data-bs-toggle="dropdown"
                              data-bs-hover="dropdown"
                            >
                              {" "}
                              Sectors{" "}
                            </a>
                            <div
                              className="dropdown-menu megamenu sctr-menu"
                              role="menu"
                            >
                              <div className="row_border esg_menus">
                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx1">
                                    <ul className="list-unstyled">
                                      <li>
                                        <a href="/sector/manufacturing-automotive-technology-and-consumer-goods">
                                          Manufacturing, Automotive, Technology,
                                          and Consumer Goods
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/sector/industrial-sector">
                                          Industrial Sector
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx2">
                                    <ul className="list-unstyled">
                                      <li>
                                        <a href="/sector/renewable-energy-and-infrastructure-projects">
                                          Renewable Energy and Infrastructure
                                          Projects
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/sector/arts-exhibitions-and-luxury-Goods">
                                          Arts, Exhibitions, and Luxury Goods
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="over_flow">
                                  <div className="col-megamenu menu_animate_box animi_bx3">
                                    <ul className="list-unstyled">
                                      <li>
                                        <a href="/sector/chemicals-construction-energy-and-agriculture">
                                          Chemicals, Construction, Energy, and
                                          Agriculture
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/sector/e-commerce-and-retail">
                                          E-commerce and Retail
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="nav-item menu_link no_LR_margin contact_link">
                            <a className="nav-link" href="/careers">
                              {" "}
                              Career{" "}
                            </a>
                          </li>

                          <li className="nav-item menu_link no_LR_margin contact_link">
                            <a className="nav-link" href="/blog">
                              {" "}
                              Blog{" "}
                            </a>
                          </li>

                          <li className="nav-item menu_link no_LR_margin contact_link">
                            <a className="nav-link" href="/contact-us">
                              {" "}
                              Contact Us{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------- Mobile header */}

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
                      <li className="has-sub-children">
                        <a>
                          End-to-End Supply Chain Management{" "}
                          <img src={Sub_menu} className="sub-icon-arrow" />
                        </a>
                        <ul className="sub-children">
                          <li>
                            <a href="/services/multiuser-warehousing">
                              Warehousing Solutions
                            </a>
                          </li>
                          <li>
                            <a href="/services/pioneering-duty-free-warehousing-solutions">
                              Free Trade Zone
                            </a>
                          </li>
                          <li>
                            <a href="/services/road-and-rail-transport">
                              Surface & Rail Transport
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li className="has-sub-children">
                        <a>
                          Regulatory Compliance and Documentation{" "}
                          <img src={Sub_menu} className="sub-icon-arrow" />
                        </a>
                        <ul className="sub-children">
                          <li>
                            <a href="/services/customs-brokerage-and-regulatory-compliance">
                              Customs Brokerage and Regulatory Compliance
                            </a>
                          </li>
                          <li>
                            <a href="/services/customs-brokerage-and-regulatory-compliance#foreign">
                              Customs & Foreign Trade Compliance
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li className="has-sub-children">
                        <a>
                          Innovative Logistics and Industrial Solutions{" "}
                          <img src={Sub_menu} className="sub-icon-arrow" />
                        </a>
                        <ul className="sub-children">
                          <li>
                            <a href="/services/tech-driven-last-mile-delivery-services">
                              Tech-Driven Last-Mile Delivery Services
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <a>
                      Sector <img src={Sub_menu} className="icon-arrow" />
                    </a>
                    <ul className="children">
                      <li>
                        <a href="/sector/arts-exhibitions-and-luxury-Goods">
                          Arts, Exhibitions, and Luxury Goods
                        </a>
                      </li>
                      <li>
                        <a href="/sector/industrial-sector">
                          Industrial Sector
                        </a>
                      </li>
                      <li>
                        <a href="/sector/e-commerce-and-retail">
                          E-commerce and Retail
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
                      <li>
                        <a href="/sector/renewable-energy-and-infrastructure-projects">
                          Renewable Energy and Infrastructure Projects
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

      {/*  -------------------------------------------------------------------------------------Global Form Popup  */}

      <div className="carrer_overlay"></div>
      <div
        className="career_popup_box"
        data-aos="fade-in"
        data-aos-delay="400"
        data-aos-once="true"
      >
        <img className="career_cls_btn" src={Close_icon}></img>

        <div className="caeer_inner_dv">
          <h2 className="career_hd">Connect us</h2>

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

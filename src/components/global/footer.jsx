import React from "react";
import message_icon from "../../assets/img/footer_img/message_icon.svg";
import linkdn_icon from "../../assets/img/footer_img/linkedin.svg";
import { useEffect } from "react";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Footer() {
  const form_subs = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const emailinput_subs = React.useRef(null);

  // All field validation error hide code
  const handleFocus = (e) => {
    e.target.classList.remove("error_line");

    let er2 = document.getElementById("eml_err_subs");
    er2.classList.remove("show_error");

    let er2v = document.getElementById("eml_err1_subs");
    er2v.classList.remove("show_error");
  };

  // Form action code
  const sendEmail = async (e) => {
    e.preventDefault();

    // Fields get value Code
    let email_fld_subs = emailinput_subs.current.value;

    // Regex Code
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;

    // Fields validation Code
    if (email_fld_subs == "") {
      let v2 = document.getElementById("email_fld_subs");
      v2.className += " error_line";

      let er2 = document.getElementById("eml_err_subs");
      er2.className += " show_error";
    } else if (!email_fld_subs.match(mailformat)) {
      let v2 = document.getElementById("email_fld_subs");
      v2.className += " error_line";

      let er2v = document.getElementById("eml_err1_subs");
      er2v.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbyK-BOXb7UbgaZkq49hQCwtNIZ9J9WWl5Zrn0cD88m2N-5O7IiKFlikpJCutW3HsIKN/exec",
        {
          method: "POST",
          body: new FormData(form_subs.current),
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
          "template_7d3op88",
          e.target,
          "SsPYHKCapw4h-xBn_"
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatusMessage("Thank you for subscribing");
            let bx = document.getElementById("thnk_box_subs");
            bx.className += " thnk_show";

            let frm_bx = document.getElementById("subs_form_bx");
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
    if (!$(".marquee").data("isMarqueeInitialized")) {
      $(".marquee").data("isMarqueeInitialized", true);

      $(".marquee").marquee({
        //speed in milliseconds of the marquee
        duration: 9000,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: "left",
        //true or false - should the marquee be duplicated to show an effect of continuous flow
        duplicated: true,
      });
    }
  });

  return (
    <>
      <div className="section footer-sec section-padd-LR">
        <div className="main-container width-1200 flex foo-contanr">
          <div
            className="clm-2 footr-clm1"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <img
              src={message_icon}
              alt="message_icon"
              data-aos="fade-in"
              data-aos-duration="500"
              data-aos-once="true"
            />
            <h2
              className="white subscribe-txt"
              data-aos="fade-in"
              data-aos-easing="linear"
              data-aos-duration="600"
              data-aos-delay="600"
              data-aos-once="true"
            >
              Subscribe to
              <br />
              Newsletters
            </h2>
            <p
              className="white"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-once="true"
              data-aos-delay="800"
            >
              Want to stay up to date? <br />
              Sign up for MRS’s biannual update{" "}
            </p>

            {/* <form data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1100">
                        <div className="email">
                            <label className="form__label hide">Email </label>
                            <input  type="email" id="email" className="form__input" placeholder="Enter your email"/>
                        </div>
                        <button type="submit" className="submit-btn">Subscribe</button>
                    </form> */}

            <div
              className="contact_form"
              data-aos="fade-in"
              data-aos-duration="500"
              data-aos-once="true"
              data-aos-delay="1100"
            >
              <form
                className="conversion_form"
                ref={form_subs}
                onSubmit={sendEmail}
                id="subs_form_bx"
              >
                <div className="">
                  <label className="form-label hide">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form__input"
                    id="email_fld_subs"
                    ref={emailinput_subs}
                    onFocus={handleFocus}
                  />
                  <p className="error_msg" id="eml_err_subs">
                    Please Enter Email Address
                  </p>
                  <p className="error_msg" id="eml_err1_subs">
                    Please Enter Valid Email Address
                  </p>
                </div>
                <div className="btn_col">
                  <input
                    type="submit"
                    className="btn btn-primary conv_btn cont_form_btn"
                    id="susbs-btn"
                    value="Subscribe"
                  ></input>
                </div>
              </form>
              <p className="thnk txt_wht white" id="thnk_box_subs">
                Thank you for subscribing
              </p>
            </div>
          </div>
          <div className="clm-2 footr-clm2">
            <div className="foo-links">
              <a href="/" className="js-split-text delay-3s">
                Home
              </a>
              <a href="/#solution" className="js-split-text delay-4s">
                Services
              </a>
              <a href="/#sector" className="js-split-text delay-5s">
                Sectors
              </a>
              {/* <a href="#" className="js-split-text delay-6s">Media Center.</a> */}
              <a href="/careers" className="js-split-text delay-7s">
                Careers
              </a>
              <a href="/contact-us" className="js-split-text delay-8s">
                Contact Us
              </a>
              {/* <a href="/contact-us" className="js-split-text delay-8s">Blogs</a> */}
            </div>

            <div className="foo-innr-container">
              <div className="width-60 foo-innr-clm1">
                <h6 className="light-grey js-split-text delay-6s">
                  Head Office
                </h6>
                <p
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="700"
                  className="foo-addrss"
                >
                  No 7, Ground Floor, 4th Cross, Papaiah Garden Road,
                  Banashankari, 3rd Stage, Bangalore - 560085, Karnataka, India
                </p>
                {/* <p className="site-credit" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="900">© 2024, MRS Supply Chain. All Rights Reserved.</p> */}
                {/* <h6 className="white">Regional Office :</h6> */}
                {/* <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700" className="foo-addrss">Office No 117, "Madhav Palace”, Plot No 55, Sec 8, Gandhidham, Kutch, Gujarat, India, 370201 </p> */}

                <h6 className="light-grey phone js-split-text delay-8s foo-phone">
                  Phone
                </h6>
                <a
                  className="ph-numbr"
                  href="tel:+912836235415"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="1000"
                >
                  +91 2836 235415
                </a>
                <p
                  className="site-credit credit-desk"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="900"
                >
                  © 2024, MRS Supply Chain. All Rights Reserved.
                </p>
              </div>

              <div className="width-40 foo-innr-clm2">
                <h6 className="light-grey js-split-text delay-7s">Email</h6>
                <a
                  href="mailto:connect@mrssupplychain.com"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="900"
                  className="foo-email"
                >
                  connect@mrssupplychain.com
                </a>

                <h6 className="light-grey follow-ttl js-split-text delay-7s">
                  Follow Us
                </h6>
                <a
                  href="https://www.linkedin.com/company/mrs-shipping-llp/"
                  className="linkdn"
                  target="_blank"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="900"
                >
                  <img
                    src={linkdn_icon}
                    alt="message_icon"
                    data-aos="fade-in"
                    data-aos-duration="500"
                    data-aos-once="true"
                  />
                </a>

                {/* <h6 className="light-grey phone js-split-text delay-8s foo-phone">General Enquiries</h6>
                            <a className="ph-numbr" href="tel:+919825813698" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">+91 98258 13698</a>

                            <h6 className="light-grey phone js-split-text delay-8s foo-phone">For RFQ Enquiries</h6>
                            <a className="ph-numbr" href="tel:+918980015415" data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="1000">+91 89800 15415</a> */}

                <div className="foo-bottom-links">
                  <a
                    href="/safety-policy"
                    data-aos="fade-in"
                    data-aos-duration="500"
                    data-aos-once="true"
                    data-aos-delay="950"
                  >
                    Safety Policy
                  </a>
                  <a
                    href="/privacy-policy"
                    data-aos="fade-in"
                    data-aos-duration="500"
                    data-aos-once="true"
                    data-aos-delay="1000"
                  >
                    Privacy Policy
                  </a>
                </div>
                <p
                  className="site-credit credit-mob"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-once="true"
                  data-aos-delay="900"
                >
                  © 2024, MRS Supply Chain. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bottom-footer-sec">
        <div className="main-container">
          <h2 className="marquee">
            We are the 1st Company in Kutch to Provide Single Largest Warehouse
            of Grade A category
          </h2>
        </div>
      </div>
    </>
  );
}

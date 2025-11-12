import { useRef, useState } from "react";
import React from "react";
import emailjs from "emailjs-com";
import $ from "jquery";
import "../../../assets/css/contact.css";

export default function applyNow() {
  const form_career = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const nameinput_cr = React.useRef(null);
  const emailinput_cr = React.useRef(null);

  const orginput_cr = React.useRef(null);
  const phoneinput_cr = React.useRef(null);

  const fileinput = React.useRef(null);

  // All field validation error hide code
  const handleFocus_cr = (e) => {
    e.target.classList.remove("error_line");

    let er1_cr = document.getElementById("nm_err");
    er1_cr.classList.remove("show_error");

    let er1_crv = document.getElementById("nm_err1");
    er1_crv.classList.remove("show_error");

    let er2_cr = document.getElementById("eml_err");
    er2_cr.classList.remove("show_error");

    let er2_crv = document.getElementById("eml_err1");
    er2_crv.classList.remove("show_error");

    let er3_cr = document.getElementById("cmp_err");
    er3_cr.classList.remove("show_error");

    // let er5 = document.getElementById("depart_err");
    // er5.classList.remove("show_error");

    let er6_cr = document.getElementById("file_err");
    er6_cr.classList.remove("show_error");

    let er6_crv = document.getElementById("file_err1");
    er6_crv.classList.remove("show_error");
  };

  // Phone field validation error hide code
  const handleFocus_cr1 = (e) => {
    e.target.classList.remove("error_line");

    let er4_cr = document.getElementById("phn_err");
    er4_cr.classList.remove("show_error");

    let er4_crv = document.getElementById("phn_err1");
    er4_crv.classList.remove("show_error");
  };

  //   const Geeks = event => {
  //     let select_vlu=(event.target.value);
  //   };

  // Form action code
  const sendEmailCr = async (e) => {
    e.preventDefault();

    // Fields get value Code
    let name_fld_cr = nameinput_cr.current.value;
    let email_fld_cr = emailinput_cr.current.value;

    let org_fld_cr = orginput_cr.current.value;
    let phone_fld_cr = phoneinput_cr.current.value;

    let file_fld = fileinput.current.value;

    // Phone Regex Code
    let phone_fltr = document.getElementById("phone_fld_cr");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;

    // file type
    var allowedExtensions = /(\.doc|\.docx|\.odt|\.pdf|\.wps|\.wks|\.wpd)$/i;

    // Fields validation Code
    if (name_fld_cr == "") {
      let v1 = document.getElementById("name_fld_cr");
      v1.className += " error_line";

      let er1_cr = document.getElementById("nm_err");
      er1_cr.className += " show_error";
    } else if (!name_fld_cr.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld_cr");
      v1.className += " error_line";

      let er1_crv = document.getElementById("nm_err1");
      er1_crv.className += " show_error";
    } else if (phone_fld_cr == "") {
      let v4 = document.getElementById("phone_fld_cr");
      v4.className += " error_line";

      let er4_cr = document.getElementById("phn_err");
      er4_cr.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld_cr");
      v4.className += " error_line";

      let er4_cr = document.getElementById("phn_err1");
      er4_cr.className += " show_error";
    } else if (email_fld_cr == "") {
      let v2 = document.getElementById("email_fld_cr");
      v2.className += " error_line";

      let er2_cr = document.getElementById("eml_err");
      er2_cr.className += " show_error";
    } else if (!email_fld_cr.match(mailformat)) {
      let v2 = document.getElementById("email_fld_cr");
      v2.className += " error_line";

      let er2_crv = document.getElementById("eml_err1");
      er2_crv.className += " show_error";
    } else if (org_fld_cr == "") {
      let v3 = document.getElementById("org_fld_cr");
      v3.className += " error_line";

      let er3_cr = document.getElementById("cmp_err");
      er3_cr.className += " show_error";
    } else if (file_fld == "") {
      let v6 = document.getElementById("myFile");
      v6.className += " error_line";

      let er6_cr = document.getElementById("file_err");
      er6_cr.className += " show_error";
    } else if (!allowedExtensions.exec(file_fld)) {
      // alert('Invalid file type');
      // fileInput.value = '';
      let er7_cr = document.getElementById("file_err1");
      er7_cr.className += " show_error";
      return false;
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbz-1hyxx1HlednwMz-1VirzczXDIT7-Wi3JaQ9D4tZI6hu0qt6GxOD589B5Ugyud6gLuQ/exec",
        {
          method: "POST",
          body: new FormData(form_career.current),
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
          "template_bza8r36",
          e.target,
          "SsPYHKCapw4h-xBn_"
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatusMessage("Your Message has been sent successfully");
            let bx = document.getElementById("thnk_box");
            bx.className += " thnk_show";

            let frm_bx = document.getElementById("career_form_bx");
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

  return (
    <>
      <div className="form-sec section-padd-LR">
        <div className="main-container width-1200 white">
          <div className="row apply-nw-rw">
            <div className="clm-2 contnt-clm">
              <h2 className="js-split-text">Apply Now</h2>
              <p
                data-aos="fade-in"
                data-aos-duration="500"
                data-aos-delay="400"
                data-aos-once="true"
              >
                Embark on your career adventure with us: Fill out the
                application below.
              </p>
            </div>

            <div className="clm-2">
              <div className="contact_form">
                <form
                  className="conversion_form"
                  ref={form_career}
                  onSubmit={sendEmailCr}
                  id="career_form_bx"
                  data-aos="fade-in"
                  data-aos-duration="500"
                  data-aos-delay="400"
                  data-aos-once="true"
                >
                  <input
                    className="page_name"
                    type="hidden"
                    name="Page_name"
                    value="Careers Page"
                  />

                  {/* <input className='current_date' type='hidden' name='Date' id='current_date' /> */}

                  <div className="conv_frm_spc">
                    <label className="form-label conv_frm_label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      id="name_fld_cr"
                      ref={nameinput_cr}
                      onFocus={handleFocus_cr}
                    />
                    <p className="error_msg" id="nm_err">
                      Please Enter Name
                    </p>
                    <p className="error_msg" id="nm_err1">
                      Letters and space only.
                    </p>
                  </div>
                  <div className="conv_frm_spc">
                    <label className="form-label">Phone No</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="Phone"
                      id="phone_fld_cr"
                      ref={phoneinput_cr}
                      onFocus={handleFocus_cr1}
                    />
                    <p className="error_msg" id="phn_err">
                      Please Enter Phone No
                    </p>
                    <p className="error_msg" id="phn_err1">
                      Please Enter Valid Phone No
                    </p>
                  </div>
                  <div className="conv_frm_spc">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      id="email_fld_cr"
                      ref={emailinput_cr}
                      onFocus={handleFocus_cr}
                    />
                    <p className="error_msg" id="eml_err">
                      Please Enter Email Address
                    </p>
                    <p className="error_msg" id="eml_err1">
                      Please Enter Valid Email Address
                    </p>
                  </div>
                  <div className="conv_frm_spc">
                    <label className="form-label">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      className="form-control"
                      placeholder="Experience"
                      id="org_fld_cr"
                      ref={orginput_cr}
                      onFocus={handleFocus_cr}
                    />
                    <p className="error_msg" id="cmp_err">
                      Please Enter Experience
                    </p>
                  </div>

                  <div className="conv_frm_spc">
                    <div className="frm_inr_dv">
                      <label>Attach CV</label>
                      <input
                        type="file"
                        placeholder="Attach CV"
                        id="myFile"
                        name="cv"
                        ref={fileinput}
                        onFocus={handleFocus_cr}
                      ></input>
                      <p className="error_msg" id="file_err">
                        Please Attach CV
                      </p>
                      <p className="error_msg" id="file_err1">
                        Please Attach valid file
                      </p>
                    </div>
                  </div>

                  <div className="col-6 btn_col">
                    <input
                      type="submit"
                      className="btn btn-primary conv_btn cont_form_btn"
                      value="Submit"
                    ></input>
                  </div>
                </form>
                <p className="thnk txt_wht white" id="thnk_box">
                  Your form has been sent successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

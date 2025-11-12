import { useRef, useState } from "react";
import React from "react";
import emailjs from "emailjs-com";
import $ from "jquery";
import "../../../assets/css/contact.css";

export default function formSection() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const nameinput = React.useRef(null);
  const emailinput = React.useRef(null);

  const orginput = React.useRef(null);
  const phoneinput = React.useRef(null);

  const departinput = React.useRef(null);
  const msginput = React.useRef(null);

  const parkinput_lsng = React.useRef(null);
  const spaceinput_lsng = React.useRef(null);

  // All field validation error hide code
  const handleFocus = (e) => {
    e.target.classList.remove("error_line");

    let er1 = document.getElementById("nm_err");
    er1.classList.remove("show_error");

    let er1v = document.getElementById("nm_err1");
    er1v.classList.remove("show_error");

    let er2 = document.getElementById("eml_err");
    er2.classList.remove("show_error");

    let er2v = document.getElementById("eml_err1");
    er2v.classList.remove("show_error");

    let er3 = document.getElementById("cmp_err");
    er3.classList.remove("show_error");

    let er5 = document.getElementById("depart_err");
    er5.classList.remove("show_error");

    let er6 = document.getElementById("msg_err");
    er6.classList.remove("show_error");

    let er6v = document.getElementById("msg_err1");
    er6v.classList.remove("show_error");

    let er7 = document.getElementById("prk_err_lsng");
    er7.classList.remove("show_error");

    let er8 = document.getElementById("spc_err_lsng");
    er8.classList.remove("show_error");
  };

  // Phone field validation error hide code
  const handleFocus1 = (e) => {
    e.target.classList.remove("error_line");

    let er4 = document.getElementById("phn_err");
    er4.classList.remove("show_error");

    let er4v = document.getElementById("phn_err1");
    er4v.classList.remove("show_error");
  };

  //   const Geeks = event => {
  //     let select_vlu=(event.target.value);
  //   };

  // Form action code
  const sendEmail = async (e) => {
    e.preventDefault();

    // Fields get value Code
    let name_fld = nameinput.current.value;
    let email_fld = emailinput.current.value;

    let org_fld = orginput.current.value;
    let phone_fld = phoneinput.current.value;

    let dprt_fld = departinput.current.value;

    let msg_fld = msginput.current.value;

    // Phone Regex Code
    let phone_fltr = document.getElementById("phone_fld");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;

    // Fields validation Code
    if (name_fld == "") {
      let v1 = document.getElementById("name_fld");
      v1.className += " error_line";

      let er1 = document.getElementById("nm_err");
      er1.className += " show_error";
    } else if (!name_fld.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld");
      v1.className += " error_line";

      let er1v = document.getElementById("nm_err1");
      er1v.className += " show_error";
    } else if (phone_fld == "") {
      let v4 = document.getElementById("phone_fld");
      v4.className += " error_line";

      let er4 = document.getElementById("phn_err");
      er4.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld");
      v4.className += " error_line";

      let er4 = document.getElementById("phn_err1");
      er4.className += " show_error";
    } else if (email_fld == "") {
      let v2 = document.getElementById("email_fld");
      v2.className += " error_line";

      let er2 = document.getElementById("eml_err");
      er2.className += " show_error";
    } else if (!email_fld.match(mailformat)) {
      let v2 = document.getElementById("email_fld");
      v2.className += " error_line";

      let er2v = document.getElementById("eml_err1");
      er2v.className += " show_error";
    } else if (org_fld == "") {
      let v3 = document.getElementById("org_fld");
      v3.className += " error_line";

      let er3 = document.getElementById("cmp_err");
      er3.className += " show_error";
    } else if (dprt_fld == "") {
      let v5 = document.getElementById("dprt_fld");
      v5.className += " error_line";

      let er5 = document.getElementById("depart_err");
      er5.className += " show_error";
    } else if (msg_fld == "") {
      let v6 = document.getElementById("msg_fld");
      v6.className += " error_line";

      let er6 = document.getElementById("msg_err");
      er6.className += " show_error";
    } else if (!msg_fld.match(alpha_allwd)) {
      let v6 = document.getElementById("msg_fld");
      v6.className += " error_line";

      let er6v = document.getElementById("msg_err1");
      er6v.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(form.current),
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
            let bx = document.getElementById("thnk_box");
            bx.className += " thnk_show";

            let frm_bx = document.getElementById("enq_form_bx");
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

  // $(document).ready(function () {
  //     var url = window.location.pathname;
  //     console.log(url);

  //     if (url === '/contact') {
  //         let pg_name = '/contact';
  //         $('#page_name').val(pg_name);
  //     }

  //     var d = new Date();
  //     var month = d.getMonth() + 1;
  //     var day = d.getDate();

  //     // var output = d.getFullYear() + '/' +
  //     //     (('' + month).length < 2 ? '0' : '') + month + '/' +
  //     //     (('' + day).length < 2 ? '0' : '') + day;
  //     var output1 = day + '/' +
  //         (('' + month).length < 2 ? '0' : '') + month + '/' +
  //         (('' + day).length < 2 ? '0' : '') + d.getFullYear();

  //     $('#current_date').val(output1);

  //     $('.cont_enq').on('change', function () {
  //         var enq_nm = this.value;
  //         if (enq_nm === 'Leasing') {
  //             console.log('You are selected leasing enquire');
  //             $('.pkr_lc_fld_dv').addClass('leasing_fld_show');
  //             $('.spc_rq_fld_dv').addClass('leasing_fld_show');
  //             let empty_vrbl = '';
  //             $('#park_lsng_fld').val(empty_vrbl);
  //             $('#space_lsng_fld').val(empty_vrbl);
  //         }
  //         else {
  //             console.log('You are selected other enquire');
  //             $('.pkr_lc_fld_dv').removeClass('leasing_fld_show');
  //             $('.spc_rq_fld_dv').removeClass('leasing_fld_show');
  //             let empty_vrbl = '-';
  //             $('#park_lsng_fld').val(empty_vrbl);
  //             $('#space_lsng_fld').val(empty_vrbl);
  //         }
  //     });

  // });

  return (
    <>
      <div className="form-sec section-padd-LR">
        <div className="main-container width-1200 white">
          <div className="row">
            <div className="clm-2 contnt-clm">
              <h2 className="js-split-text">Get in touch</h2>
              <p
                data-aos="fade-in"
                data-aos-duration="500"
                data-aos-delay="400"
                data-aos-once="true"
              >
                {" "}
                We’re always happy to hear from potential customers, partners,
                and collaborators.
              </p>
            </div>

            <div className="clm-2">
              <div className="contact_form">
                <form
                  className="conversion_form"
                  ref={form}
                  onSubmit={sendEmail}
                  id="enq_form_bx"
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
                      id="name_fld"
                      ref={nameinput}
                      onFocus={handleFocus}
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
                      id="phone_fld"
                      ref={phoneinput}
                      onFocus={handleFocus1}
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
                      id="email_fld"
                      ref={emailinput}
                      onFocus={handleFocus}
                    />
                    <p className="error_msg" id="eml_err">
                      Please Enter Email Address
                    </p>
                    <p className="error_msg" id="eml_err1">
                      Please Enter Valid Email Address
                    </p>
                  </div>
                  <div className="conv_frm_spc">
                    <label className="form-label">Organisation</label>
                    <input
                      type="text"
                      name="organisation"
                      className="form-control"
                      placeholder="Organisation"
                      id="org_fld"
                      ref={orginput}
                      onFocus={handleFocus}
                    />
                    <p className="error_msg" id="cmp_err">
                      Please Enter Organisation
                    </p>
                  </div>

                  <div className="conv_frm_spc selectin-fld">
                    <label className="form-label">Type of Enquiry</label>
                    <select
                      className="form-control enq_type cont_enq"
                      name="enquiry"
                      id="dprt_fld"
                      ref={departinput}
                      onFocus={handleFocus}
                    >
                      <option value="" disabled selected>
                        You are interrested in
                      </option>
                      <option value="Warehousing Solution">
                        Warehousing Solution
                      </option>
                      <option value="Free Trade Zone">
                        Free Trade Zone
                      </option>
                      <option value="Surface & Rail Transport">
                        Surface & Rail Transport
                      </option>
                      <option value="Custom Brokerage">
                        Custom Brokerage
                      </option>
                      <option value="Custom & Foreign Trade Compliance">
                        Custom & Foreign Trade Compliance
                      </option>
                      <option value="Import Management">
                        Import Management
                      </option>
                      <option value="Tech-Driven Last-Mile Delivery">
                        Tech-Driven Last-Mile Delivery
                      </option>
                    </select>
                    <p className="error_msg" id="depart_err">
                      Please Select Type of Enquiry
                    </p>
                  </div>

                  <div className="col-6 conv_frm_spc tell_sec">
                    <label className="form-label">Message</label>
                    {/* <input type="text" className="form-control" id='msg_fld' placeholder="Enter your message" ref={msginput} onFocus={handleFocus}/> */}
                    <textarea
                      className="form-control"
                      name="message"
                      id="msg_fld"
                      placeholder=""
                      ref={msginput}
                      onFocus={handleFocus}
                      rows="4"
                      cols="50"
                    ></textarea>
                    <p className="error_msg" id="msg_err">
                      Please Enter Message
                    </p>
                    <p className="error_msg" id="msg_err1">
                      Letters and space only.
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

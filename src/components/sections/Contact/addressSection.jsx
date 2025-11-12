import React from 'react'
import Phone_icon_white from '../../../assets/img/contact_img/Phone_icon_black.svg'
import Mail_icon_white from '../../../assets/img/contact_img/mail_icon_black.svg'
import pin from '../../../assets/img/contact_img/pin.svg'



export default function addressSection() {
  const mystyle = {
    width: "100%",
    height: "450px",
    border: "0",
    "border-radius": "15px",
  };
  return (
    <>
        <div className="addressSection section-padd-LR">
           <div className="main-container width-1200 flex black">  
              <div className='clm-2 add-clm1' id='add-clm1' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="700">            
                <h2 className="white">Reach Us</h2> 
                <h4 className='head-offc-ttl white' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="">Head Office</h4>
                <p className='address-para white' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="300">No 7, Ground Floor, 4th Cross, Papaiah Garden Road, <br />Banashankari, 3rd Stage, Bangalore - 560085, <br />Karnataka, India</p>

                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.1605711632833!2d72.83444397583882!3d19.14444734981884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7856a1a3821%3A0x5012c32a62de19e7!2sParashift%20Technologies%20-%20An%20Integrated%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1707222157094!5m2!1sen!2sin" style={mystyle} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true"></iframe> */}

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7051926963177!2d77.55557877588683!3d12.926659815860383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f4815145bad%3A0x3aebf33ea9569338!2sMRS%20Shipping%20LLP!5e0!3m2!1sen!2sin!4v1712295826246!5m2!1sen!2sin" style={mystyle} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-aos="fade-in" data-aos-duration="500" data-aos-delay="400" data-aos-once="true"></iframe>
              </div>    
              <div className='clm-2' id='add-clm2'> 
                

                <h4 className='othr-offc-ttl' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">Other Office</h4>
                <div className='offices-bx'>
                  <div className='locations' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">              
                      <h4>Admin Office</h4>          
                      <p className="foo-addrss">Office No. 102,110,117, "Madhav Palace”, Plot No 55, Sec 8, Gandhidham, Kutch, Gujarat, India, 370201</p>                
                  </div>
                  
                  <div className='locations' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">    
                      <h4>Ahmedabad</h4>          
                      <p className="foo-addrss">Near Namaste Circle, 4Th Floor, C-430, Indian Textile Plaza, Shahibaug, Ahmedabad, Ahmedabad, Gujarat, 380004 </p>                
                  </div>
                  <div className='locations' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">              
                      <h4>Mumbai</h4>          
                      <p className="foo-addrss">Ground Floor, Shop No. 6, Agrawal Trade Centre, Belapur, Belapur, Navi Mumbai, Thane, Maharashtra, 400614</p>                
                  </div>
                  <div className='locations' data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700">    
                      <h4>Singapore</h4>          
                      <p className="foo-addrss">101 Upper Cross Street #04-36 People’s Park Centre Singapore 058357 </p>                
                  </div>

                </div>
                

                <div className='mail-dv' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="400">
                  <img className="icn" src={Mail_icon_white} alt="Email_icon"/>
                  <a href="mailto:connect@mrssupplychain.com">connect@mrssupplychain.com</a>
                </div>
                <div className='phone-dv frst_phone' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="600">
                  <img className="icn" src={Phone_icon_white} alt="Phone_icon"/>
                  <a href="tel:+912836235415">+91 2836 235415</a>
                </div>
                <div className='phone-dv oth_phone' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="600">
                  <h5>General Enquiries:</h5>
                  <a href="tel:+919825813698">+91 98258 13698</a>
                </div>
                <div className='phone-dv oth_phone' data-aos="fade-in" data-aos-duration="600" data-aos-once="true" data-aos-delay="600">
                  <h5>RFQ Enquiries:</h5>
                  <a href="tel:+918980015415">+91 89800 15415</a>
                </div>
              </div> 
           </div>


           {/* <div className="main-container width-1200 flex black location-bx">  

             <div className='locations'>
              <img className="icn" src={pin} alt="Phone_icon"/>
              <div className=''>                
                <h4>Gandhidham</h4>          
                <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700" className="foo-addrss">Office No 117, "Madhav Palace”, Plot No 55, Sec 8, Gandhidham, Kutch, Gujarat, India, 370201 </p>
              </div>                
             </div>

             <div className='locations'>
              <img className="icn" src={pin} alt="Phone_icon"/>
              <div className=''>                
                <h4>Ahmedabad</h4>          
                <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700" className="foo-addrss">Near Namaste Circle, 4Th Floor, C-430, Indian Textile Plaza, Shahibaug, Ahmedabad, Ahmedabad, Gujarat, 380004 </p>
              </div>                
             </div>

             <div className='locations'>
              <img className="icn" src={pin} alt="Phone_icon"/>
              <div className=''>                
                <h4>Mumbai</h4>          
                <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700" className="foo-addrss">Ground Floor, Shop No. 6, Agrawal Trade Centre, Belapur, Belapur, Navi Mumbai, Thane, Maharashtra, 400614 </p>
              </div>                
             </div>

             <div className='locations'>
              <img className="icn" src={pin} alt="Phone_icon"/>
              <div className=''>                
                <h4>Singapore </h4>          
                <p data-aos="fade-in" data-aos-duration="500" data-aos-once="true" data-aos-delay="700" className="foo-addrss">101 Upper Cross Street #04-36 People’s Park Centre Singapore 058357 </p>
              </div>                
             </div>              
           </div> */}
        </div>

        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.1605711632833!2d72.83444397583882!3d19.14444734981884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7856a1a3821%3A0x5012c32a62de19e7!2sParashift%20Technologies%20-%20An%20Integrated%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1707222157094!5m2!1sen!2sin" style={mystyle} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      
    </>
  )
}

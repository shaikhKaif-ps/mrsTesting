import React, { useEffect } from "react";
import postsData from '../Blogs/postsData'
import Header from "../../components/global/header";
import Header2 from '../../components/global/header2'
import Footer from "../../components/global/footer";

import '../../assets/css/about.css' 
import '../../assets/css/blog.css' 
import '../../assets/css/Services/MultiuserWarehousing.css'
import Line from '../../assets/img/home_img/Line.svg'
import Warehousing_Solution from '../../assets/img/services_img/MultiuserWarehousing/Warehousing_Solution.jpg'

const BlogArchive = () => {

  useEffect (() => {

    function handleAnimation(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1; // Set opacity to 1 when in viewport
          animateText(entry.target);
          observer.unobserve(entry.target); // No need to disconnect the observer
        }
      });
    }

    function animateText(target) {
      let split = new SplitType(target, {
          split: 'lines'
      });
  
      let tl = gsap.timeline();
      tl.from(split.lines, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          stagger: 0.2
      });
    }

    document.querySelectorAll('.js-split-text').forEach(element => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });       
    
    AOS.init();

    
})

  // const altText = featureImage.split('/').pop().replace(/\.[^/.]+$/, '');


  return (
    <>
    <Header2 />
      <div className="section inner-spotlight-sec section-padd-LR overflow blogarchive-sec" >
              <div className="main-container width-1250 flex">
                  <div className="inner-spot-clm-1">
                      <h1 className="js-split-text white">News & Blog</h1>
                      <h2 className="sldr-sub-ttl blg-sub-ttl" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-delay="400">Latest Happenings</h2>
                      <div className="btn inner-spt-btn white" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">
                        <a className='white-60' href="/">Home </a>{' > '}
                        <a className='white-60'>News & Blog</a>
                    </div>
                  </div>                
              </div>
              
      </div>

      <div className="blog-archive-sec section-padd-LR">
                <div className="main-container">                    
                        <div className="blog-bx">
                            <div className="blg-content-dv">

                              <ul className="blg-list">
                                {postsData.map(post => (
                                  <li key={post.id}>  
                                  <img src={post.featureImage} className="featureImg" alt={post.imgAltTag}/>
                                    <div className="date-box">
                                        <p>{post.category}  ·  {post.publishDate}</p>
                                    </div>
                                    <h2 className="post-ttl">{post.title}</h2>
                                    {/* <p>{post.short_description}</p>    */}
                                    <a className="btn grey" id="btn-styl" href={`/blog/${post.slug}`}><span className="btn_name">Read more</span></a>  
                                    {/* <img src={post.featureImage} className="featureImg"/>                                     */}
                                  </li>
                                ))}
                              </ul>
                            </div>                                                                       
                        </div>                     
                </div>
        </div>

      
    <Footer />
    </>
  );
};

export default BlogArchive;

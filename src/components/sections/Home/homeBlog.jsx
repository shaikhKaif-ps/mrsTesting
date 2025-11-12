import React, { useEffect } from "react";
import "../../../assets/css/home.css";
import postsData from "../../../pages/Blogs/postsData";
import blog1 from "../../../assets/img/home_img/blog1.png";
import blog2 from "../../../assets/img/home_img/blog2.png";
import blog3 from "../../../assets/img/home_img/blog3.png";
import blog4 from "../../../assets/img/home_img/blog4.png";
import Blog_close_icon from "../../../assets/img/home_img/Blog_close_icon.svg";
import $ from "jquery";

export default function HomeBlog() {
  useEffect(() => {
    var swiper = new Swiper(".blog-sldr", {
      slidesPerView: 3.1,
      spaceBetween: 70,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3.1,
        },
      },
    });

    $(".Blog_close_icon")
      .off("click")
      .on("click", function () {
        var $blogBx = $(this).closest(".blog-bx");
        $(this).toggleClass("bl-rotate");
        $(".Blog_close_icon").not(this).removeClass("bl-rotate");

        // Remove the 'test' class from all elements with the class 'blg-inner-dv'
        $(".blg-inner-dv")
          .not($blogBx.find(".blg-inner-dv"))
          .addClass("blopen");

        // Toggle the 'test' class on the clicked element
        $blogBx.find(".blg-inner-dv").toggleClass("blopen");
      });
  });

  return (
    <>
      <div className="blog-sec section-padd-LR">
        <div className="main-container">
          <div className="blg-ttl-bx">
            <h2 className="blog-hdng js-split-text black">News & Blog</h2>
            <a
              className="btn grey blg-btn"
              id="btn-styl"
              href="/blog"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-once="true"
              data-aos-delay="600"
            >
              <span className="btn_name">View All</span>
            </a>
          </div>
          <div
            className="swiper blog-sldr"
            data-aos="fade-in"
            data-aos-duration="800"
            data-aos-once="true"
            data-aos-delay="800"
          >
            <div className="swiper-wrapper">
              {postsData.map((post) => (
                <div className="swiper-slide">
                  <a href={`/blog/${post.slug}`}>
                    <div className="blog-bx" key={post.id}>
                      <div className="blg-content-dv">
                        <div className="date-box">
                          <p>
                            {post.category} · {post.publishDate}
                          </p>
                          <img
                            className="Blog_close_icon"
                            src={Blog_close_icon}
                            alt="Blog_close_icon"
                          />
                        </div>
                        <h2 className="post-ttl clamp-1">{post.title}</h2>
                        <div className="blg-inner-dv blopen">
                          <p>{post.short_description}</p>
                          <a className="btn grey" href={`/blog/${post.slug}`}>
                            Read more
                          </a>
                        </div>
                      </div>
                      <img
                        className="featur-img featur-img1"
                        src={post.featureImage}
                        alt="blog1"
                      />
                    </div>
                  </a>
                </div>
              ))}
              {/* <div className="swiper-slide">
                                    <div className="blog-bx">
                                        <div className="blg-content-dv">
                                            <div className="date-box">
                                                <p>Blog · 2024-06-29 </p>
                                                <img className="Blog_close_icon" src={Blog_close_icon} alt="Blog_close_icon" />
                                            </div>
                                            <h2 className="post-ttl">Connecting Markets: The Benefits of Rail Transport Services from Mundra to Delhi</h2>
                                            <div className="blg-inner-dv blopen">
                                                <p>Introduction
                                                    Rail transport from Gujarat to North India is crucial for linking industries and markets, and MRS Supply Chain is enhancing this vital connection with their innovative combined road and rail solutions from Mundra Port. </p>
                                                <a className="btn grey" href="/blog/connecting-markets-the-benefits-of-rail-transport-services-from-mundra-to-delhi">Read more</a>
                                            </div>
                                        </div>
                                        <img className="featur-img" src={blog2} alt="blog2" />
                                    </div>
                                </div> */}

              {/* <div className="swiper-slide">
                                    <div className="blog-bx" key={post.id}>
                                        <div className="blg-content-dv">
                                            <div className="date-box">
                                                <p>{post.category}  ·  {post.publishDate}</p>
                                                <img className="Blog_close_icon" src={Blog_close_icon} alt="Blog_close_icon" />
                                            </div>
                                            <h2 className="post-ttl">{post.title}</h2>
                                            <div className="blg-inner-dv blopen">
                                                <p>{post.short_description}</p>
                                                <a className="btn grey" href={`/blog/${post.slug}`}>Read more</a>
                                            </div>
                                        </div>
                                        <img className="featur-img featur-img1" src={post.featureImage} alt="blog1" />
                                    </div>
                                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

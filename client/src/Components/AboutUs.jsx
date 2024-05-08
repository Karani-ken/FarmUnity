import React from "react";

function AboutUs() {
  return (
    <div style={{ margin: "2% 5%" }} className="text-center">
      <h1 className="fw-bold" style={{ color: "#6A6666" }}>
        About Us
      </h1>
      <div className="row">
        <div className="col-lg-6">
          <p
            className="text-start"
            style={{ fontSize: "20px", lineHeight: "40px",color:'#6A6666' }}
          >
            Cultivating Excellence: Our Farm-to-Table Story At Farm Fresh
            Fiesta, we are passionate about providing you with the finest
            farm-fresh produce. Our journey begins at local farms, where
            dedicated growers cultivate the very best nature has to offer. With
            care and commitment, we select the ripest, most flavorful treasures
            to share with you. Our mission is simple: to bring the farm to your
            table. We bridge the gap between producers and consumers, ensuring
            that you have access to a vibrant selection of freshly harvested,
            locally-sourced fruits and vegetables. We take pride in our role as
            your trusted source for farm produce. Our commitment to quality,
            sustainability, and supporting local agriculture runs deep. With
            every bite, you can taste the dedication of our partner farmers and
            the love we put into delivering nature's best straight to your
            kitchen.
          </p>         
        </div>
        <div className="col-lg-6">
          <img
            src="https://cdn.pixabay.com/photo/2016/05/26/14/50/delivery-1417310_640.png"
            alt=""
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

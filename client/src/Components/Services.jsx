import React from "react";

function Services() {
  return (
    <div className="text-center" style={{ margin: " 0 5%" }}>
      <h1 className="fw-bold" style={{ color: "#6A6666" }}>
        Services
      </h1>
      <div className="d-lg-flex flex-wrap justify-content-around my-5">
        <div className="card shadow m-4" style={{ width: "18rem",border:'none' }}>
          <div className="card-body">
            <h5 className="card-title mb-3" style={{fontSize:'32px',fontWeight:'600', color:'#6A6666'}}>Selling</h5>           
            <p className="card-text" style={{fontSize:'16px',lineHeight:'35px',fontWeight:'400'}}>
            Bringing the farm to your table, we offer a
             bountiful selection of fresh, farm-grown produce,
             harvested with care and delivered to your 
             doorstep for a taste of authentic, farm-fresh goodness.
            </p>           
          </div>
        </div>
        <div className="card shadow m-4" style={{ width: "18rem",border:'none' }}>
          <div className="card-body">
            <h5 className="card-title mb-3" style={{fontSize:'32px',fontWeight:'600', color:'#6A6666'}}>Deliveries</h5>           
            <p className="card-text" style={{fontSize:'16px',lineHeight:'35px',fontWeight:'400'}}>
            Bringing the farm to your table, we offer a
             bountiful selection of fresh, farm-grown produce,
             harvested with care and delivered to your 
             doorstep for a taste of authentic, farm-fresh goodness.
            </p>           
          </div>
        </div>
        <div className="card shadow m-4" style={{ width: "18rem",border:'none' }}>
          <div className="card-body">
            <h5 className="card-title mb-3" style={{fontSize:'32px',fontWeight:'600', color:'#6A6666'}}>Advertising</h5>           
            <p className="card-text" style={{fontSize:'16px',lineHeight:'35px',fontWeight:'400'}}>
            Bringing the farm to your table, we offer a
             bountiful selection of fresh, farm-grown produce,
             harvested with care and delivered to your 
             doorstep for a taste of authentic, farm-fresh goodness.
            </p>           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

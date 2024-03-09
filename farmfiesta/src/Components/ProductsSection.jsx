import React from "react";

function ProductsSection() {
  return (
    <div className="text-center" style={{ margin: " 0 5%" }}>
      <h1 className="fw-bold" style={{ color: "#6A6666" }}>
        Our Products
      </h1>
      <div className="d-lg-flex flex-wrap justify-content-around my-5">
        <div className="card m-2 shadow-lg" style={{width: '18rem',background:'#f5f5f5',border:"none"}}>
          <img className="card-img-top" src="https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_640.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Vegetables</h5>
            <p className="card-text">
            Explore a colorful world of fresh, locally-sourced 
            vegetables, ready to fill your cart with health and flavor.
            </p>
            <a href="#" className="btn btn-primary" style={{background:'#39C758',border:'none'}}>
              Find out more
            </a>
          </div>
        </div>
        <div className="card m-2 shadow-lg" style={{width: '18rem',background:'#f5f5f5',border:"none"}}>
          <img className="card-img-top" src="https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_640.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Fruits</h5>
            <p className="card-text">
            Explore a colorful world of fresh, locally-sourced 
            vegetables, ready to fill your cart with health and flavor.
            </p>
            <a href="#" class="btn btn-primary" style={{background:'#39C758',border:'none'}}>
              Find out more
            </a>
          </div>
        </div>
        <div className="card m-2 shadow-lg" style={{width: '18rem',background:'#f5f5f5',border:"none"}}>
          <img className="card-img-top" src="https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_640.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Others</h5>
            <p className="card-text">
            Explore a colorful world of fresh, locally-sourced
             vegetables, ready to fill your cart with health and flavor.
            </p>
            <a href="#" class="btn btn-primary" style={{background:'#39C758',border:'none'}}>
              Find out more
            </a>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default ProductsSection;

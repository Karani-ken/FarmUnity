import React from "react";

function Footer() {
  return (
    <div style={{ background: "#6A6666" }}>
      <div className="row text-white" style={{ margin: "0 5%" }}>
        <div className="col-lg-4 text-center">
          <h3>Contacts</h3>
          <ul style={{listStyle:'none'}} className="text-start">
            <li>Telephone: 0755995669</li>
            <li>Email: kenneth0karani@gmail.com</li>
          </ul>
        </div>
        <div className="col-lg-4 text-center">
          <h3>Userful Links</h3>
          <ul style={{listStyle:'none'}} className="text-start">
            <li>home</li>
            <li>advertise with us</li>
            <li>register</li>
          </ul>
        </div>
        <div className="col-lg-4 text-center">
          <h3>Socials</h3>
          <ul style={{listStyle:'none'}} className="text-start">
            <li>Facebook:</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

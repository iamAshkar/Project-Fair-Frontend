import React, { useEffect, useState } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { GiLaptop } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


function Header() {
  const [token, setToken] = useState(false);

  const navigate = useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [token]);
  return (
    <div>
       { <MDBNavbar light bgColor="black">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/" className="text-light fs-2 m-2">
              <GiLaptop className="text-light fs-1" />
              Project Fair
            </MDBNavbarBrand>

            <a href="/login">
              <button onClick={logout} type="submit" class="btn btn-dark">
              <CiLogout className="fs-1" />

              </button>
            </a>
          </MDBContainer>
        </MDBNavbar>}
        {/* <MDBNavbar light bgColor="black">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/" className="text-light fs-2 m-2">
              <GiLaptop className="text-light fs-1" />
              Project Hub
            </MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar> */}
    </div>
  );
}

export default Header;

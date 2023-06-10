import React, { useState, useEffect } from "react";
import { fetchUser } from "../../api/user";
import { useParams } from "react-router-dom";
import Spiner from "../../components/Spiner/Spiner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { BASE_URL } from "../../api/constants";
import "./profile.css";
import { FaEnvelope, FaMobile, FaUser, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const [userprofile, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await fetchUser(id);

    if (response.status === 200) {
      setUserProfile(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);
  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats pl-10">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profileImg}`}
                      alt=""
                    />
                  </div>
                </div>
              </Row>

  <div className="container">
    <div className="row">
      <div className="col-12">
        <h3>{userprofile.fname + userprofile.lname}</h3>
      </div>
      <div className="col-12">
        <h4 className="d-flex align-items-center">
          <FaEnvelope className="me-2" />
          <span>{userprofile.email}</span>
        </h4>
      </div>
      <div className="col-12">
        <h5 className="d-flex align-items-center">
          <FaMobile className="me-2" />
          <span>{userprofile.phoneNumber}</span>
        </h5>
      </div>
      <div className="col-12">
        <h4 className="d-flex align-items-center">
          <FaUser className="me-2" />
          <span>{userprofile.gender}</span>
        </h4>
      </div>
      <div className="col-12">
        <h4 className="d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" />
          <span>{userprofile.location}</span>
        </h4>
      </div>
    </div>
  </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;

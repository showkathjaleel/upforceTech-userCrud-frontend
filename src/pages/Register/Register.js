import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
// import { useNavigate } from "react-router-dom/dist";
import { addData } from "../../context/contextProvider";
import Spiner from "../../components/Spiner/Spiner";
import { ToastContainer, toast } from "react-toastify";
// import { addUser } from "../../api/user";
import axios from "axios";
import { BASE_URL } from "../../api/constants";

const Register = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);
  // const navigate = useNavigate();

  const { userAdd, setUserAdd } = useContext(addData);

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputdata;


    // ------------------validation------------------

    if (fname === "") {
      toast.error("First name is Required !");
    } else if (lname === "") {
      toast.error("Last name is Required !");
    } else if (email === "") {
      toast.error("Email is Required !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (mobile === "") {
      toast.error("Mobile is Required !");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f");
    } else if (gender === "") {
      toast.error("Gender is Required !");
    } else if (image === "") {
      toast.error("Profile Picture is Required !");
    } else if (location === "") {
      toast.error("location is Required !");
    } else {
      const formdata = new FormData();
      formdata.append("fname", fname);
      formdata.append("lname", lname);
      formdata.append("email", email);
      formdata.append("mobile", mobile);
      formdata.append("gender", gender);
      formdata.append("user_profile", image);
      formdata.append("location", location);
      // const response = await addUser(data);
      console.log(formdata, "formdata");
  
      const response = await axios.post(`${BASE_URL}/user/add-user`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response, "response");
      if (response.status === 201) {
        setUserAdd(response.data)
        // navigate('/')
         toast("User Added Successfully");
      }
    };
    }



  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img
                src={preview ? preview : "/man.png"}
                className="h-24 w-24"
                alt="img"
              />
            </div>

            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputdata.fname}
                    onChange={handleInputValue}
                    placeholder="Enter FirstName"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputdata.lname}
                    onChange={handleInputValue}
                    placeholder="Enter LastName"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputdata.email}
                    onChange={handleInputValue}
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputdata.mobile}
                    onChange={handleInputValue}
                    placeholder="Enter Mobile"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={handleInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={handleInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfile}
                    placeholder="Select Your Profile"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={inputdata.location}
                    onChange={handleInputValue}
                    placeholder="Enter Your Location"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;

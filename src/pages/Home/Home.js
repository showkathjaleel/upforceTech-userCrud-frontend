import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spiner from "../../components/Spiner/Spiner";
import Tables from "../../components/Tables/Tables";
import { useNavigate } from "react-router-dom";
import { usergetfunc, deleteFunc , exporttocsvfunc, fetchAllUser } from "../../api/user";
import { toast } from "react-toastify";
import { addData, editData, deleteData } from "../../context/contextProvider";
import Alert from "react-bootstrap/Alert";
import "./home.css";
import axios from "axios";
import { BASE_URL } from "../../api/constants";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { userAdd, setUserAdd } = useContext(addData);
  const { userEdit, setUserEdit } = useContext(editData);
  const { userDelete, setUserDelete } = useContext(deleteData);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/add-user");
  };

  // get user
  const userGet = async () => {
    const response = await usergetfunc(page);
    const resp=await fetchAllUser()
    const [responseData, fetchAllUserData] = await Promise.all([response, resp]);

    if (responseData.status === 200) {
      setUserData(fetchAllUserData.data);
      setFilteredUsers(response.data.paginatedUsers);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  // user delete
  const deleteUser = async (id) => {
   const result=await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })
   
   console.log(result,'result')
    if (result.isConfirmed){
    const response = await deleteFunc(id);

    if(response.status === 200){
      userGet();
       setUserDelete(response.data)
      Swal.fire('Deleted!', 'The user has been deleted.', 'success');
    }else{
      toast.error("error")
    }
    }
    
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    console.log(response,'responseeeee')
    if(response.status === 200){
      window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("error !")
    }
  };

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [searchTerm, page]);

  const handleSearch = (searchTerm, userdata) => {
    if (searchTerm === "") {
      toast.error("Please enter search text");
    } else {
      console.log(searchTerm);
      const filteredData = userdata.filter(
        (user) =>
          user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredData)
    }
  };
  return (
    <>
      {/* {userAdd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {userAdd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )} */}

      {userEdit ? (
        <Alert variant="primary" onClose={() => setUserEdit("")} dismissible>
          {userEdit.fname.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {/* {userDelete ? (
        <Alert variant="danger" onClose={() => setUserDelete("")} dismissible>
          {userDelete.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )} */}
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  onClick={() => {
                    handleSearch(searchTerm, userdata);
                  }}
                  variant="success"
                  className="search_btn"
                >
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                {" "}
                <i class="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
                Export To Csv
              </Button>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            //userdata={userdata}
            userdata={filteredUsers}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;

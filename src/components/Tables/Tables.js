// import Row from "react-bootstrap/Row";
// import Card from "react-bootstrap/Card";
// import Table from "react-bootstrap/Table";

// import { ToastContainer, toast } from "react-toastify";
// import Paginations from "../Pagination/Pagination";
// import "./table.css";
// import Button from "react-bootstrap/esm/Button";
// import defaultProfilePicture from "../../assets/man.png";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../../api/constants";

// const Tables = ({
//   userdata,
//   deleteUser,
//   userGet,
//   handlePrevious,
//   handleNext,
//   page,
//   pageCount,
//   setPage,
// }) => {
//   const handleDelete = (id) => {
//     deleteUser(id);
//   };
//   return (
//     <div className="container">
//       <Row>
//         <div className="col mt-0">
//           <Card className="shadow">
//             <Table className="align-items-center" responsive="sm">
//               <thead className="thead-dark">
//                 <tr className="table-dark">
//                   <th>ID</th>
//                   <th>FullName</th>
//                   <th>Email</th>
//                   <th>Gender</th>
//                   <th>Profile</th>
//                   <th>View</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userdata.length > 0 ? (
//                   userdata.map((element, index) => {
//                     return (
//                       <>
//                         <tr>
//                           <td>{index + 1 + (page - 1) * 4}</td>
//                           <td>{element.fname + " " + element.lname}</td>
//                           <td>{element.email}</td>
//                           <td>{element.gender == "Male" ? "M" : "F"}</td>

//                           <td className="img_parent">
//                             <img
//                               src={
//                                 element.profileImg
//                                   ? `${BASE_URL}/uploads/${element.profileImg}`
//                                   : defaultProfilePicture
//                               }
//                               alt="img"
//                             />
//                           </td>
//                           {/* /:id */}
//                           <td>
//                             {" "}
//                             <Link to={`/userprofile/${element._id}`}>
//                               <Button variant="success">
//                                 {" "}
//                                 &nbsp; View &nbsp;
//                               </Button>{" "}
//                             </Link>
//                           </td>

//                           <td>
//                             <Link to={`/edit-user/${element._id}`}>
//                               <Button variant="primary">
//                                 {" "}
//                                 <i
//                                   class="fa-solid fa-pen-to-square"
//                                   style={{ color: "blue" }}
//                                 ></i>
//                                 &nbsp; Edit &nbsp;
//                               </Button>{" "}
//                             </Link>
//                           </td>
//                           <td>
//                             <Button
//                               variant="danger"
//                               onClick={() => handleDelete(element._id)}
//                             >
//                               {" "}
//                               <i
//                                 class="fa-solid fa-pen-to-square"
//                                 style={{ color: "blue" }}
//                               ></i>
//                               &nbsp; Delete &nbsp;
//                             </Button>
//                           </td>
//                         </tr>
//                       </>
//                     );
//                   })
//                 ) : (
//                   <div className="no_data text-center">NO Data Found</div>
//                 )}
//               </tbody>
//             </Table>
//             <Paginations
//               handlePrevious={handlePrevious}
//               handleNext={handleNext}
//               page={page}
//               pageCount={pageCount}
//               setPage={setPage}
//             />
//           </Card>
//         </div>
//       </Row>
//       <ToastContainer />
//     </div>
//   );
// };
// export default Tables;






import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../Pagination/Pagination";
import "./table.css";
import Button from "react-bootstrap/esm/Button";
import defaultProfilePicture from "../../assets/man.png";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/constants";

const Tables = ({
  userdata,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col xs={12} mt={0}>
          <Card className="shadow">
            <Table responsive="sm" striped bordered>
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userdata.length > 0 ? (
                  userdata.map((element, index) => (
                    <tr key={element._id}>
                      <td>{index + 1 + (page - 1) * 4}</td>
                      <td>{element.fname + " " + element.lname}</td>
                      <td>{element.email}</td>
                      <td>{element.gender === "Male" ? "M" : "F"}</td>
                      <td className="img_parent">
                        <img
                          src={
                            element.profileImg
                              ? `${BASE_URL}/uploads/${element.profileImg}`
                              : defaultProfilePicture
                          }
                          alt="img"
                        />
                      </td>
                      <td>
                        <div className="d-flex justify-content-around">
                          <Link to={`/userprofile/${element._id}`}>
                            <Button variant="success">View</Button>
                          </Link>
                          <Link to={`/edit-user/${element._id}`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(element._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      NO Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Paginations
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Tables;

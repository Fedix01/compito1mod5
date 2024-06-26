import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../AlertProvider/AlertProvider';
import { FaComments } from "react-icons/fa";
import '../MyNavbar/MyNavbar.css';
import { PiNotePencilLight } from "react-icons/pi";
import { SearchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { GoogleContext } from '../GoogleUserProvider/GoogleUserProvider';


export default function MyNavbar({ searchTerm, setSearchTerm, setSearchAuthors, searchAuthors, authorPage }) {
    const navigate = useNavigate();
    const { alert } = useContext(alertContext);
    const [variant, setVariant] = useState("");

    const [user, setUser] = useState([]);

    const { googleUser } = useContext(GoogleContext);

    const { searchBar } = useContext(SearchBarContext);


    useEffect(() => {
        if (alert === "Valore aggiunto") {
            setVariant("success")
        } else if (alert === "Autore eliminato") {
            setVariant("danger")
        } else if (alert === "Autore modificato") {
            setVariant("primary")
        }
    }, [alert])

    const fetchUserData = (user) => {

        if (user) {
            setUser(user);
            console.log(user);
        } else {
            console.log("Nessun user");
        }
    };

    const fetchData = () => {
        const userLog = localStorage.getItem("user") || localStorage.getItem("googleUser");
        if (userLog) {
            const newUser = JSON.parse(userLog);
            fetchUserData(newUser);
        } else {
            console.log("Nessun user")
        }
    };

    useEffect(() => {
        fetchData()

    }, []);

    useEffect(() => {
        if (user && user.avatar) {
            const img = new Image();
            img.src = user.avatar;
        }
    }, [user]);


    // useEffect(() => {
    //     const googleUserString = localStorage.getItem("userGoogle");
    //     if (googleUserString) {
    //         const newGoogleUser = JSON.parse(googleUserString);
    //         setGoogleUser(newGoogleUser);
    //     }
    // }, []);



    return (
        <>
            <Navbar bg="light" data-bs-theme="light" style={{ position: "sticky", top: 0, zIndex: 2, borderBottom: "1px solid lightgray" }} className='justify-content-between'>
                <div className='left-nav left-nav-responsive d-flex justify-content-center align-items-center'>

                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                        <FaComments />
                        <span className='ms-3'>Strive Blog</span>
                    </Navbar.Brand>
                    <Nav className='d-none d-md-flex'>
                        <Nav.Link onClick={() => navigate("/")}>Blog Posts</Nav.Link>
                        <Nav.Link onClick={() => navigate("/authors")}>Autori</Nav.Link>
                    </Nav>
                </div>
                {searchBar &&
                    <Form className="d-flex justify-content-center" >
                        <Form.Control className="nav-input nav-input-responsive form-control me-2" type="search" placeholder="Cerca blog..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></Form.Control>
                    </Form>
                }
                {authorPage &&
                    <Form className="d-flex justify-content-center" >
                        <Form.Control className="nav-input nav-input-responsive form-control me-2" type="search" placeholder="Cerca autori..." onChange={(e) => setSearchAuthors(e.target.value)} value={searchAuthors}></Form.Control>
                    </Form>
                }

                <div>
                    {user && user.length !== 0 ? (
                        <>
                            <div className='right-nav right-nav-responsive d-flex justify-content-center align-items-center'>
                                <Button variant='success' className='newPost-responsive' onClick={() => navigate("/newPost")}>Scrivi nuovo post</Button>
                                <Button variant='transparent' className='d-flex align-items-center' onClick={() => navigate("/me")}>{user.nome} {user.cognome}
                                    <img src={user.avatar ? user.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAUDAQIH/8QAMBABAAIBAgQEBAQHAAAAAAAAAAECEQMhBDFBYQUSIlEyUnGRE7Hh8BQzU2JygaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD9UAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeTON3HU4vSp180+0A7iP+Pj+nP3fdON0rfFFq/WAUjnTX0rz6dSHT9wAAAAAAAAAAAAAAAAAAD1PxHE10YxztPKPY4vX/C09vityZszM280zmfcH3qa+pqRi1vT8scnP8vYCAfQCBtzxuo0OKtpTFb+qv5JzJBsxaJiJjfbOXqHgNXEzpT13r2XAAAAAAAAAAAAAAAA8mcRM+2QZvG6nn17Y5V2/24E7zMz1nIQAFAAAAH1S00vFoneGxE5jPZi9GxT4K/SEH0AAAAAAAAAAAAAA+NXbS1J/tl9uet/KvEfLIMkBQAAAAAAa2jOdGn+MMlraGfwqRPywg6AAAAAAAAAAAAAAI/EZmPJGdt1iTxGudOto6TuCABQAAAAAAW+HTOLxmcRhEv8ADqzGneZ6ygrAAAAAAAAAAAAAAc+IpOpoWrHOY2dDqDGtW1Z9UTHbDxd4hTNa3xvHplCtAAAAAAHta2tPpiZ7YavD0nT0KVnnEbp/D6Yra+N59MLOqAAAAAAAAAAAAAAAADy9IvSa25TGGRek6dprbnDYReI1jGnbrmYBEAoAAPqlJ1LxWvOf+Plb4dWMaluuYgFlKRSkVryiMPQQAAAAAAAAAAAAAAAO3UDP6ofELVmKVi0Zicz2ecbrXi3kpbFMb46pPfuQAFAABZ4fesRqVmYznMd0Yg2s/oIOC1rzbyXtmmNs9F/bqAAAAAAAAAAAHLnjHWU2rxlKbU9du3IFMe2N3ze9aR67Vr2lnanFa14x5vLHtDhO85mcz3IL9TjqR8Eeb67JtXidXUjFrYj2jZxCAAoAAAAAAO2lxOrpxitsx7Tu4iQX6fHUn448v03U0vW8ei1bdoY5G05icT2INqfbG4zNPitakY83mj2lVpcZS+1/RbvyIKQ58sY6SAAAAZ2+4M/jteZtOnWZ8sbT3lK9mZm0zPOXhAAUAAAAAAAAAAAAAAAAVcFrzFo07Zms7RnpLQY0TMWiY6NnO32QAAf/2Q=="} alt=""
                                        style={{ width: "40px", borderRadius: "50%", marginLeft: "1rem" }} className='d-none d-md-flex' />
                                </Button>
                            </div>
                        </>) : (
                        <>
                            <div className='right-nav right-nav-responsive d-flex justify-content-center align-items-center'>
                                <Button variant='transparent' className=' d-none d-md-flex align-items-center' onClick={() => navigate("/newPost")}>
                                    <PiNotePencilLight className='me-1' style={{ fontSize: "30px" }} />
                                    <span> Scrivi</span></Button>
                                <Button variant='success' className='sign-up d-none d-md-flex' onClick={() => navigate("/signIn")}>Registrati</Button>
                                <Button variant='transparent' onClick={() => navigate("/signUp")}>
                                    <span className='responsive-log-in'>Log In</span>
                                    <span className='ms-3'>
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAUDAQIH/8QAMBABAAIBAgQEBAQHAAAAAAAAAAECEQMhBDFBYQUSIlEyUnGRE7Hh8BQzU2JygaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD9UAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeTON3HU4vSp180+0A7iP+Pj+nP3fdON0rfFFq/WAUjnTX0rz6dSHT9wAAAAAAAAAAAAAAAAAAD1PxHE10YxztPKPY4vX/C09vityZszM280zmfcH3qa+pqRi1vT8scnP8vYCAfQCBtzxuo0OKtpTFb+qv5JzJBsxaJiJjfbOXqHgNXEzpT13r2XAAAAAAAAAAAAAAAA8mcRM+2QZvG6nn17Y5V2/24E7zMz1nIQAFAAAAH1S00vFoneGxE5jPZi9GxT4K/SEH0AAAAAAAAAAAAAA+NXbS1J/tl9uet/KvEfLIMkBQAAAAAAa2jOdGn+MMlraGfwqRPywg6AAAAAAAAAAAAAAI/EZmPJGdt1iTxGudOto6TuCABQAAAAAAW+HTOLxmcRhEv8ADqzGneZ6ygrAAAAAAAAAAAAAAc+IpOpoWrHOY2dDqDGtW1Z9UTHbDxd4hTNa3xvHplCtAAAAAAHta2tPpiZ7YavD0nT0KVnnEbp/D6Yra+N59MLOqAAAAAAAAAAAAAAAADy9IvSa25TGGRek6dprbnDYReI1jGnbrmYBEAoAAPqlJ1LxWvOf+Plb4dWMaluuYgFlKRSkVryiMPQQAAAAAAAAAAAAAAAO3UDP6ofELVmKVi0Zicz2ecbrXi3kpbFMb46pPfuQAFAABZ4fesRqVmYznMd0Yg2s/oIOC1rzbyXtmmNs9F/bqAAAAAAAAAAAHLnjHWU2rxlKbU9du3IFMe2N3ze9aR67Vr2lnanFa14x5vLHtDhO85mcz3IL9TjqR8Eeb67JtXidXUjFrYj2jZxCAAoAAAAAAO2lxOrpxitsx7Tu4iQX6fHUn448v03U0vW8ei1bdoY5G05icT2INqfbG4zNPitakY83mj2lVpcZS+1/RbvyIKQ58sY6SAAAAZ2+4M/jteZtOnWZ8sbT3lK9mZm0zPOXhAAUAAAAAAAAAAAAAAAAVcFrzFo07Zms7RnpLQY0TMWiY6NnO32QAAf/2Q=="
                                            alt="" style={{ width: "45px", borderRadius: "50%" }} />
                                    </span></Button>
                            </div>
                        </>
                    )
                    }
                </div>
            </Navbar>
            <div style={{ position: "sticky", top: "56px", zIndex: 2 }}>
                {alert &&
                    <Alert variant='info'>
                        {alert}
                    </Alert>}

            </div>
        </>
    );

}


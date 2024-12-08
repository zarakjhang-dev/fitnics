import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsLock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
      <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
      >
        <FormContainer style={{ maxWidth: "400px", margin: "auto" }}>
          <h1 className="text-center mb-4" style={{ color: "#1dda1d" }}>
            Log In
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
              />
            </Form.Group>

            {isLoading && <Loader />}

            <Button
                variant="success"
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "5px",
                  backgroundColor: "#1dda1d",
                  border: "none",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#16b916")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#1dda1d")}
            >
              <BsLock /> Login
            </Button>

            <Row className="py-3 text-center">
              <Col>
                New Customer?{" "}
                <Link to="/pages/register" style={{ color: "#1dda1d" }}>
                  Register
                </Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
        <Footer />
      </div>
  );
};

export default Login;

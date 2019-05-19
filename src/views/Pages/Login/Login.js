import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/img/brand/logo.png';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Center from 'react-center';

class Login extends Component {
  handleClick(event) {
    var apiBaseUrl = "http://35.188.204.202:8081/administrator/login";
    var self = this;
    var reqbody = {
      "username": this.state.username,
      "password": this.state.password
    }
    axios.post(apiBaseUrl, reqbody)
      .then(function (response) {
        // alert(JSON.stringify(response.data.token));
        console.log(JSON.stringify(response.data));
        localStorage.setItem('auth', true)
        localStorage.setItem('token', response.data.token)
        window.location.href = '/';
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
    // window.confirm('Are you sure you wish to delete this item? ' + this.state.authed)
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Center>
              <img src={logo} alt="Logo" width="100" height="100" />
            </Center>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={(event) => this.setState({ username: event.target.value })} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={(event) => this.setState({ password: event.target.value })} />
                      </InputGroup>
                    </Form>
                    <Row className="justify-content-center">
                      <Button color="primary" className="px-4" onClick={(event) => this.handleClick(event)}>Login</Button>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Logout extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.logout();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <h1>Logout</h1>
        </Container>
      </div>
    );
  }
}

export default Logout;

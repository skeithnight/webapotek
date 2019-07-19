import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
class Dashboard extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <h1>Data Obat</h1>
                  <footer>
                    <Link to="/obat">
                      <Button block color="link">Detail</Button>
                    </Link>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <h1>Data Apotek</h1>
                  <footer>
                    <Link to="/apotek">
                      <Button block color="link">Detail</Button>
                    </Link>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="4">
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <h1>Data Apoteker</h1>
                  <footer>
                    <Link to="/staffApotek">
                      <Button block color="link">Detail</Button>
                    </Link>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <h1>Data Transaksi</h1>
                  <footer>
                    <Link to="/transaksi">
                      <Button block color="link">Detail</Button>
                    </Link>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <h1>Data Customer</h1>
                  <footer>
                    <Link to="/customer">
                      <Button block color="link">Detail</Button>
                    </Link>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

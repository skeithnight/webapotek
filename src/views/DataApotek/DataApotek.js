import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  Button, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import { baseUrl } from "../../data.js";

// Import React Table
import { MDBDataTable, MDBBtn } from 'mdbreact';
// First way to import
import { ClipLoader } from 'react-spinners';


class DataObat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      isLoading: false,
      error: null,
      tambah: false,
      hapus: false,
      nama: '',
      noIjin: '',
      isLoadingAddForm: false,
      isLoadingRemoveForm: false,
      idHapus: ''
    };

    this.toggleTambah = this.toggleTambah.bind(this);
    this.toggleHapus = this.toggleHapus.bind(this);
  }

  toggleTambah() {
    this.setState({
      tambah: !this.state.tambah,
    });
  }
  toggleHapus(id) {
    this.setState({
      hapus: !this.state.hapus,
      idHapus: id
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    var apiBaseUrl = baseUrl + "/valid-apotek";
    var self = this;

    axios({
      url: apiBaseUrl,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response =>
      response.data.map(data => ({
        nama: `${data.nama}`,
        noIjin: `${data.noIjin}`,
        opsi: [<Button color="danger" onClick={() => this.toggleHapus(data.id)} className="mr-1"><i className="fa fa-trash mr-2 blue-text" aria-hidden="true"></i></Button>]
      }))
    )
      // Let's make sure to change the loading state to display the data
      .then(datas => {
        this.setState({
          datas,
          isLoading: false
        });
      })
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value; this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    var dataInput = { nama: this.state.nama, noIjin: this.state.noIjin };
    this.setState({ isLoadingAddForm: true });

    var apiBaseUrl = baseUrl + "/valid-apotek";
    var self = this;

    axios({
      url: apiBaseUrl,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      data: dataInput
    })
      .then(response => { window.location.href = '/'; }
      )
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => this.setState({ error, isLoadingForm: false }));
  }

  handleRemove() {

    this.setState({ isLoadingRemoveForm: true });

    var apiBaseUrl = baseUrl + "/valid-apotek/" + this.state.idHapus;
    var self = this;

    console.log(apiBaseUrl);
    axios({
      url: apiBaseUrl,
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
    })
      .then(response => { window.location.href = '/'; }
      )
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => this.setState({ error, isLoadingRemoveForm: false }));
  }

  render() {
    const { datas, isLoading, error, isLoadingAddForm, isLoadingRemoveForm } = this.state;
    let inputBtn;
    let removeBtn;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (isLoadingAddForm) {
      inputBtn = <ClipLoader sizeUnit={"px"} color={'#123abc'} loading={this.state.loading} />;
    } else {
      inputBtn = <Button color="primary" onClick={this.handleSubmit.bind(this)}>Simpan</Button>;
    }
    if (isLoadingRemoveForm) {
      removeBtn = <ClipLoader sizeUnit={"px"} color={'#123abc'} loading={this.state.loading} />;
    } else {
      removeBtn = <Button color="danger" onClick={this.handleRemove.bind(this)}>Ya</Button>;
    }

    const data = {
      columns: [
        {
          label: 'Nama Apotek',
          field: 'nama',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nomor Ijin',
          field: 'noIjin',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Opsi',
          field: 'opsi',
          width: 100
        }
      ],
      rows: this.state.datas
    };
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Data Apotek</div>
          <div className="card-body">
            <Row className="align-items-right">
              <Col sm xs="12" className="text-center mt-3">
                <Button color="primary" onClick={this.toggleTambah} className="mr-1">
                  <i className="fa fa-plus"></i>&nbsp;Tambah Data
                </Button>
                <Modal isOpen={this.state.tambah} toggle={this.toggleTambah}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleTambah}>Tambah Data</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Nama Apotek</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="nama" name="nama" placeholder="Nama Apotek" value={this.state.nama}
                            onChange={this.handleChange.bind(this)} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Nomor Ijin</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="noIjin" name="noIjin" placeholder="Nomor Ijin" value={this.state.noIjin}
                            onChange={this.handleChange.bind(this)} />
                        </Col>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    {inputBtn}
                    <Button color="secondary" onClick={this.toggleTambah}>Tidak</Button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.hapus} toggle={this.toggleHapus}
                  className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleHapus}>Hapus Data</ModalHeader>
                  <ModalBody>
                    Apakah yakin akan menghapus data ini?
                  </ModalBody>
                  <ModalFooter>
                    {removeBtn}
                    <Button color="secondary" onClick={() => { this.toggleHapus(this.state.idHapus) }}>Tidak</Button>
                  </ModalFooter>
                </Modal>
              </Col>
            </Row>
            <br />
            <MDBDataTable
              striped
              bordered
              small
              data={data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataObat;

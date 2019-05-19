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
      dataapotek: [],
      isLoading: false,
      error: null,
      tambah: false,
      hapus: false,
      nama: '',
      apotek: '',
      kedaluwarsa: '',
      harga: '',
      jumlah: '',
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

  parseDate(milis) {
    var d = new Date(milis);
    var ds = d.toLocaleDateString();
    return ds
  }
  parseDateMilis(string) {
    var d = new Date(string);
    var n = d.getMilliseconds();
    return d.getTime()
  }

  passChild(obj) {
    // var data = JSON.stringify(obj);
    obj.apotek.map(item => { return item.name });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    // obat
    var apiBaseUrl = baseUrl + "/produk";
    var self = this;

    axios({
      url: apiBaseUrl,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response =>
      response.data.map(data => ({
        id: `${data.id}`,
        nama: `${data.nama}`,
        apotek: `${data.apotek == null ? "" : data.apotek['name']}`,
        // kedaluwarsa: data.kedaluwarsa,
        kedaluwarsa: this.parseDate(data.kadaluwarsa),
        harga: `${data.harga}`,
        jumlah: `${data.jumlah}`,
        opsi: [<Button color="danger" onClick={() => this.toggleHapus(data.id)} className="mr-1"><i className="fa fa-trash mr-2 blue-text" aria-hidden="true"></i></Button>]
      }))
    )
      // Let's make sure to change the loading state to display the data
      .then(datas => {
        console.log(datas);
        this.setState({
          datas,
          isLoading: false
        });
      })
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => this.setState({ error, isLoading: false }));

    // apotek
    var apiBaseUrl = baseUrl + "/apotek";
    var self = this;

    axios({
      url: apiBaseUrl,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response =>
      response.data.map(data => ({
        id: `${data.id}`,
        name: `${data.name}`
      }))
    )
      // Let's make sure to change the loading state to display the data
      .then(dataapotek => {
        console.log(dataapotek);
        this.setState({
          dataapotek
        });
      })

  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value; this.setState({
      [name]: value
    });
  }


  handleSubmit() {

    var dataInput = {
      nama: this.state.nama,
      apotek: { id: this.state.apotek },
      kedaluwarsa: this.parseDateMilis(this.state.kedaluwarsa),
      // kedaluwarsa: this.state.kedaluwarsa,
      harga: parseInt(this.state.harga),
      jumlah: parseInt(this.state.jumlah),

    };
    this.setState({ isLoadingAddForm: true });

    console.log(dataInput);

    var apiBaseUrl = baseUrl + "/produk";
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

    var apiBaseUrl = baseUrl + "/produk/" + this.state.idHapus;
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
    const { datas, isLoading, error, isLoadingAddForm, isLoadingRemoveForm, dataapotek } = this.state;
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
          label: 'id',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Nama Obat',
          field: 'nama',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Apotek',
          field: 'apotek',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Kadaluwarsa',
          field: 'kedaluwarsa',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Harga',
          field: 'harga',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Jumlah',
          field: 'jumlah',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Opsi',
          field: 'opsi',
        }
      ],
      rows: this.state.datas
    };
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Data Obat</div>
          <div className="card-body">
            <Row className="align-items-right">
              <Col sm xs="12" className="text-center mt-3">
                {/* <Button color="primary" onClick={this.toggleTambah} className="mr-1">
                  <i className="fa fa-plus"></i>&nbsp;Tambah Data
                </Button> */}
                <Modal isOpen={this.state.tambah} toggle={this.toggleTambah}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleTambah}>Tambah Data</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Nama Obat</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="nama" name="nama" placeholder="Nama Obat" value={this.state.nama}
                            onChange={this.handleChange.bind(this)} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="apotek">Apotek</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" name="apotek" id="apotek" value={this.state.apotek}
                            onChange={this.handleChange.bind(this)}>
                            <option value="0">Pilih Apotek</option>
                            {dataapotek.map((item) => <option value={item.id}>{item.name}</option>)}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Jumlah</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" id="jumlah" name="jumlah" placeholder="Jumlah" value={this.state.jumlah}
                            onChange={this.handleChange.bind(this)} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Harga</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="harga" name="harga" placeholder="Harga" value={this.state.harga}
                            onChange={this.handleChange.bind(this)} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="date-input">Kadaluwarsa</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="date" id="kedaluwarsa" name="kedaluwarsa" value={this.state.kedaluwarsa}
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

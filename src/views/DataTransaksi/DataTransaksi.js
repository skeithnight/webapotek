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
      datatransaksi: [],
      isLoading: false,
      error: null,
      tambah: false,
      hapus: false,
      name: '',
      apotek: '',
      jk: '',
      ttl: '',
      noTelp: '',
      email: '',
      password: '',
      latitude: '',
      longitude: '',
      isLoadingAddForm: false,
      isLoadingRemoveForm: false,
      idHapus: ''
    };

    this.toggleHapus = this.toggleHapus.bind(this);
  }

  toggleHapus(id) {
    this.setState({
      hapus: !this.state.hapus,
      idHapus: id
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    // obat
    var apiBaseUrl = baseUrl + "/transaksi";
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
        namaObat: data.produk !=null ? `${data.produk[0].produk.nama}` : '',
        harga: data.produk !=null ? `${data.produk[0].produk.harga}` : '',
        apotek: data.apotek != null ? `${data.apotek.name}` : '',
        jumlah: data.produk !=null ? `${data.produk[0].jumlah}` : '',
        status: `${data.status}`,
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
  }
  

  handleRemove(){

    this.setState({ isLoadingRemoveForm: true });

    var apiBaseUrl = baseUrl + "/transaksi/"+this.state.idHapus;
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
    const { datas, isLoading, error, isLoadingRemoveForm } = this.state;
    let inputBtn;
    let removeBtn;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (isLoadingRemoveForm) {
      removeBtn = <ClipLoader sizeUnit={"px"} color={'#123abc'} loading={this.state.loading} />;
    } else {
      removeBtn = <Button color="danger" onClick={this.handleRemove.bind(this)}>Ya</Button>;
    }

    const data = {
      columns: [
        // {
        //   label: 'No',
        //   field: 'name',
        //   sort: 'asc',
        //   width: 150
        // },
        {
          label: 'id_tsk',
          field: 'id',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Nama Obat',
          field: 'namaObat',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Harga',
          field: 'harga',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Apotek',
          field: 'apotek',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Jumlah',
          field: 'jumlah',
          sort: 'asc',
          width: 100
        },

        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 100
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
          <div className="card-header">Data Transaksi</div>
          <div className="card-body">
            {/* <Row className="align-items-right">
              <Col sm xs="12" className="text-center mt-3">
                <Button color="primary">
                  <i className="fa fa-plus"></i>&nbsp;Tambah Data
                </Button>
              </Col>
            </Row> */}
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

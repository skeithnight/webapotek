import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Button, Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'

// Import React Table
import { MDBDataTable, MDBBtn } from 'mdbreact';

class DataObat extends Component {
  render() {
    const data = {
      columns: [
        {
          label: 'Id_obt',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nama Obat',
          field: 'position',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Jumlah',
          field: 'office',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Harga',
          field: 'age',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Kadaluarsa',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Opsi',
          field: 'opsi',
          width: 100
        }
      ],
      rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          opsi: [<Button color="danger"><i className="fa fa-trash mr-2 blue-text" aria-hidden="true"></i></Button>]
        },
        {
          name: 'Garrett Winters',
          position: 'Accountant',
          office: 'Tokyo',
          age: '63',
          date: '2011/07/25',
          opsi: [<Button color="danger"><i className="fa fa-trash mr-2 blue-text" aria-hidden="true"></i></Button>]
        }
      ]
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
            <br />
            {/* <MDBDataTable
              striped
              bordered
              small
              data={data}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DataObat;

import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Obat = React.lazy(() => import('./views/Obat'));
const DataApotek = React.lazy(() => import('./views/DataApotek'));
const DataStaffApotek = React.lazy(() => import('./views/DataStaff'));
const DataTransaksi = React.lazy(() => import('./views/DataTransaksi'));
const DataPengguna = React.lazy(() => import('./views/DataPengguna'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/obat', exact: true, name: 'Obat', component: Obat },
  { path: '/apotek', exact: true, name: 'DataApotek', component: DataApotek },
  { path: '/staffApotek', exact: true, name: 'DataStaffApotek', component: DataStaffApotek },
  { path: '/transaksi', exact: true, name: 'DataTransaksi', component: DataTransaksi },
  { path: '/customer', exact: true, name: 'DataCustomer', component: DataPengguna },

];

export default routes;

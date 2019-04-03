import React, { Fragment } from 'react';
import { Sidebar, AddNewDev, Map } from '../../components';

const Main = () => (
  <Fragment>
    <Sidebar />
    <AddNewDev />
    <Map />
  </Fragment>
);

export default Main;

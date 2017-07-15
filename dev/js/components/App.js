import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import SampleChart from '../containers/line-chart';
require('../../scss/style.scss');
require('../../scss/style.css');

const App = () => (
    <div>
        <h2> Chart </h2>
        <SampleChart/>
    </div>
);

export default App;

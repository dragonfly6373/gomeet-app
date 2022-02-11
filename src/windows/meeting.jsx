import React from 'react';
import ReactDom from 'react-dom';
import '/public/stylesheets/styles.scss';
import '/public/fonts/gomeeticons/gomeet-icons.css';

import MainContainer from '../imports/components/Main';
// import Demo from '../imports/demo';

var root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDom.render(<MainContainer />, root);

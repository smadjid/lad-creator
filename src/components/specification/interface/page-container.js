import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const InterfaceContext = React.createContext();
const PageContainer = (props) => {
  const [layout, setLayout] = useState([]);
  const interfaceContext = [layout, setLayout];

  const { children, value, index, ...other } = props;

  return (
    <InterfaceContext.Provider value={interfaceContext}>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
    </InterfaceContext.Provider>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default PageContainer;
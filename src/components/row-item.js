import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

export default function RowItem(props) {

  const { onClick } = props;
  const { icon } = props;

  return (
    <IconButton onClick={onClick} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0 }}>
      {icon}
    </IconButton>
  );
}

RowItem.propTypes = {
  onclick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired
};
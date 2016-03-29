import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

export default {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
  mirrorLabel: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: -6,
    fontSize: 12,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: Colors.red500,
  },
  fieldContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  tag: {
    background: Colors.grey300,
    padding: '5px 10px',
    display: 'inline-block',
    borderRadius: 20,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 2,
    cursor: 'pointer',
  },
};

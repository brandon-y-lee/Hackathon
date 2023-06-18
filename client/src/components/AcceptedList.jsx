import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ranking', headerName: 'Ranking', width: 70 },
  { field: 'seller', headerName: 'Seller', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  {
    field: 'rating',
    headerName: 'Seller Rating',
    type: 'number',
    width: 100,
  },
];

const AcceptedList = (props) => {
  console.log(props);
  const [accepted, setAccepted] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Fetch stakeholders from your backend
    // setAccepted(fetchAccepted);
  }, []);

  const handleRowClick = (param, event) => {
    setSelected(param.row);
  };

  return (
    <div style={{ height: 350, width: '50%' }}>
      {/* <DataGrid
        rows={accepted}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowClick={handleRowClick}
      /> */}
      <p> {props.text}</p>
      {selected && (
        <div>
          <h2>{selected.name}</h2>
          {/* Display more information about the selected stakeholder */}
        </div>
      )}
    </div>
  );
};

export default AcceptedList;
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Divider, 
  Grid,
  IconButton, 
  Menu,
  MenuItem,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Collapse, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { DataGrid, GridColumnHeaderFilterIconButton } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery } from "state/api";
import Header from "components/Header";
import Map from "components/Map";
// import Temp from "components/Temp";
// import TempComp from "components/TempComp";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/ActionMenu";
import FlexBetween from "components/FlexBetween";
import PrimaryButtons from "components/PrimaryButtons";
import AcceptedList from "components/AcceptedList";
import FlexTop from "components/FlexTop";
import Chat from "components/Chat";
import HalfWidth from "components/HalfWidth";
import HalfHeight from "components/HalfHeight";

const Transactions = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");
  const [text, setText] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const url = "https://7wzrynoxje.execute-api.us-west-1.amazonaws.com/v1/getWeather";

    async function fetchDataWithJsonBody(url = '', jsonBody = {}) {
        // The data we are going to send in our request
        const payload = {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody) // We convert the JSON body to a string
        };

        try {
            // We send the request
            const response = await fetch(url, payload);

            // We throw an error if the request was unsuccessful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // We convert the response to JSON
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error(`Failed to fetch from the URL ${url}. Error: ${error}`);
            return null;
        }
    }

    const jsonBody = {
        key1: 'value1',
    };

    

  function setVals()
  {
    fetchDataWithJsonBody(url, jsonBody)
        .then(data => setText(data.key1)) // JSON from `response.json()` call
        .catch(error => console.error(error));
  }

  // console.log(data);


  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedId);
  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

  useEffect(() =>  { 
    console.log("Locations!");
    console.log(locations);
  },[selectedId]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "coordinates",
      headerName: "User ID",
      flex: 1,
      valueGetter: (params) => {return params.value}
    },
    {
      field: "material",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "unit",
      headerName: "Cost",
      flex: 0.75,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <ActionMenu />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="SHIPMENTS"/>
        <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                // height: "20px"
              }}
              onClick={setVals}
           >Check Supplier Status </Button>
      </FlexBetween>
      
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <AcceptedList text={text}/>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Map locations={locations} coordinates={coordinates}/>
        </Box>

        
      </Box>
      
      
      <Box
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => Math.random()}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          onRowClick={(row)=>{
            // console.log(row.row.shipmentID);
            // console.log(row.row.shipmentID);
            setSelectedId(row.row.shipmentID);
            // console.log(selectedId);
            setCoordinates([{"$numberDecimal":Math.random()*100}, {"$numberDecimal":Math.random()*100}])}
          }
        />
      </Box>
    </Box>
  );
};

export default Transactions;

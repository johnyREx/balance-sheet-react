import React, { useState, useEffect, useCallback, useRef } from "react";
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import { Input, Button } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SaveAlt from '@material-ui/icons/SaveAlt';
import Clear from '@material-ui/icons/Clear';
import Data from '../../Data.json';
import Check from '@material-ui/icons/Check';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import FilterList from '@material-ui/icons/FilterList';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Remove from '@material-ui/icons/Remove';
import ViewColumn from '@material-ui/icons/ViewColumn';
import './Dashboard.css';

function DashboardTable({ myRef, age, setShow }) {

  const [data, setData] = useState(Data);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon {...props} ref={myRef} onClick={() => singleDelete()} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />)
  };

  const singleDelete = (d) => {
    const newArr = [...data];
    const index = data.findIndex((contact) => contact.tableData.id === d);
    newArr.splice(index, 1);
    setData(newArr);
  }

  const getData = () => {
    console.log("getData", data);
  }

  return (
    <div className="App">
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: '#', render: (rowData) => rowData.tableData.id + 1 },
            { title: 'Date', field: 'date', editComponent: props => <Input type="date" defaultValue={props.value} onChange={e => props.onChange(e.target.value)} /> },
            { title: 'Description', field: 'description', editComponent: props => <Input type="text" defaultValue={props.value} onChange={e => props.onChange(e.target.value)} /> },
            { title: "Cash Add", field: "cashAdd", editComponent: props => <Input type="number" defaultValue={props.value} onChange={e => props.onChange(e.target.value)} /> },
            { title: "Expense", field: "expense", editComponent: props => <Input type="number" defaultValue={props.value} onChange={e => props.onChange(e.target.value)} /> },
            { title: "Balance Rs", field: "balanceRs", editComponent: props => <Input disabled type="number" defaultValue={props.value} onChange={e => props.onChange(e.target.value)} /> }
          ]}
          data={data}
          title="Balance Sheet Table"
          icons={tableIcons}
          localization={{ toolbar: { searchPlaceholder: "Search Here" } }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  resolve()
                }, 1000)
              }),
          }}
          options={{
            rowStyle: { backgroundColor: '#EEE' },
            actionsColumnIndex: -1,
            exportButton: true,
            paging: true,
            pageSize: 5,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [5, 10, 20, 50],
            headerStyle: { textAlign: "right !important", whiteSpace: "nowrap" },
            search: true,
            paginationType: "stepped",
            filtering: true,
            exportFileName: "Balance Sheet",
            addRowPosition: "first",
            exportAllData: true,
          }}
        />
      </div>
      <br />
      <br />
      <Button variant='contained' color='primary' onClick={() => { getData(); setShow(false) }} >Save</Button>
    </div>
  );
}

export default DashboardTable;

//@ts-nocheck
import React, { useState } from "react";
import { Table, Input, Button, Space, TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import UpdateClient from "../forms/UpdateClient";
import { Eye, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Download } from "react-bootstrap-icons";

//@ts-ignore
import ReactExport from "react-export-excel";
import { IClient } from "../../interfaces/IClient";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface props {
  clients: [{
    client:IClient
    nbr_affaire_chaudes:number,
    nbr_Portefeuille:number,
    volume_affaire_Chaude:number,
    nbr_Visite:number
  }];
  
}
function ClientsTable({ clients}: props) {
  const nodeRef = React.useRef(null);
  let searchInput: any;
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exporteData, setExporteData] = useState(clients);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataToModel, setDataToModel] = useState();
  const [total, setTotal] = useState(clients.length);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };
  const OpenModal = () => {
    setDataToModel({});
    setOpen(!open);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Recherche ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className="bg__P color__white"
          >
            Recherche
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const clientTable: TableColumnsType<IClient> = [
    {
      title: "Société",
      dataIndex: ["client","company","name"],
      sorter: (a, b) => a.company.name.localeCompare(b.company.name),
      ...getColumnSearchProps("societe"),
    },
    {
      title: "Adresse",
      dataIndex: ["client", "company","address"],
      key: "address",
      sorter: (a, b) => a.company.address.localeCompare(b.company.address),
      ...getColumnSearchProps("adresse"),
    },
    {
      title: "Ville",
      dataIndex: ["client","company", "city"],
      key: "ville",
      sorter: (a, b) => a.company.city.localeCompare(b.company.city),
      ...getColumnSearchProps("ville"),
    },
    {
      title: "type",
      dataIndex: ["client","type"],
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      ...getColumnSearchProps("type"),
    },
    {
      title: "Commercial",
      dataIndex: ["client","commercial", "userName"],
      key: "commercial",
      sorter: (a, b) =>
        a.commercial.userName.localeCompare(b.commercial.userName),
      ...getColumnSearchProps("commercial"),
    },
    {
      title: "Flotte",
      dataIndex :["client","flotte"], 
      render:(item)=>item ? "True" :"False",
    },
    {
      title: "Nbre visite",
      dataIndex :["nbr_Visite"]
    },
    {
      title: "Nbre affaire chaudes",
      dataIndex:["nbr_affaire_chaudes"]
    },
    {
      title: "Volume affaire chaudes",
      dataIndex :["volume_affaire_Chaude"]
    },
    {
      title: "Nbre Portefeuilles",
      dataIndex :["nbr_Portefeuille"]
    },
    {
      title: "Action",
      key: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/Clients/${record.client.id}`,
            }}
            className="btn__link"
          >
            <Eye fontSize="18" />
          </Link>
          <button
            className="btn__link"
            onClick={(e) => {
              setDataToModel(text.client);
              setOpen(true);
            }}
          >
            <Pencil fontSize="18" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div noderef={nodeRef} className="table__container component">
       <div className="d-flex justify-content-between mb-3">
        <h6>
          Total :<span>{` ${total}`}</span>
        </h6>
        <ExcelFile
          element={
            <h6 className=" d-flex align-items-center cursor-pointer ">
              <span className="mr-2">Exporter excel</span>
              <Download fontSize="20" />
            </h6>
          }
          filename="Clients"
        >
          <ExcelSheet
            data={
              selectedRowKeys.length > 0
                ? exporteData.filter(
                    (xs) => selectedRowKeys.indexOf(xs.id) >= 0
                  )
                : exporteData
            }
            name="Clients"
            filename="Clients"
          >
            <ExcelColumn
              label="Société"
              value={(col: IClient) => col.client.company.name}
            />
            <ExcelColumn
              label="Adresse"
              value={(col: IClient) => col.client.company.address}
            />
            <ExcelColumn
              label="Ville"
              value={(col: IClient) => col.client.company.city}
            />
            <ExcelColumn label="Type"
            value={(col:any)=>col.client.type}
            />
            <ExcelColumn label="Flotte"
            value={(col:any)=>col.client.flotte}
            />
            <ExcelColumn
              label="Commercial"
              value={(col: IClient) => col.client.commercial.userName}
            />
            <ExcelColumn label="Zone" 
             value={(col: any) => col.client.zone.name}
            />
          </ExcelSheet>
        </ExcelFile>
      </div> 

      <div className="myTable">
        <Table
          columns={clientTable}
          pagination={{
            showSizeChanger: true,
          }}
          bordered
          rowKey={(d) => d.id}
          rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
          dataSource={clients}
          scroll={{ x: 1500 }}
          onChange={(_, __, ___, { currentDataSource }) => {
            setExporteData(currentDataSource);
            setTotal(() => currentDataSource.length);
          }}
        />
      </div>

      {open && (
        <UpdateClient
          open={open}
          OpenModal={OpenModal}
          DataToModel={dataToModel}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default React.memo(ClientsTable);

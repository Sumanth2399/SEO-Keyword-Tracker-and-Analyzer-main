import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";


export default function DataTable({data}) {

  if (!data || typeof data !== "object") {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Keyword", headerName: "Keyword Value", flex:1, justifyContent: "center", alignItems:"center" },
    { field: "Count", headerName: "Count Value",flex:1 }
  ];
  
  const rows = Object.entries(data).map(([keyword, count], index) => ({
  id: index + 1,
  Keyword: keyword,
  Count: count
}));


  return (
    <div style={{ height: 800, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ color: "skyblue" }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 13 }
          }
        }}
        sx={{
          "& .MuiDataGrid-cell": {
            fontSize: "16px",
            fontWeight: "bold",
            color: "black",
            display: "flex",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "16px",
            fontWeight: "bold",
            color: "black",
          }
        }}
      />
    </div>
  );
}

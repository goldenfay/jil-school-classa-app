import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from "@material-ui/core/Typography";


export default function DataTable({
    title,
    columns,
    rows,
    perPage=5
}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
      <DataGrid stik rows={rows} columns={columns} pageSize={perPage} />
    </div>
  );
}
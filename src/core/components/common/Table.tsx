import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[];
    columns: GridColDef[];
    isLoading: boolean;
}

export const Table:FC<Props> = ({ rows, columns, isLoading }) => {
  return (
    <Box
        width={'100%'}
        justifyContent={{ xs:'start', md:'center'}}
        overflow={'auto'}
        p={5}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          autosizeOptions={{
            columns: ['firsName', 'lastName', 'email', 'options'],
            includeOutliers: true,
            includeHeaders: false,
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={ isLoading }
        />
      </Box>
  )
}

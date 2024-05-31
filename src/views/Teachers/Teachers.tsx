import { Box, Button, Card, CardActions, CardContent, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DeleteForever, EditOutlined, PersonAddAlt1Outlined } from '@mui/icons-material';

import { Layout, Table } from "../../core"
import { useTeacherHook } from "./hooks/useTeacherHook"
import { useMemo, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firsName',
    headerName: 'Nombre',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
  },
  {
    field: 'options',
    headerName: 'Opciones',
    width: 160,
    renderCell:() => {
        return(
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title='Editar'>
                  <IconButton aria-label='Editar'>
                    <EditOutlined />
                  </IconButton>
                </Tooltip>

                <Tooltip title='Eliminar'>
                  <IconButton aria-label='Eliminar'>
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </Box>
          )
      }
  },
];

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 100,
};

export const Teachers = () => {

  const { teachers, isLoading } = useTeacherHook();
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => teachers.map((teacher) => ({
    ...teacher,
  })), [teachers]);

  return (
    <Layout>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h6'>Profesores</Typography>
        <Button 
          color='success'
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ gap: 1.5, fontWeight: 600 }}
        >
          <PersonAddAlt1Outlined />
          Crear Profesor
        </Button>
      </Box>
      
      <Table
        rows={rows}
        columns={columns}
        isLoading={isLoading}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography 
                gutterBottom variant="h5" 
                component="div"
                mb={5}
              >
                Creación Profesor
              </Typography>

              <Box 
                component="form"
                noValidate
                autoComplete="off"
                display='flex'
                flexDirection='column'
                gap={2}
                width={360}
              >
                <TextField
                  error={false}
                  id="outlined-error"
                  label="Nombre"
                />
                <TextField
                  error={false}
                  id="outlined-error"
                  label="Apellido"
                />
                <TextField
                  error={false}
                  id="outlined-error"
                  label="Email"
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
              <Button 
                color='success'
                variant="contained" 
                size="small"
              >
                Crear
              </Button>
              <Button 
                color='error'
                variant="contained" 
                size="small"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Layout>
  )
}

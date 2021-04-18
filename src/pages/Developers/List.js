import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { DataGrid } from '@material-ui/data-grid';

import api from '../../services/api';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 250 },
  { field: 'sexo', headerName: 'Sexo', width: 130 },
  { field: 'idade', headerName: 'Idade', type: 'number', width: 90 },
  { field: 'hobby', headerName: 'Hobby', width: 160 },
  { field: 'datanascimento', headerName: 'Data Nascimento', width: 180 }
];

const List = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/developers', {})
      .then(response => {
        setLoading(false);
        setDevelopers(response.data);
      })
      .catch(error => {

      });
  }, []);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box mb={2}>
            <TextField id="search-developer" label="Buscar desenvolver pelo nome" variant="outlined" size="small" fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <Button variant="contained" color="primary" fullWidth>
              Buscar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <Link to="/new">
              <Button variant="contained" color="primary" fullWidth>
                Adicionar
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <Link to="/new">
              <Button variant="contained" color="secondary" fullWidth>
                Excluir
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={developers} columns={columns} pageSize={5} loading={loading} onRowDoubleClick={function (row) { console.log(row.id) }} />
      </div>
    </Layout>
  );
};

export default List;
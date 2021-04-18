import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { DataGrid } from '@material-ui/data-grid';

import api from '../../services/api';
import GetGridColumns from '../../services/Developers/GetGridColumns';

import { useToasts } from 'react-toast-notifications';

const List = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controlDelete, setControlDelete] = useState(true);
  const [idDeveloper, setIdDeveloper] = useState();
  const [textSearch, setTextSearch] = useState('');
  const history = useHistory();
  const { addToast } = useToasts();

  function editRegister(row) {
    const id = row.id;
    history.push("/edit/" + id);
  }

  function enableControlDelete(row) {
    setControlDelete(false);
    setIdDeveloper(row.id);
  }

  function searchDeveloper() {
    const url = textSearch ? '/?nome=' + textSearch : '';

    api.get('/developers' + url, {})
      .then(response => {
        setLoading(false);
        setDevelopers(response.data);
      })
      .catch(error => {

      });
  }

  async function deleteDeveloper() {
    await api.delete('/developers/' + idDeveloper)
      .then(() => {
        api.get('/developers')
          .then(response => {
            setLoading(false);
            setDevelopers(response.data);
            setControlDelete(true);
            addToast('Registro excluído.', { appearance: 'success', autoDismiss: true });
          })
          .catch(error => {
            addToast('Erro ao excluir registro.', { appearance: 'error', autoDismiss: true });
          });
      })
      .catch(error => {

      });
  }

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
        <Grid item xs={12} sm={6} md={6}>
          <Box mb={2}>
            <TextField id="search-developer" label="Buscar desenvolver pelo nome" variant="outlined" size="small" onChange={e => { setTextSearch(e.target.value) }} fullWidth />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Box mb={2}>
            <Button variant="contained" color="primary" onClick={searchDeveloper} fullWidth>
              Buscar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Box mb={2}>
            <Link to="/new">
              <Button variant="contained" color="primary" fullWidth>
                Adicionar
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Box mb={2}>
            <Button variant="contained" color="secondary" disabled={controlDelete} onClick={deleteDeveloper} fullWidth>
              Excluir
            </Button>
          </Box>
        </Grid>
      </Grid>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={developers} columns={GetGridColumns} pageSize={10} loading={loading} onRowDoubleClick={editRegister} onRowClick={enableControlDelete} />
      </div>
    </Layout>
  );
};

export default List;
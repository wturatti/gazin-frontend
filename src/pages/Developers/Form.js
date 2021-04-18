import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Layout from '../Layout/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useToasts } from 'react-toast-notifications';

const validateForm = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  sexo: yup.string().required("Sexo é obrigatório"),
  datanascimento: yup.string().required("Data de nascimento é obrigatória")
});

const Form = () => {
  let { id } = useParams();
  const [dataDeveloper, setDataDeveloper] = useState([]);
  const [idDeveloper, setIdDeveloper] = useState([]);
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(async () => {
    if (id) {
      await api.get('/developers/' + id)
        .then(response => {
          setDataDeveloper(response.data);
          setIdDeveloper(id);
        })
        .catch(error => {
          addToast('Erro ao carregar dados do desenvolvedor.', { appearance: 'error', autoDismiss: true });
          history.push("/");
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      nome: dataDeveloper.nome ? dataDeveloper.nome : '',
      sexo: dataDeveloper.sexo ? dataDeveloper.sexo : '',
      idade: dataDeveloper.idade ? dataDeveloper.idade : '',
      hobby: dataDeveloper.hobby ? dataDeveloper.hobby : '',
      datanascimento: dataDeveloper.datanascimento ? dataDeveloper.datanascimento : ''
    },
    validationSchema: validateForm,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = {
        nome: values.nome,
        sexo: values.sexo,
        idade: values.idade,
        hobby: values.hobby,
        datanascimento: values.datanascimento
      }

      if (idDeveloper > 0) {
        await api.put('/developers/' + idDeveloper, data)
          .then(response => {
            addToast('Dados atualizados.', { appearance: 'success', autoDismiss: true });
          })
          .catch(error => {
            addToast('Erro ao atualizar dados.', { appearance: 'error', autoDismiss: true });
          });
      } else {
        await api.post('/developers', data)
          .then(response => {
            setIdDeveloper(response.data);
            addToast('Cadastro efetuado.', { appearance: 'success', autoDismiss: true });
          })
          .catch(error => {
            addToast('Erro ao efetuar o cadastro.', { appearance: 'error', autoDismiss: true });
          });
      }
    },
  });

  return (
    <Layout>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink to="/">
            <Typography color="textPrimary">Listagem</Typography>
          </RouterLink>
          <Typography color="textPrimary">Cadastro</Typography>
        </Breadcrumbs>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="nome"
            name="nome"
            label="Nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id="idade"
            name="idade"
            label="Idade"
            type="idade"
            value={formik.values.idade}
            onChange={formik.handleChange}
            error={formik.touched.idade && Boolean(formik.errors.idade)}
            helperText={formik.touched.idade && formik.errors.idade}
          />
        </Box>
        <Box mb={4}>
          <TextField
            fullWidth
            id="hobby"
            name="hobby"
            label="Hobby"
            type="hobby"
            value={formik.values.hobby}
            onChange={formik.handleChange}
            error={formik.touched.hobby && Boolean(formik.errors.hobby)}
            helperText={formik.touched.hobby && formik.errors.hobby}
          />
        </Box>
        <Box mb={4}>
          <InputLabel id="demo-simple-select-label">Data de nascimento</InputLabel>
          <TextField
            fullWidth
            id="datanascimento"
            name="datanascimento"
            type="date"
            value={formik.values.datanascimento}
            onChange={formik.handleChange}
            error={formik.touched.datanascimento && Boolean(formik.errors.datanascimento)}
            helperText={formik.touched.datanascimento && formik.errors.datanascimento}
          />
        </Box>
        <Box mb={6}>
          <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
          <Select
            fullWidth
            id="sexo"
            name="sexo"
            label="Select"
            value={formik.values.sexo}
            onChange={formik.handleChange}
            error={formik.touched.sexo && Boolean(formik.errors.sexo)}
            helperText={formik.touched.sexo && formik.errors.sexo}
          >
            <MenuItem value={'M'}>Masculino</MenuItem>
            <MenuItem value={'F'}>Feminino</MenuItem>
          </Select>
        </Box>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Salvar
        </Button>
      </form>
    </Layout>
  );
};

export default Form;
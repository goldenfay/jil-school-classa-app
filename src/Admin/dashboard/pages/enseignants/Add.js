import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, useField } from "formik";
import * as Yup from "yup";

import "./Add.css";
// components
import CustomForm from "../../../shared/CustomForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [invalide, setinvalide] = useState(false);
  const [isFocused, setisFocused] = useState(false);

  const handlefocus = () => {
    setisFocused(true);
    setinvalide(isFocused && (meta.error ? true : false));
  };
  return (
    <>
      <TextField
        error={invalide}
        variant="outlined"
        required
        fullWidth
        id={props.id || props.name}
        {...props}
        {...field}
        autoComplete="lname"
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handlefocus}
      />
      {invalide ? (
        <FormHelperText
          id={`${props.id}-feedback`}
          aria-live="polite"
          style={{ color: "#f44336" }}
          className={`feedback text-sm ${invalide ? "error" : "success"}`}
        >
          {meta.error}
        </FormHelperText>
      ) : null}
    </>
  );
};
const validationSchema = Yup.object({
  nom: Yup.string()
    .max(20, "Le nom de famille ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  prenom: Yup.string()
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .required("Champs Obligatoire"),
  email: Yup.string()
    .email("Adresse Email invalide")
    .required("Champs Obligatoire"),
  phone: Yup.string()
    .trim()
    .matches(/^0[5679]\d{8}$/, "Numéro de télephone invalide")
    .required("Champs Obligatoire"),
});
const nom = {
  type: "input",
  props: { name: "nom", required: true, type: "text", label: "Nom" },
};
const prenom = {
  type: "input",
  props: { name: "prenom", required: true, type: "text", label: "Prenom" },
};
const email = {
  type: "input",
  props: { name: "email", required: true, type: "email", label: "Email" },
};
const phone = {
  type: "input",
  props: { name: "phone", required: true, type: "text", label: "Télephone" },
};

export default function AddEnseignant(props) {
  const initialState={nom: "",
  prenom: "",
  wilaya: "",
  commune: "",
  classe: "",
    matiere: "",
    email: "",
    password: "",
}
  const [state, setState] = useState({
    ...initialState,
    listeW: [],
    listC: [],
    formStructure: [
      [nom, prenom], // This is a row in the form grid
      
    ],
  });
  // const [nom, setNom] = useState("");
  // const [prenom, setPrenom] = useState("");
  // const [wilaya, setWilaya] = useState("");
  // const [commune, setCommune] = useState("");
  // const [listeW, setListeW] = useState([]);
  // const [listC, setListC] = useState([]);
  // const [classe, setClasse] = useState("");
  // const [matiere, setMatiere] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/assets/communes-wilayas-ar.json")
      .then((response) => response.json())
      .then((data) => {
        const wilayas = {};
        data.forEach((item) => {
          wilayas[item.codeW] = item.wilaya;
        });
        const listWilayas = Object.keys(wilayas).map((key) => ({
          codeW: key,
          nomW: wilayas[key],
        }));
        const hiearchy = [
          {
            type: "select",
            props: {  name: "wilaya",  required: true,  select: true,  label: "Wilaya", value:listWilayas[1].nomW },
            children: listWilayas.map((item)=> ({key:item.codeW, value: item.nomW, label: item.nomW }) )
          },
          {
            type: "select",
            props: {name: "commune",required: true,select: true,label: "Commune",value: data[1].id},
            children: data.map((item)=> ({key:item.id, value: item.id, label: item.baladiya }) )

          },
        ];
        setState({
          listC: data,
          listeW: listWilayas,
          formStructure: [...state.formStructure,hiearchy,[email],[phone]]
        });
      });
  }, []);
  

  const handleChange = (event) => {
    // setState({
    //   ...state,
    //   [event.target.name]: event.target.value,
    // });
    console.log(event.target.value)
  };
  const handleSubmit = (event) => {
    console.log(state);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ajouter un nouvel enseignant
        </Typography>

        {/* <Formik
          initialValues={{
            nom: "",
            prenom: "",
            email: "",
            password:""
            // wilaya: false, // added for our checkbox
            // commune: "", // added for our select
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
          }}
        >
          {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            })=>(
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(touched.nom && errors.nom)}
                  helperText={touched.nom && errors.nom}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="fname"
                  name="nom"
                  variant="outlined"
                  required
                  fullWidth
                  id="nom"
                  label="Nom"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                error={Boolean(touched.prenom && errors.prenom)}
                helperText={touched.prenom && errors.prenom}
                onBlur={handleBlur}
                onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="prenom"
                  label="Prénom"
                  name="prenom"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                
                  id="wilaya-dropdown"
                  select
                  label="Wilaya"
                  name="wilaya"
                  value={wilaya}
                  //   onChange={handleChange}
                  helperText="Veuillez choisir votre wilaya"
                >
                  {listeW.map((option,idx) => (
                    <MenuItem key={option.codeW} value={option.nomW}>
                      {option.nomW}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  id="commune-dropdown"
                  select
                  label="Commune"
                  name="commune"
                  value={commune}
                  //   onChange={handleChange}
                  helperText="Veuillez choisir votre commune"
                >
                  {listC
                    .filter((commune) => commune.wilaya === wilaya)
                    .map((option, index)=> (
                    <MenuItem key={option.baladiya} value={option.id}>
                      {option.baladiya}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </form>
            )}
        </Formik> */}
        <CustomForm
          validationSchema={validationSchema}
          fieldsHiearchy={state.formStructure}
          initialState={initialState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={"Enregistrer"}
        />
      </div>
    </Container>
  );
}

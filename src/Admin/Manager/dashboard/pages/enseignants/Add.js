import React, { useState, useEffect, createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from "yup";

// components
import CustomForm from "../../../../shared/CustomForm";
import LoadingComponent from "../../../../shared/LoadingComponent";
import ToasterSnackBar from "../../../../shared/notifiers/toaster/ToasterSnackBar";
// Services
import ManagerService from "../../../../../services/managerServices";
import TeacherService from "../../../../../services/teacherServices";

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

const validationSchema = Yup.object({
  username: Yup.string()
    .max(20, "Le nom de famille ne doit pas dépasser 20 caractères")
    .min(5, "Le nom d'utilisateur doit contenir au moins 5 caractères")
    .required("Champs Obligatoire"),
  nom: Yup.string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(20, "Le nom de famille ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  prenom: Yup.string()
    .min(3, "Le prénom doit contenir au moins 3 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .required("Champs Obligatoire"),
  email: Yup.string()
    .email("Adresse Email invalide")
    .required("Champs Obligatoire"),
  phone: Yup.string()
    .trim()
    .matches(/^0[5679]\d{8}$/, "Numéro de télephone invalide")
    .required("Champs Obligatoire"),
  cycle: Yup.number().required("Champs Obligatoire"),
  matiere: Yup.string().required("Champs Obligatoire"),
  // matieresIds: Yup.array().required("Champs Obligatoire"),
  classes: Yup.array().required("Champs Obligatoire"),
  commune: Yup.string().required("Champs Obligatoire"),
  wilaya: Yup.string().required("Champs Obligatoire"),
});
const username = {
  type: "input",
  props: {
    name: "username",
    required: true,
    type: "text",
    label: "Nom d'utilisateur",
  },
};
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
  const initialState = {
    username: "",
    nom: "",
    prenom: "",
    wilaya: "",
    commune: "",
    cycle: "",
    matieresIds: [],
    classes: [],
    matiere: "",
    email: "",
    phone: "",
    
  };
  const [defaultFormValues, setdefaultFormValues] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const formRef = createRef();

  const [state, setState] = useState({
    formState: initialState,
    listeW: [],
    listC: [],
    formStructure: [],
  });

  // Define notification state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    severity : "success",
    message: 'Enseignant enregistré avec succès'
  });
  const closeToaster = () => setToasterOpen(false);

    // On Component Di mount, fetch required infos ( wilayas/communes, cycles,years,matieres)
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
          // Bind form inputs with state attributes
        username.props.value = state.formState.username;
        nom.props.value = state.formState.nom;
        prenom.props.value = state.formState.prenom;
        email.props.value = state.formState.email;
        phone.props.value = state.formState.phone;
          // Define the row containing Wilaya & Commune
        const hiearchy = [
          {
            type: "select",
            props: {
              name: "wilaya",
              required: true,
              select: true,
              label: "Wilaya",
              value: state.formState.wilaya,
              // onChange: handleChange
            },
            children: listWilayas.map((item) => ({
              key: item.codeW,
              value: item.nomW,
              label: item.nomW,
            })),
          },
          {
            type: "select",
            props: {
              name: "commune",
              required: true,
              select: true,
              label: "Commune",
              value: state.formState.commune,
            },
            children: data.map((item) => ({
              key: item.id,
              value: item.id,
              label: item.baladiya,
            })),
          },
        ];
          // Fetch cycles, years, & matieres
          ManagerService.getAllClassesMatieres({adminType:"manager"})
          .then((dataResp) => {
            console.log("Server response for classes :",dataResp)
            const ItemsAnnes=[],listeAnnes=[];
            const ItemsMatieres=[];
            dataResp.classes.forEach((classe) => {
                  listeAnnes.push(classe);
                  // listeAnnes.push({...classe,id: `${classe.codeCl}#${classe.codeCl}#${classe.codeCl}`}); // To be replaced by the above after Backend implemented

                classe.matieres.forEach((matiere, index) => {
             
                    if(!ItemsMatieres.find(el=>el.titre===matiere.titre)) ItemsMatieres.push({...matiere}); 
                });
         
            });
            const listeMatieres=ItemsMatieres;
            const cycles = {
              type: "select",
              props: {
                name: "cycle",
                required: true,
                select: true,
                multiple: true,
                label: "Cycle",
                value: ""
                // value: state.formState.cycle,
                
              },
              children:[]
           
            };
            const matieres = {
              type: "select",
              props: {
                name: "matiere",
                required: true,
                select: true,
                label: "Matière",
                value: state.formState.matiere,
                
              },
              // children: listeMatieres,
                // New changes by mahdi
              children: listeMatieres.map((matiere)=>({
                key: matiere.id,
                value: matiere.id,
                label: matiere.titre,
              }))
            };
         
            const years = {
              type: "select",
              props: {
                // name: "matieresIds",
                name: "classes",
                required: true,
                select: true,
                multiple: true,
                label: "Classes enseignés",
                value: [],
              
                SelectProps: {
                  multiple: true
                }
              },
              children: []
            };
            const defaultForm=[
              ...state.formStructure,
              [username],
              [nom, prenom],
              [matieres,cycles,years],
              hiearchy,
              [email],
              [phone],
            ]
            setdefaultFormValues(defaultForm)
            setState({
              ...state,
              listC: data,
              listeW: listWilayas,
              listeAnnes: listeAnnes,
              listeMatieres: listeMatieres,
              formStructure: defaultForm,
            });
          },
          err=>{
            console.log(err)
          });
      });
  }, []);


  /**
   * Handle form changes
   * @param {*} event input onChange event
   */
  const handleChange = (event) => {
   
    setState({
      ...state,
      formState: {...state.formState,
        [event.target.name]:
        event.target.name === "commune"
          ? state.listC.find((el) => el.id === event.target.value).baladiya
          : event.target.value},
      formStructure: state.formStructure.map((row) => {
        return row.map((el) => {
            // Change Commune's possible values according to choosed Wilaya
          if (event.target.name === "wilaya" && el.props.name === "commune") {
            const filteredCommunes = state.listC
              .filter((commune) => commune.wilaya === event.target.value)
              .map((item) => ({
                key: item.id,
                value: item.id,
                label: item.baladiya,
              }));
            return {
              ...el,
              children: filteredCommunes,

              props: { ...el.props, value: filteredCommunes[0].value },
            };
          } else 

            // New changes by mahdi
          if (event.target.name === "matiere" && el.props.name === "cycle") {
            const  labels= Array.from( new Set(state.listeAnnes
              .filter((classe) => typeof (classe.matieres.find(el=> el.id===event.target.value)) !=="undefined")
              .map((classe) => classe.cycle
              ))); 
              console.log(event.target.value,'LABELS : ',labels)
              const filteredCycles=labels.map((codeCycle)=>({
                key: codeCycle,
                value: codeCycle,
                label: codeCycle===1?"Primaire":codeCycle===2?"Moyen":"Lycé",
                }))
           
            return {
              ...el,
              children: filteredCycles,

              props: { ...el.props,value: "" },
            };
          }
          if (event.target.name === "matiere" && el.props.name === "classes") {     
            return {
              ...el,
              children: [],

              props: { ...el.props, value: "" },
            };
          }
          else
       
            // New changes by mahdi
          if (event.target.name === "cycle" && el.props.name === "classes") {
            const  filteredClasses= state.listeAnnes
              .filter((classe) => classe.cycle === event.target.value && classe.matieres.find(el=>el.id===state.formState.matiere))
              .map((classe) => (
                {key: `${classe.id}`,
                value: `${classe.id}`,
                label: `${(classe.dexription && classe.dexription!=="" && classe.dexription) || classe.codeCl}`
            })
              );
        
            return {
              ...el,
              children: filteredClasses,

              props: { ...el.props, value: [] },
            };
          }else
          
            // Else, Standard process, update form input values
          if (el.props.name === event.target.name)
            return {
              ...el,
              props: { ...el.props, value: event.target.value },
            };
          return el;
        });
      }),
    });
  };

  /**
   * Handle Submit form
   * @param {*} data the data returned from Formik
   */
  const handleSubmit = (data) => {
    console.log(data);
    console.log(state.formState);
    const {username,nom,prenom,email,phone,wilaya,commune,matiere,classes}=state.formState;
   
    
    setisLoading(true);
    TeacherService.register({
      username,nom,prenom,
      email,phone,wilaya,commune,
      // matieresIds,
      matiereId:matiere,
      // classesIds,
      classesIds:classes,
      adminType: "manager",
    }).then(
      (res) => {
        console.log("Registration results : ",res);
        setAlertProps({
          severity : "success",
          message: 'Enseignant enregistré avec succès'
        });
        setToasterOpen(true);
        setisLoading(false);
        // Reset form and formState values
        setState({
          ...state,
          formState: initialState,
          formStructure: defaultFormValues
        })
      },

      (err) => {
        console.error(err);
        setAlertProps({
          severity:'error',
          message : `Une erreur s'est produite ${(err.message && err.message) || err }`
        });
        setToasterOpen(true);
        setisLoading(false);
      }
    );
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <ToasterSnackBar
          open={toasterOpen}
          onClose={closeToaster}
          autoHideDuration={6000}
          children={<Alert variant="filled" severity={alertProps.severity}>
          {alertProps.message}
        </Alert>}
        
        />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ajouter un nouvel enseignant
        </Typography>

        <LoadingComponent
          component={
            <CustomForm
              ref={formRef}
              validationSchema={validationSchema}
              fieldsHiearchy={state.formStructure}
              initialState={state.formState}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitLabel={"Enregistrer"}
              state={state}
            />
          }
          controller={isLoading}
        />
      </div>
    </Container>
  );
}

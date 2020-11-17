import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Paper,
  Typography,
  Avatar,
  MuiThemeProvider,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import RemoveIcon from "@material-ui/icons/Remove";
import clsx from "clsx";

//themes
import {
  defaultTheme,
  bootstraptheme,
  cyclesTheme,
} from "../../../../themes/palettes";
// components
import CustomTable from "../../../shared/tables/CustomTable";
import Page from "../../../shared/Page";
import LoadingComponent from '../../../shared/LoadingComponent' 

// Data
import { customersHeadCells} from "../../../data/tableHeads";
import { ordersHeadCells, ordersRows } from "../../../../fake/fakeOrders";
import ManagerService from "../../../../services/managerServices";

const actions = [
  {
    color: "secondary",
    label: "Desabonner",
    clickHandler: (id) => console.log(id),
    startIcon: RemoveIcon,
  },
];

const activeInactiveTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  grid: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));
export default function Abonnes(props) {
  // Styles
  const classes = useStyles(bootstraptheme);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
      // States
     
    const [customersRows,setCutomersRows]=useState([]);   // Original rows 
    const [filtredCustomersRows,setFiltredCutomersRows]=useState([]);   // Filtered rows after search changes
  
    

  const [isLoading, setisLoading] = useState(false);
  
  useEffect(()=>{
    setisLoading(true);
    ManagerService.getAllAbonnes({adminType: "manager"}).then(
      res=>{ 
        const rows=res.map((row)=>{
          const modified=row.eleves.map((eleve)=>({
            
            avatar: <Avatar alt={eleve.username}  src={eleve.avatar} />,
            label:eleve.username,
            variant:"outlined" ,
            component:Link ,
            to:`/eleves?eleveId=${eleve.id}`,
            clickable : true
          }));
          
          return {
            ...row,
            eleves: modified
          }
          
        })
        setFiltredCutomersRows(rows);
        setCutomersRows(rows);
        setisLoading(false);

      },
      err=>{ setisLoading(false);

      }
    )


  },[])

    // SearcheBar handle changes
  const handleSearchInputChange=(e)=>{
    console.log(e.target.value);

    if(e.target.value.length<4) {
      setFiltredCutomersRows(customersRows); 
      return;
    }
    const value=e.target.value;
    setFiltredCutomersRows(
      customersRows.filter((row)=> ((row.nom && row.nom.indexOf(value)!==-1) || (row.prenom && row.prenom.indexOf(value)!==-1) ) )
    );

  }  
  return (
    <Page className={classes.root} title="Abonnements">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Derniers abonnements */}
            <MuiThemeProvider theme={activeInactiveTheme}>
              <Grid item container className={`${classes.grid}`} xs={12}>
                <Grid item xs={12} sm={12}>
                  <LoadingComponent
                   component={<Paper className={fixedHeightPaper}>
                    <CustomTable
                      tableTitle={"Liste des derniers abonnements"}
                      headCells={ordersHeadCells}
                      rows={ordersRows}
                      indexName={"codeAchat"}
                      withStartCheckbox={true}
                      withActions={false}
                      innerTheme={cyclesTheme}
                    />
                  </Paper>}
                  controller={isLoading}
                  />
                </Grid>
              </Grid>
            </MuiThemeProvider>
            {/* Top abonnes */}
            <MuiThemeProvider theme={activeInactiveTheme}>
              <Grid
                item
                container
                className={`${classes.grid}`}
                xs={12}
                spacing={3}
              >
                <Grid item xs={12} sm={8}>
                <LoadingComponent
                   component={<Paper className={fixedHeightPaper}>
                    <CustomTable
                      tableTitle={"Les abonnées les plus fidèles"}
                      headCells={customersHeadCells}
                      rows={customersRows}
                      indexName={"id"}
                      withStartCheckbox={false}
                      withActions={false}
                      innerTheme={cyclesTheme}
                    />
                  </Paper>}
                  controller={isLoading}

                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6">Carte Informative</Typography>
                </Grid>
              </Grid>
            </MuiThemeProvider>

            {/* Recherche d'abonnes */}
            <Grid item xs={12}>
              <Box mt={3}>
                <Card>
                  <CardContent>
                    <Box maxWidth={500}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Rechercher un abonné ..."
                        variant="outlined"
                        onChange={(e)=>handleSearchInputChange(e)}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            {/* Liste des abonnes */}
            <MuiThemeProvider theme={activeInactiveTheme}>
              <Grid item xs={12}>
              <LoadingComponent
                   component={<Paper className={classes.paper}>
                  <CustomTable
                    tableTitle={"Tous les abonnées"}
                    headCells={customersHeadCells}
                    rows={filtredCustomersRows}
                    indexName={"id"}
                    withActions={true}
                    actionButtons={actions}
                    innerTheme={cyclesTheme}
                  />
                </Paper>}
                controller={isLoading}
                />
              </Grid>
            </MuiThemeProvider>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}

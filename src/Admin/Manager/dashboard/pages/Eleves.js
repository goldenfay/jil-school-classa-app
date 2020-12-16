import React, { useState, useEffect } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

//themes
import { defaultTheme } from "../../../../themes/palettes";

// components
import Page from "../../../shared/Page";
import LoadingComponent from "../../../shared/LoadingComponent";

// Data
import { elevesHeadCells } from "../../../data/tableHeads";
import ManagerService from "../../../../services/managerServices";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
}));
export default function Eleves(props) {
  const classes = useStyles();

  const dataColumns = elevesHeadCells.map((el) => el.label);


  // States
  const [filtredElevesRows, setFiltredElevesRows] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    ManagerService.getAllEleves({ adminType: "manager" }).then(
      (res) => {
        console.log(res)

        setFiltredElevesRows(
          res.eleves.map((row) => 
          elevesHeadCells.map((column) => 
          column.id==="classe"?row.classe.codeCl:row[column.id]
          ))
          );
          setisLoading(false);
      },
      (err) => {
        setisLoading(false);
      }
    );
  }, []);

  return (
    <Page className={classes.root} title="Eleves">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LoadingComponent
                component={
                  <Paper className={classes.paper}>
                    <MUIDataTable
                      title="Liste des élèves"
                      data={filtredElevesRows}
                      columns={dataColumns}
                      options={{
                        filterType: "checkbox",
                      }}
                    />
                  </Paper>
                }
                controller={isLoading}
              />
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}

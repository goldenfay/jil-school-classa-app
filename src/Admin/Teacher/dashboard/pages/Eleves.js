import React, { useState, useEffect } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

//themes
import { defaultTheme } from "../../../../themes/palettes";
// Redux
import { connect } from "react-redux";
// components
import Page from "../../../shared/Page";
import LoadingComponent from "../../../shared/LoadingComponent";

// Data
import { profsHeadCells } from "../../../data/tableHeads";
import TeacherService from "../../../../services/teacherServices";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
}));
export function Eleves(props) {
  const classes = useStyles();

  const dataColumns = profsHeadCells.map((el) => el.label);

  // States
  const [filtredElevesRows, setFiltredElevesRows] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    TeacherService.getProfEleves({
      adminType: "enseignant",
      id: props.user._id,
    }).then(
      (res) => {
        console.log("Tous les élèves concernés par ce prof : ", res);

        setFiltredElevesRows(
          res.eleves.map((row) =>
            profsHeadCells.map((column) => row[column.id])
          )
        );
        setisLoading(false);
      },
      (err) => {
        setisLoading(false);
        console.log(err);
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

const mapStateToProps = (state) => ({
  // user: state.managerReducer.user,
  user: state.adminReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Eleves);

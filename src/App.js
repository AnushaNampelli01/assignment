import "./App.css";
import { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
  withStyles,
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      height: theme.spacing(20),
    },
  },
}));

function App() {
  const [apiRows, setApiRows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.data);
          setIsLoaded(true);
          setApiRows(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div>
        <h1>Something went wrong :</h1>
        <br />
        <div>{error.message}</div>
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading ..</div>;
  } else {
    return (
      <div className={classes.root}>
        <Fragment>
          <Typography variant="h4">Rendering API Details</Typography>
          {apiRows.length > 0 ? (
            <List>
              {apiRows.map((post, index) => (
                <Paper elevation={6} style={{ marginTop: "15px" }}>
                  <Box p={2}>
                    <ListItem key={index}>
                      <ListItemText
                        primary={post.title}
                        secondary={post.body}
                      />
                    </ListItem>
                  </Box>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography variant="subtitle1">No Data is Available!</Typography>
          )}
        </Fragment>
      </div>
    );
  }
}

export default App;

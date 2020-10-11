import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import { SidebarData } from './SidebarData';

const useStyles = makeStyles({
  drawer: { 
    width: "120px"
  },
  drawerList: {
    width: "150px"
  },
  drawerLink:{
    display:'flex',
    justifyContent: 'space-around'
  }
});

const Drawer = () => {
  const classes = useStyles();
  
  return (
        <MUIDrawer variant="permanent" className={classes.drawer} >
          <List className={classes.drawerList}>
            {SidebarData.map((item) => {
              const { title, path, icon } = item;
              return (
                <ListItem key={title} >
                  <Link to={path} className={classes.drawerLink}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </MUIDrawer>
  );
};

export default Drawer;


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/app.store.selector";
import { User } from "../../model/model";
import { Avatar, makeStyles } from "@material-ui/core";
import { UserDetailsDialog } from "./UserDetailsDialog";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: "black",
    backgroundColor: "lightGray",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
  },
}));

export const UserDetails = () => {
  const user: User = useSelector(selectUser);
  const [showDetails, setShowDetails] = useState(false);
  const classes = useStyles();

  const getUserInitials = () => {
    return user.name.substr(0, 1) + "." + user.surname.substr(0, 1);
  };

  const handleInfoDialogOpen = () => {
    setShowDetails(!showDetails);
  };

  return (
    <React.Fragment>
      <Avatar className={classes.avatar} onClick={handleInfoDialogOpen}>
        {getUserInitials()}
      </Avatar>
      <UserDetailsDialog
        user={user}
        onCancel={handleInfoDialogOpen}
        open={showDetails}
      />
    </React.Fragment>
  );
};

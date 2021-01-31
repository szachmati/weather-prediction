import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { User } from "../model/model";
import { useHistory } from 'react-router-dom';

interface UserDetailsDialogProps {
  onCancel: () => void;
  open: boolean;
  user: User;
}

export const UserDetailsDialog = (props: UserDetailsDialogProps) => {
  const history = useHistory();
  const { onCancel, open, user } = props;

  const handleLogout = () => {
    onCancel();
    history.push('/signin')
  }

  return (
    <Dialog open={open} fullScreen={false} onClose={onCancel}>
      <DialogTitle>
        <Typography variant={"h6"}>User details</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          disabled={true}
          margin="dense"
          label="Name"
          value={user.name}
          fullWidth
        />
        <TextField
          disabled={true}
          margin="dense"
          label="Surname"
          value={user.surname}
          fullWidth
        />
        <TextField
          disabled={true}
          margin="dense"
          label="Email Address"
          value={user.email}
          fullWidth
        />
        <TextField
          disabled={true}
          margin="dense"
          label="Role"
          value={user.role}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Close</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </DialogActions>
    </Dialog>
  );
};

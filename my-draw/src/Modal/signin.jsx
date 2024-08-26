import { Modal, Box, Typography, TextField, Button } from "@mui/material";
function SigninModal({ modalOpen, handleCloseModal, handleSubmit, Signinbtn }) {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Please Login to Continue
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleSubmit}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleSubmit}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          onChange={handleSubmit}
        />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
          onClick={Signinbtn}
        >
          Signin
        </Button>
      </Box>
    </Modal>
  );
}

export default SigninModal;

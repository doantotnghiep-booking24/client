import { useState } from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid
} from '@mui/material';

const Spinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress color="primary" />
  </Box>
);

// eslint-disable-next-line react/prop-types
const Alert = ({ isOpen, handleClose, handleSubmit, title, text, submitButtonText }) => (
  <Dialog
    open={isOpen}
    TransitionComponent={(props) => <Slide direction="up" {...props} />}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {submitButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);

const FormPasswordReset = () => {
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  const handleModalClose = () => setPassChangeSuccess(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
      setPassChangeSuccess(true);
      resetForm();
    }, 1000);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#f0f0f0'
      }}
    >
      <Formik
        initialValues={{
          currentPass: '',
          newPass: '',
          confirmPass: '',
        }}
        validationSchema={object().shape({
          currentPass: string().required('Bạn phải nhập mật khẩu hiện tại'),
          newPass: string().required('Bạn hãy nhập mật khẩu mới'),
          confirmPass: string()
            .oneOf([ref('newPass')], 'Mật khẩu không phù hợp')
            .required('Bạn hãy nhập lại mật khẩu mới'),
        })}
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
        }) => (
          isSubmitting ? (
            <Spinner />
          ) : (
            <Paper sx={{ padding: 4, width: 400, maxWidth: '90%' }} elevation={3}>
              <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
                Thay đổi mật khẩu
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="dense">
                      <InputLabel
                        htmlFor="password-current"
                        error={Boolean(touched.currentPass && errors.currentPass)}
                      >
                        Mật khẩu hiện tại
                      </InputLabel>
                      <Input
                        id="password-current"
                        name="currentPass"
                        type="password"
                        value={values.currentPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.currentPass && errors.currentPass)}
                      />
                      <FormHelperText error={Boolean(touched.currentPass && errors.currentPass)}>
                        {touched.currentPass && errors.currentPass ? errors.currentPass : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="dense" error={Boolean(touched.newPass && errors.newPass)}>
                      <InputLabel htmlFor="password-new" error={Boolean(touched.newPass && errors.newPass)}>
                        Mật khẩu mới
                      </InputLabel>
                      <Input
                        id="password-new"
                        name="newPass"
                        type="password"
                        value={values.newPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.newPass && errors.newPass)}
                      />
                      <FormHelperText error={Boolean(touched.newPass && errors.newPass)}>
                        {touched.newPass && errors.newPass ? errors.newPass : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="dense" error={Boolean(touched.confirmPass && errors.confirmPass)}>
                      <InputLabel htmlFor="password-confirm" error={Boolean(touched.confirmPass && errors.confirmPass)}>
                        Nhập lại mật khẩu
                      </InputLabel>
                      <Input
                        id="password-confirm"
                        name="confirmPass"
                        type="password"
                        value={values.confirmPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.confirmPass && errors.confirmPass)}
                      />
                      <FormHelperText error={Boolean(touched.confirmPass && errors.confirmPass)}>
                        {touched.confirmPass && errors.confirmPass ? errors.confirmPass : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#3fd0d4',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#2fb3b7'
                        }
                      }}
                      disabled={!isValid || isSubmitting}
                      fullWidth
                    >
                      Thay đổi mật khẩu
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Alert
                isOpen={passChangeSuccess}
                handleClose={handleModalClose}
                handleSubmit={handleModalClose} 
                title="Đổi mật khẩu"
                text="Mật khẩu của bạn đã được thay đổi thành công."
                submitButtonText="Đóng"
              />
            </Paper>
          )
        )}
      </Formik>
    </Box>
  );
};

export default FormPasswordReset;

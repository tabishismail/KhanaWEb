import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import "./css/style.css"
import { BasicButtons, MyInputText } from '..';
import { createUserWithEmailAndPassword, auth, db, collection, doc, setDoc } from '../../confiq/Firebase';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function BasicModal({ onClick, variant, type, fullWidth, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [first, setFirst] = React.useState();
  const [last, setLast] = React.useState();
  const [branch, setBranch] = React.useState();
  const [post, setPost] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const saveUser =  () => {
    createUserWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const docRef = setDoc(doc(db, "branch", user.uid), {
          firstName: first,
          lastName: last,
          branchName:  branch,
          post: "Manager" ,
          email: email,
          uid:user.uid
        });
        console.log("user ", user.uid);
        handleClose()
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }



  return (
    <div>
      <Button onClick={handleOpen} className="hello" variant={variant} type={type} fullWidth={fullWidth} >{children}</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Add Branch Users</h2>
          <div className='modalNew'>
            <MyInputText type="text" fullWidth={true} label="First Name" name="firstName" onChange={(e) => setFirst(e.target.value)} value={first} />
            <MyInputText type="text" fullWidth={true} label="Last Name" name="lastName" onChange={(e) => setLast(e.target.value)} value={last} />
            <MyInputText type="text" fullWidth={true} label="Branch Name" name="branch" onChange={(e) => setBranch(e.target.value)} value={branch} />
            <MyInputText type="email" fullWidth={true} label="Email Address" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <MyInputText type="password" fullWidth={true} label="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />

          </div>
          <div className='btnNew'>
            <BasicButtons onClick={saveUser}>Save</BasicButtons>
            <BasicButtons onClick={handleClose}>Close</BasicButtons>

          </div>

        </Box>
      </Modal>
    </div>
  );
}
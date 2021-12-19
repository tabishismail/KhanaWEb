import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import "./css/style.css"
import { BasicButtons, MyInputText } from '..';
import { createUserWithEmailAndPassword, auth, db, collection, doc, setDoc,updatePassword,getAuth} from '../../confiq/Firebase';


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



export default function ResetModal({ onClick, variant, type, fullWidth, children }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [password, setPassword] = React.useState();

    const saveUser = () => {
        const auth = getAuth();
        function getASecureRandomPassword() {
            return password;
          }
          console.log(auth.currentUser)

        const user = auth.currentUser;
        const newPassword = getASecureRandomPassword();
        
        updatePassword(user, newPassword).then(() => {
                   console.log(user)
                   handleClose()
        }).catch((error) => {
          // An error ocurred
          // ...
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
                    <h2 id="parent-modal-title">Reset Password</h2>
                    <div className='modalNew'>
                        <MyInputText type="password" fullWidth={true} label="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    </div>
                    <div className='btnNew'>
                        <BasicButtons onClick={saveUser}>Reset</BasicButtons>
                        <BasicButtons onClick={handleClose}>Close</BasicButtons>

                    </div>

                </Box>
            </Modal>
        </div>
    );
}
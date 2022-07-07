import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirm(props) {
    const [open, setOpen] = React.useState(false);

    const child = React.cloneElement(props.children, { onClick: () => setOpen(true) })

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            { child }
            <Dialog
                open={ open }
                TransitionComponent={Transition}
                keepMounted
                onClose={ handleClose }
            >
                <DialogTitle>{ props.message }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        { props.description }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => { props.confirmAction(); setOpen(false) } }>{ props.confirmActionText || 'Conferma' }</Button>
                    <Button onClick={ () => setOpen(false) }>{ props.discardActionText || 'Annulla' }</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
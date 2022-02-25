import React, { useContext, useState } from 'react'
import { makeStyles, Box, IconButton } from '@material-ui/core'
import { Chat } from '@material-ui/icons'
import { AccountContext } from '../../context/AccountProvider'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
//component
import HeaderMenu from './HeaderMenu';
import Drawer from '../drawer/InfoDrawer';

const useStyle = makeStyles({
    header: {
        height: 35,
        background: '#ededed',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        height: 37,
        width: 37,
        borderRadius: '50%'

    },
    icons: {
        marginLeft: 'auto',
        '& >*': {
            marginLeft: 2,
            padding: 8,
            color: "#919191",
        },
        '& :first-child': {
            fontSize: 22,
            marginRight: 8,
            marginTop: -5
        }
    },
    status: {
        marginLeft: '10.3rem',
        marginBottom: '3px',
        color: "#919191"

    }
})



const Header = () => {
    const { account } = useContext(AccountContext);
    const Classes = useStyle();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(true);
    }

    return (
        <>

            <Box className={Classes.header}>
                <img src={account.imageUrl} onClick={() => toggleDrawer()} alt="display-picture" className={Classes.avatar} />
                <IconButton className={Classes.status}>
                    <DonutLargeIcon />
                </IconButton>
                <Box className={Classes.icons}>

                    <Chat />
                    <HeaderMenu />

                </Box>
            </Box>
            <Drawer open={open} setOpen={setOpen} />
        </>
    )
}

export default Header
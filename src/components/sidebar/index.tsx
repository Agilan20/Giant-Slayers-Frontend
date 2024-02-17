
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    MenuIcon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { CiMenuFries } from "react-icons/ci";
import { BrowserRouter, Link, NavLink } from 'react-router-dom';


function Sidebar() {

    const [open, setOpen] = useState(false)

    const closeHandler = () => {
        setOpen(false)
    }

    return (
        <div>

            <IconButton colorScheme='blue'
                aria-label='Menu bar'
                icon={<CiMenuFries />} onClick={() => setOpen(true)}>

            </IconButton>

            <Drawer isOpen={open} onClose={closeHandler} placement='left'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Team X</DrawerHeader>

                    <DrawerBody display={"flex"} flexDirection={"column"} gap="2rem">

                        {
                            ["dashboard", "add_vehicle", "vehicles"].map(item => {
                                return (

                                    <NavLink
                                        to={item}
                                        style={({ isActive, isPending, isTransitioning }) => {
                                            return {
                                                fontWeight: isActive ? "bold" : "",
                                                color: isPending ? "red" : "black",
                                                viewTransitionName: isTransitioning ? "slide" : "",
                                            };
                                        }}
                                    >
                                        {item}
                                    </NavLink>
                                )
                            })
                        }


                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' colorScheme='blue' mr={3} onClick={closeHandler}>
                            Logout
                        </Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Sidebar 
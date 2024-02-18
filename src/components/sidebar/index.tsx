
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
    Card,
    CardBody,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { CiMenuFries } from "react-icons/ci";
import { BrowserRouter, Link, NavLink } from 'react-router-dom';


function Sidebar() {



    return (
        <div>

            <Card>
                <CardBody display={"flex"} flexDirection={"column"} gap="2rem" height="100%">
                    {
                        [ "vehicles","random_events", "add_vehicles"].map(item => {
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
                                    {  item.toUpperCase()}
                                </NavLink>
                            )
                        })
                    }
                </CardBody>
            </Card>


        </div>
    )
}

export default Sidebar 
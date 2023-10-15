import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

export default function Navbar() {
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction component={Link} to="/" icon={<CameraAltIcon />} />
                <BottomNavigationAction component={Link} to="ingredients" icon={<ShoppingBagIcon />} />
                <BottomNavigationAction icon={<SearchIcon />} />
                <BottomNavigationAction icon={<PersonIcon />} />
            </BottomNavigation>
        </Paper>
    )
}
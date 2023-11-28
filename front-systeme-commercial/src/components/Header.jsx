/* eslint-disable react/prop-types */
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import "../assets/scss/header.scss";
import { useState } from "react";
import { Menu } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const navItems = ["Home", "Besoin", "Ajout besoin"]
const drawerWidth = 500;

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Commerce
          </Typography>
          <Divider />
          <List>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Besoin"/>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" sx={{ boxShadow: "none"}}>
                <Toolbar className="header__navigation">
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}> 
                        <Menu />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link to="/header/liste_besoins">
                          <Button sx={{ color: '#fff' }}>
                              Besoins
                          </Button>
                        </Link>

                        <Link to="/header/besoin">
                          <Button sx={{ color: '#fff' }}>
                              Ajout besoin
                          </Button>
                        </Link>

                        <Link to="/header/besoins_global">
                          <Button sx={{ color: '#fff' }}>
                              Besoins global
                          </Button>
                        </Link>

                        <Link to="/header/saisie_proforma">
                          <Button sx={{ color: '#fff' }}>
                              Proforma
                          </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
                <nav>
                    <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    >
                    {drawer}
                    </Drawer>
                </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Header;
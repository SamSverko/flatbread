import { RestaurantMenu } from "@mui/icons-material";
import { AppBar as MUIAppBar, Toolbar, Typography } from "@mui/material";

export default function AppBar() {
    return (
        <MUIAppBar position="sticky">
            <Toolbar>
                <RestaurantMenu sx={{ mr: 2 }} />
                <Typography variant="h6" component="h1">
                    Flatbread
                </Typography>
            </Toolbar>
        </MUIAppBar>
    );
}

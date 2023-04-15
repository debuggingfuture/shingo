// import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

export const Nav = ()=>{
    
    return (
    <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //     setValue(newValue);
        // }}
>
  <BottomNavigationAction label="Recents" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Causes" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Nearby" icon={<FavoriteIcon />} />
</BottomNavigation>
    )
}
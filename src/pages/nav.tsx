// import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExploreIcon from '@mui/icons-material/Explore';
import BackHandIcon from '@mui/icons-material/BackHand';
import SensorIcon from '@mui/icons-material/Sensors';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const Nav = () => {

  return (
    <BottomNavigation
      showLabels
    // value={value}
    // onChange={(event, newValue) => {
    //     setValue(newValue);
    // }}
    >
      {/* <BottomNavigationAction label="Discover" icon={<ExploreIcon />} /> */}
      <BottomNavigationAction label="Causes" icon={<SensorIcon />} />
      <BottomNavigationAction label="Donate" icon={<VolunteerActivismIcon />} />
      <BottomNavigationAction label="Organize" icon={<ManageAccountsIcon />} />
    </BottomNavigation>
  )
}
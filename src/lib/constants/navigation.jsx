import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export const Sidebar_Top_Items = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    key: "blogs",
    label: "Blogs",
    path: "/blogs",
    icon: <PostAddIcon />,
  },
  {
    key: "panel",
    label: "Panel",
    path: "/panel",
    icon: <VideogameAssetIcon />,
  },
  {
    key: "referrals",
    label: "Referrals",
    path: "/referrals",
    icon: <GroupAddIcon />,
  },
  {
    key: "shop",
    label: "Shop",
    path: "/shop",
    icon: <AddShoppingCartIcon />,
  },
];

export const Sidebar_Bottom_Items = [
  {
    key: "contact",
    label: "Contact",
    path: "/contact",
    icon: <ContactSupportIcon />,
  },
];

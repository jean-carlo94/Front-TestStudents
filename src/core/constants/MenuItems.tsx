import { DashboardOutlined, EmojiPeopleOutlined, HailOutlined, SchoolOutlined } from "@mui/icons-material";

export const MenuItems = [
    {
        id: 'home',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
        route: "/"
    },
    {
        id: 'students',
        label: 'Estudiantes',
        icon: <EmojiPeopleOutlined />,
        route: "/students"
    },
    {
        id: 'teachers',
        label: 'Profesores',
        icon: <HailOutlined />,
        route: "/teachers"
    },
    {
        id: 'classes',
        label: 'Clases',
        icon: <SchoolOutlined />,
        route: "/classes"
    }
];
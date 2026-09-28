import {
    House,
    Zap,
    ListTodo,
    Plus,
    Tags,
    Settings,
    UserRoundPen,
    KeyRound,
    Trash2,
} from "lucide-react";

export const NavbarItem = [
    {
        icon: <House />,
        title: "Home",
    },
    {
        icon: <Zap />,
        title: "Vital Tasks",
    },
    {
        icon: <ListTodo />,
        title: "All Tasks",
    },
    {
        icon: <Plus />,
        title: "Add New Task",
    },
    {
        icon: <Tags />,
        title: "Categories",
    },
    {
        icon: <Settings />,
        title: "Settings",
        children: [
            {
                icon: <UserRoundPen />,
                title: "Profile Edit",
            },
            {
                icon: <KeyRound />,
                title: "Password Change",
            },
            {
                icon: <Trash2 />,
                title: "Delete Profile",
            },
        ],
    },
];
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
        href: "/",
    },
    {
        icon: <Zap />,
        title: "Vital Tasks",
        href: "/vital",
    },
    {
        icon: <ListTodo />,
        title: "All Tasks",
        href: "/all-tasks",
    },
    {
        icon: <Plus />,
        title: "Add New Task",
        href: "/add-new-task",
    },
    {
        icon: <Tags />,
        title: "Categories",
        href: "/categories",
    },
    {
        icon: <Settings />,
        title: "Settings",
        children: [
            {
                icon: <UserRoundPen />,
                title: "Profile Edit",
                href: "/profile-edit",
            },
            {
                icon: <KeyRound />,
                title: "Password Change",
                href: "/password-change",
            },
            {
                icon: <Trash2 />,
                title: "Delete Profile",
                href: "/delete-profile",
            },
        ],
    },
];
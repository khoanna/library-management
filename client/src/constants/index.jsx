import { Home, User2Icon, BookAIcon, Users, Database, DatabaseZap } from "lucide-react";


export const navbarLinks = [
    {
        admin: false,
        links: [
            {
                label: "Thống kê",
                icon: Home,
                path: "/",
            }
        ],
    },
    {
        title: "Độc giả",
        admin: false,
        links: [
            {
                label: "Quản lý độc giả",
                icon: Users,
                path: "/docgia",
            },
            {
                label: "Quản lý phiếu mượn",
                icon: Database,
                path: "/muonsach",
            },
            {
                label: "Quản lý tiền phạt",
                icon: DatabaseZap,
                path: "/phieuphat",
            }
        ],
    },
    {
        title: "Sách",
        admin: false,
        links: [
            {
                label: "Quản lý sách",
                icon: BookAIcon,
                path: "/sach",
            },
            {
                label: "Quản lý tác giả",
                icon: User2Icon,
                path: "/tacgia",
            }
        ],
    }
    ,
    {
        title: "Nhân viên",
        admin: true,
        links: [
            {
                label: "Quản lý nhân viên",
                icon: Users,
                path: "/nhanvien",
            },
        ],
    }
];




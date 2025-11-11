import {
    FaCalendarPlus,
    FaFunnelDollar,
    FaHandHoldingUsd,
    FaHeartbeat,
    FaPeopleCarry,
    FaStackExchange,
    FaUsers,
} from 'react-icons/fa'

export const sidebarItems = [
    {
        title: 'Dashboard',
        url: '/',
        icon: FaHeartbeat,
    },
    {
        title: 'Members',
        url: '/members',
        icon: FaUsers,
    },
    {
        title: 'Savings',
        url: '/savings',
        icon: FaFunnelDollar,
    },
    {
        title: 'Loans',
        url: '/loans',
        icon: FaHandHoldingUsd,
    },
    {
        title: 'Meetings',
        url: '/meetings',
        icon: FaCalendarPlus,
    },
    {
        title: 'Chamas',
        url: '/chamas',
        icon: FaPeopleCarry,
    },
    {
        title: 'Transactions',
        url: '/transactions',
        icon: FaStackExchange,
    },
]

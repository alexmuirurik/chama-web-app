import {
    FaCalendarPlus,
    FaFunnelDollar,
    FaHandHoldingUsd,
    FaHeartbeat,
    FaPeopleCarry,
    FaStackExchange,
    FaUsers,
    FaUserShield,
} from 'react-icons/fa'

export const sidebarItems = [
    {
        title: 'Dashboard',
        url: '/',
        icon: FaHeartbeat,
    },
    {
        title: 'Meetings',
        url: '/meetings',
        icon: FaCalendarPlus,
    },
    {
        title: 'Savings',
        url: '/savings',
        icon: FaFunnelDollar,
    },
    {
        title: 'Loans',
        url: '/loans',
        icon: FaUserShield,
    },
    {
        title: 'Chamas',
        url: '/chamas',
        icon: FaPeopleCarry,
    },
    {
        title: 'Members',
        url: '/members',
        icon: FaUsers,
    },
    {
        title: 'Transactions',
        url: '/transactions',
        icon: FaStackExchange,
    },
    {
        title: 'Dividends',
        url: '/transactions',
        icon: FaHandHoldingUsd,
    },
]

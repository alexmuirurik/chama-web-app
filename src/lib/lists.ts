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
        title: 'Members',
        url: '/members',
        icon: FaUsers,
    },
    {
        title: 'Dividends',
        url: '/dividends',
        icon: FaHandHoldingUsd,
    },
]

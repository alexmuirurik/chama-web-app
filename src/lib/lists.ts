import {
    FaCalendarPlus,
    FaFunnelDollar,
    FaHandHoldingUsd,
    FaHeartbeat,
    FaStackExchange,
} from 'react-icons/fa'

export const navItems = [
    {
        title: 'Dashboard',
        url: '/',
        icon: FaHeartbeat,
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
        title: 'Transactions',
        url: '/transactions',
        icon: FaStackExchange,
    },
]

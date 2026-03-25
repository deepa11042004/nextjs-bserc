// app/admin/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { 
  
  Users, 
  Mail, 
  Shield, 
  Clock, 
  ChevronRight, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';

// Types
interface StatCard {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
  linkText: string;
  highlight?: string;
  iconBgOpacity?: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  program: string;
  date: string;
  avatar: string;
}

interface Query {
  id: string;
  from: string;
  email: string;
  subject: string;
  status: 'new' | 'read';
}

// Mock data (replace with API calls)
const statsData: StatCard[] = [
  {
    title: 'Total Programs',
    value: 8,
    subtitle: '8 Active',
    icon: <Mail className="w-6 h-6" />,
    gradient: 'from-blue-700 to-blue-500',
    link: '/admin/programs',
    linkText: 'View Programs',
  },
  {
    title: 'Total Participants',
    value: 498,
    subtitle: 'Website Users',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-green-800 to-green-500',
    link: '/admin/participants',
    linkText: 'View Participants',
  },
  {
    title: 'Contact Queries',
    value: 20,
    subtitle: '13 Unread',
    highlight: '13 Unread',
    icon: <Mail className="w-6 h-6" />,
    gradient: 'from-amber-700 to-amber-500',
    link: '/admin/contact-queries',
    linkText: 'View Queries',
    iconBgOpacity: 'bg-white/50',
  },
  {
    title: 'Admin Users',
    value: 2,
    subtitle: 'System Administrators',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-gray-700 to-gray-400',
    link: '/admin/users',
    linkText: 'Manage Admins',
  },
];

const recentParticipants: Participant[] = [
  {
    id: '1',
    name: 'Argha Tribedy',
    email: 'arghatribedy6@gmail.com',
    program: 'Defence Drone W...',
    date: '3 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=Argha+Tribedy&size=32',
  },
  {
    id: '2',
    name: 'Nachaegari Sreyesh Kumar',
    email: 'shreynachaegari@gmail.com',
    program: 'Defence Drone W...',
    date: '1 day ago',
    avatar: 'https://ui-avatars.com/api/?name=Nachaegari+Sreyesh+Kumar&size=32',
  },
  {
    id: '3',
    name: 'Vikas Jamadar',
    email: 'vikasjamadar83@gmail.com',
    program: 'AIRCRAFT DESIGN...',
    date: '1 day ago',
    avatar: 'https://ui-avatars.com/api/?name=Vikas+Jamadar&size=32',
  },
  {
    id: '4',
    name: 'Prajwal Hubballi',
    email: 'hubballiprajwal20@gmail.com',
    program: 'AIRCRAFT DESIGN...',
    date: '1 day ago',
    avatar: 'https://ui-avatars.com/api/?name=Prajwal+Hubballi&size=32',
  },
  {
    id: '5',
    name: 'Labish',
    email: 'lovishsharma9090@gmail.com',
    program: 'ROBOTICS DESIGN...',
    date: '1 day ago',
    avatar: 'https://ui-avatars.com/api/?name=Labish&size=32',
  },
];

const recentQueries: Query[] = [
  {
    id: '1',
    from: 'Dr Smita Rani Parija',
    email: 'sparija@cgu-odisha.ac.in',
    subject: 'I am associate Profe...',
    status: 'new',
  },
  {
    id: '2',
    from: 'ABHISHEK DOBBALA',
    email: 'simondobbala@gmail.com',
    subject: 'Membership form',
    status: 'new',
  },
  {
    id: '3',
    from: 'Ravina kumari',
    email: 'ravinachoudhary0027@gmail.com',
    subject: 'India Space Educatio...',
    status: 'read',
  },
  {
    id: '4',
    from: 'Ravina kumari',
    email: 'ravinachoudhary0027@gmail.com',
    subject: 'India Space Educatio...',
    status: 'new',
  },
  {
    id: '5',
    from: 'Dr. Sameer Mahapatra',
    email: 'mahapatrosameer@gmail.com',
    subject: 'VISIT REQUEST TO BSE...',
    status: 'new',
  },
];

// Stat Card Component
const StatCard: React.FC<{ card: StatCard }> = ({ card }) => (
  <div className="col-span-12 md:col-span-6 xl:col-span-3">
    <div className={`h-full rounded-xl shadow-sm border-0 bg-gradient-to-br ${card.gradient} overflow-hidden`}>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-white/80 uppercase font-bold tracking-wide">
              {card.title}
            </div>
            <div className="text-3xl font-bold text-white mt-1">{card.value}</div>
            <div className={`text-xs mt-1 ${card.highlight ? 'text-white font-bold' : 'text-white/80'}`}>
              {card.subtitle}
            </div>
          </div>
          <div className={`${card.iconBgOpacity || 'bg-white/25'} rounded-full p-3`}>
            <span className="text-white">{card.icon}</span>
          </div>
        </div>
      </div>
      <div className="bg-white/10 px-5 py-3 flex items-center justify-between text-xs">
        <Link 
          href={card.link}
          className="text-white hover:text-white/90 transition-colors flex items-center gap-1"
        >
          {card.linkText}
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  </div>
);

// Participants Table Component
const ParticipantsTable: React.FC<{ participants: Participant[] }> = ({ participants }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Program
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Date
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {participants.map((participant) => (
          <tr key={participant.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4">
              <div className="flex items-center gap-3">
                <img 
                  src={participant.avatar} 
                  alt={participant.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{participant.name}</div>
                  <div className="text-xs text-gray-500">{participant.email}</div>
                </div>
              </div>
            </td>
            <td className="py-3 px-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 bg-white">
                {participant.program}
              </span>
            </td>
            <td className="py-3 px-4 text-sm text-gray-500">{participant.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Queries Table Component
const QueriesTable: React.FC<{ queries: Query[] }> = ({ queries }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            From
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Subject
          </th>
          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {queries.map((query) => (
          <tr key={query.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4">
              <div className="font-medium text-gray-900">{query.from}</div>
              <div className="text-xs text-gray-500">{query.email}</div>
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">{query.subject}</td>
            <td className="py-3 px-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                query.status === 'new' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {query.status === 'new' ? 'New' : 'Read'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Dashboard Component
export default function Main() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center pt-3 pb-4 mb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          {statsData.map((card, index) => (
            <StatCard key={index} card={card} />
          ))}
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Participants */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h5 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Recent Participants
              </h5>
              <Link 
                href="/admin/participants"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="flex-1 p-0">
              <ParticipantsTable participants={recentParticipants} />
            </div>
          </div>

          {/* Recent Queries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h5 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                Recent Queries
              </h5>
              <Link 
                href="/admin/contact-queries"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="flex-1 p-0">
              <QueriesTable queries={recentQueries} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';
import {
   // Added for Programs
  Users,
  Mail,
  Shield,
  Clock,
  ChevronRight,
  MessageCircle,
  Loader2,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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

// Mock data
const statsData: StatCard[] = [
  {
    title: 'Total Programs',
    value: 8,
    subtitle: '8 Active',
    icon: <Mail className="h-5 w-5" />, // Fixed icon
    gradient: 'from-blue-600 to-blue-400',
    link: '/admin/programs',
    linkText: 'View Programs',
  },
  {
    title: 'Total Participants',
    value: 498,
    subtitle: 'Website Users',
    icon: <Users className="h-5 w-5" />,
    gradient: 'from-green-700 to-green-500',
    link: '/admin/participants',
    linkText: 'View Participants',
  },
  {
    title: 'Contact Queries',
    value: 20,
    subtitle: '13 Unread',
    highlight: '13 Unread',
    icon: <Mail className="h-5 w-5" />,
    gradient: 'from-amber-600 to-amber-400',
    link: '/admin/contact-queries',
    linkText: 'View Queries',
  },
  {
    title: 'Admin Users',
    value: 2,
    subtitle: 'System Administrators',
    icon: <Shield className="h-5 w-5" />,
    gradient: 'from-zinc-600 to-zinc-400',
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
  <Card className={`h-full overflow-hidden border-0 bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardDescription className="text-white/80 uppercase text-xs font-bold tracking-wider">
            {card.title}
          </CardDescription>
          <CardTitle className="text-3xl font-bold mt-1 text-white">{card.value}</CardTitle>
        </div>
        <div className="bg-white/20 rounded-full p-2.5 backdrop-blur-sm">
          {card.icon}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <p className={`text-xs ${card.highlight ? 'text-white font-bold' : 'text-white/80'}`}>
        {card.subtitle}
      </p>
    </CardContent>
    <CardFooter className="pt-2 border-t border-white/10">
      <Link 
        href={card.link}
        className="text-white/90 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors group"
      >
        {card.linkText}
        <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </CardFooter>
  </Card>
);

// Participants Table Component
const ParticipantsTable: React.FC<{ participants: Participant[]; isLoading?: boolean }> = ({ 
  participants, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800">
          <TableHead className="w-[200px] text-zinc-400">Name</TableHead>
          <TableHead className="text-zinc-400">Program</TableHead>
          <TableHead className="text-right text-zinc-400">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <TableRow key={participant.id} className="border-zinc-800 hover:bg-zinc-900/50">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-zinc-700">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400">{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-zinc-100">{participant.name}</span>
                  <span className="text-xs text-zinc-500">{participant.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="border-zinc-700 text-zinc-300 font-normal bg-transparent">
                {participant.program}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-sm text-zinc-500">
              {participant.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Queries Table Component
const QueriesTable: React.FC<{ queries: Query[]; isLoading?: boolean }> = ({ 
  queries, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800">
          <TableHead className="w-[180px] text-zinc-400">From</TableHead>
          <TableHead className="text-zinc-400">Subject</TableHead>
          <TableHead className="text-right text-zinc-400">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {queries.map((query) => (
          <TableRow key={query.id} className="border-zinc-800 hover:bg-zinc-900/50">
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium text-sm text-zinc-100">{query.from}</span>
                <span className="text-xs text-zinc-500">{query.email}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-zinc-300">{query.subject}</TableCell>
            <TableCell className="text-right">
              <Badge 
                variant={query.status === 'new' ? 'destructive' : 'secondary'}
                className={
                  query.status === 'read' 
                    ? 'bg-blue-950 text-blue-200 border border-blue-900 hover:bg-blue-950' 
                    : 'bg-red-950 text-red-200 border border-red-900 hover:bg-red-950'
                }
              >
                {query.status === 'new' ? 'New' : 'Read'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Main Dashboard Component
export default function AdminDashboard() {
  const isLoading = false;

  return (
    // Force dark background explicitly
 
      <div className="min-h-screen  text-zinc-100 container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          {/* Theme Toggle Removed */}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((card, index) => (
            <StatCard key={index} card={card} />
          ))}
        </div>

        <Separator className="my-6 bg-zinc-800" />

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Participants */}
          <Card className="h-full flex flex-col bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <CardTitle className="text-lg text-zinc-100">Recent Participants</CardTitle>
                </div>
                <Button variant="outline" size="sm" asChild className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <Link href="/admin/participants">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0 overflow-hidden">
              <div className="overflow-x-auto -mx-6 px-6">
                <ParticipantsTable 
                  participants={recentParticipants} 
                  isLoading={isLoading} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Queries */}
          <Card className="h-full flex flex-col bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-lg text-zinc-100">Recent Queries</CardTitle>
                </div>
                <Button variant="outline" size="sm" asChild className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <Link href="/admin/contact-queries">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0 overflow-hidden">
              <div className="overflow-x-auto -mx-6 px-6">
                <QueriesTable 
                  queries={recentQueries} 
                  isLoading={isLoading} 
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
     
  );
}
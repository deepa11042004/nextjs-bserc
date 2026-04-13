export type TicketCategory =
  | "registration_issue"
  | "payment_issue"
  | "workshop_info"
  | "reschedule_request"
  | "certificate_issue"
  | "other";

export type TicketPriority = "low" | "medium" | "high";

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";

export type SenderRole = "user" | "admin";

export interface TicketMessage {
  id: number;
  ticket_id: number;
  sender_id: number | null;
  sender_role: SenderRole;
  message: string;
  attachment_url: string | null;
  created_at: string | null;
}

export interface HelpDeskTicket {
  id: number;
  user_id: number | null;
  user_name: string | null;
  user_email: string | null;
  workshop_id: number | null;
  workshop_title: string | null;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  attachment_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  last_message: string | null;
  messages?: TicketMessage[];
}

export interface HelpDeskApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface HelpDeskFaqItem {
  question: string;
  answer: string;
}

export type HelpDeskFaqCategory =
  | "registration"
  | "payment"
  | "workshop_access"
  | "offline_details"
  | "certificate"
  | "refund_policy";

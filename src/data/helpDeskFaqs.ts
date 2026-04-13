import type {
  HelpDeskFaqCategory,
  HelpDeskFaqItem,
  TicketCategory,
} from "@/types/helpdesk";

export const FAQ_CATEGORY_LABELS: Record<HelpDeskFaqCategory, string> = {
  registration: "Registration",
  payment: "Payment",
  workshop_access: "Workshop Access",
  offline_details: "Offline Details",
  certificate: "Certificate",
  refund_policy: "Refund Policy",
};

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  registration_issue: "Registration Issue",
  payment_issue: "Payment Issue",
  workshop_info: "Workshop Information",
  reschedule_request: "Reschedule Request",
  certificate_issue: "Certificate Issue",
  other: "Other",
};

export const TICKET_PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

export const TICKET_STATUS_LABELS = {
  open: "Open",
  "in-progress": "In Progress",
  resolved: "Resolved",
  closed: "Closed",
} as const;

export const TICKET_CATEGORY_OPTIONS: Array<{ value: TicketCategory; label: string }> = [
  { value: "registration_issue", label: TICKET_CATEGORY_LABELS.registration_issue },
  { value: "payment_issue", label: TICKET_CATEGORY_LABELS.payment_issue },
  { value: "workshop_info", label: TICKET_CATEGORY_LABELS.workshop_info },
  { value: "reschedule_request", label: TICKET_CATEGORY_LABELS.reschedule_request },
  { value: "certificate_issue", label: TICKET_CATEGORY_LABELS.certificate_issue },
  { value: "other", label: TICKET_CATEGORY_LABELS.other },
];

export const HELP_DESK_FAQS: Record<HelpDeskFaqCategory, HelpDeskFaqItem[]> = {
  registration: [
    {
      question: "I registered but did not receive confirmation. What should I do?",
      answer: "Please check spam/promotions folder first. If still missing after 15 minutes, create a Help Desk ticket under Registration Issue.",
    },
    {
      question: "Can I edit my registration details?",
      answer: "Yes. Raise a ticket with corrected details and your registration email so support can assist you.",
    },
  ],
  payment: [
    {
      question: "Payment deducted but registration not confirmed?",
      answer: "Please wait 5 to 10 minutes for payment sync. If not updated, create a ticket with payment screenshot and transaction ID.",
    },
    {
      question: "Can I get a payment receipt?",
      answer: "Yes. You can request payment receipt by raising a Payment Issue ticket with your registered email.",
    },
  ],
  workshop_access: [
    {
      question: "How will I join an online workshop?",
      answer: "Workshop access link is shared via email and dashboard before the session starts.",
    },
    {
      question: "I cannot access workshop materials.",
      answer: "Raise a Workshop Information ticket with screenshot and your registered email.",
    },
  ],
  offline_details: [
    {
      question: "Where can I find offline venue details?",
      answer: "Venue and reporting details are shared on your registered email at least one day before the workshop.",
    },
    {
      question: "What should I carry for offline workshops?",
      answer: "Bring valid ID proof, registration proof, and any items mentioned in official workshop instructions.",
    },
  ],
  certificate: [
    {
      question: "When will I receive my certificate?",
      answer: "Certificates are usually issued after attendance verification and completion checks.",
    },
    {
      question: "My certificate has incorrect details.",
      answer: "Raise a Certificate Issue ticket and include your corrected name and registration details.",
    },
  ],
  refund_policy: [
    {
      question: "Can I request a refund?",
      answer: "Please review the Refund Policy page first. If your case is eligible, raise a ticket with payment details.",
    },
    {
      question: "How long does refund processing take?",
      answer: "Eligible refunds are processed as per policy timelines and banking settlement windows.",
    },
  ],
};

export const TICKET_CATEGORY_TO_FAQ_CATEGORIES: Record<TicketCategory, HelpDeskFaqCategory[]> = {
  registration_issue: ["registration"],
  payment_issue: ["payment", "refund_policy"],
  workshop_info: ["workshop_access", "offline_details"],
  reschedule_request: ["offline_details", "workshop_access"],
  certificate_issue: ["certificate"],
  other: ["registration", "payment", "workshop_access"],
};

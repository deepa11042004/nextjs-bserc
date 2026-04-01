export interface Workshop {
  id: string;
  title: string;
  description: string;
  workshopDate: string;
  startTime: string;
  endTime?: string;
  mode: string;
  eligibility: string;
  certificate?: boolean;
  certificateUrl?: string;
  fee: number;
  thumbnailUrl: string;
  duration?: string;
}

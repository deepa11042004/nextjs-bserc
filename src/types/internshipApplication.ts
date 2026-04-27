export interface InternshipApplication {
  id: number;
  internship_name: string;
  internship_designation: string;
  full_name: string;
  guardian_name: string;
  gender: string;
  dob: string | null;
  mobile_number: string;
  email: string;
  alternative_email: string | null;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  institution_name: string;
  educational_qualification: string;
  is_lateral: boolean;
  declaration_accepted: boolean;
  has_passport_photo: boolean;
  passport_photo_path?: string | null;
  passport_photo_url?: string | null;
  passport_photo_mime_type: string | null;
  passport_photo_file_name: string | null;
  payment_amount: number | null;
  payment_currency: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payment_status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface InternshipApplicationCollectionResponse {
  applications?: InternshipApplication[];
  message?: string;
  error?: string;
}

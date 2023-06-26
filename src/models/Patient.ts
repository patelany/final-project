export default interface Patient {
  _id?: string;
  guardianID: string; //google UID
  patient_name: string;
  // age_years: number;
  // age_months: number;
  photo_url?: string;
  gender: string;
  birthdate: Date;
  shareData: boolean;
}

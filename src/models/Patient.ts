export default interface Patient {
  _id?: string;
  guardianID: string; //google UID
  patient_name: string;
  // age_years: number;
  // age_months: number;
  birthdate: Date;
  shareData: boolean;
}

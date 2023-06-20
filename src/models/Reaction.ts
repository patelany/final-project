export default interface Reaction {
  _id?: string;
  trial_id: string;
  body_area: string;
  symptom: string;
  date_time_observed: Date;
  //display_date?: string;
  symptom_photo_url?: string;
}

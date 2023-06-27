import "./Email.css";

import React, { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import Trial from "../models/Trial";
import Reaction from "../models/Reaction";
import dateFormat from "../utils/helperFunctions";

interface Props {
  trial: Trial | null;
  reactions: Reaction[];
}

const Email = ({ trial, reactions }: Props) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_oxgad8d",
        "template_q00d45v",
        form.current || "",
        "M-Lt_Qyn62RfVTDJ0"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const formatTrial = (
    trialObj: Trial | null,
    reactions: Reaction[]
  ): string => {
    if (trialObj) {
      return `\n Trial name: ${trialObj.trial_name} \n Trial Status: ${
        trialObj.trial_pass
      } \n Trial Type: ${trialObj.trial_type} \n Food Type: ${
        trialObj.food_type
      } \n Specific Food Given: ${
        trialObj.trial_food
      } \n Trial Start Date: ${dateFormat(
        trialObj.start_date.toString()
      )} \n ${reactions.map(
        (reaction, index) =>
          `Reaction number: ${index + 1} \n Area of the body: ${
            reaction.body_location_desc
          } \n Symptom: ${
            reaction.symptom_desc
          } \n Date/Time Observed: ${dateFormat(
            reaction.date_time_observed.toString()
          )}`
      )}`;
    } else {
      return "";
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="emailForm">
      <label>Your Name</label>
      <input type="text" name="user_name" />
      <p></p>
      <label>Doctor's Email</label>
      <input type="email" name="to_email" />
      <p></p>
      <textarea
        name="trial_details"
        value={formatTrial(trial, reactions)}
        hidden
      />
      <label>Additional Notes for the Doctor</label>
      <p></p>
      <textarea
        name="message"
        rows={5}
        cols={20}
        style={{
          maxWidth: "300px",
          maxHeight: "300px",
          minWidth: "100px",
          minHeight: "100px",
        }}
      />
      <p></p>
      <input type="submit" value="Send" />
    </form>
  );
};

export default Email;

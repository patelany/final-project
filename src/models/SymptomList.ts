import React from "react";
export default interface SymptomList {
  ID: number;
  Name: string;
  HasRedFlag: boolean;
  HealthSymptomLocationIDs: [];
  ProfName: "";
  Synonyms: [];
}

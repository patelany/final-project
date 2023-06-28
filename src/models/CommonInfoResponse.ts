import React from "react";
export default interface CommonInfoResponse {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type: number;
  tag_id: string;
  photo: {
    thumb: string;
  };
  locale: string;
}

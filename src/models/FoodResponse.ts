import React from "react";
import CommonInfoResponse from "./CommonInfoResponse";
import BrandedInfoResponse from "./BrandedInfoResponse";

export default interface FoodResponse {
  common: CommonInfoResponse[];
  branded: BrandedInfoResponse[];
}

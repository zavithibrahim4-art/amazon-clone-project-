import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import isWeekend from "./skippingWeekendDelivery.js";

export function deliveryOptionToDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}
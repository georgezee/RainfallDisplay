export class DateUtil {

  static currentYear() {
    return new Date().getFullYear();
  }

  static formatDate(theDate) {
    let theMonth = ("0" + (theDate.getMonth() + 1)).slice(-2);
    let theDay = ("0" + (theDate.getDay() + 1)).slice(-2);
    let dateString = theDate.getFullYear() + "-" + theMonth + "-" + theDay;
    return dateString;
  }

  // // Return whether a date is within the last X days.
  // static isRecent(theDate, days) {
  //   const date1 = theDate;
  //   const date2 = new Date();
  //   const diffTime = Math.abs(date2 - date1);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays > days) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
export class DateUtil {

  static currentYear() {
    return new Date().getFullYear();
  }

  static formatDate(theDate) {
    let theMonth = ("0" + (theDate.getMonth() + 1)).slice(-2);
    let theDay = ("0" + (theDate.getDate())).slice(-2);
    let dateString = theDate.getFullYear() + "-" + theMonth + "-" + theDay;
    return dateString;
  }

  // Return whether a date is within the last X days.
  static isRecent(theDate, days) {
    const date1 = theDate;
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= days) {
      return true;
    } else {
      return false;
    }
  }

  // Return a date formatted for the table column headings, depending on the unit scale.
  static getPeriodFormat(theDate, unit) {
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (unit === 'day') {
      let theDay = ("0" + (theDate.getDate())).slice(-2);
      return monthNames[theDate.getMonth()] + " " + theDay;
    } else if (unit === 'week') {
      let weekNum = this.getWeekNumber(theDate) + "";
      // Add the year label to the first and last weeks of the year.
      if (weekNum === "01") {
        weekNum += " '" + theDate.getFullYear();
      }
      return weekNum;
    } else { // month
      return monthNames[theDate.getMonth()] + " " + theDate.getFullYear();
    }
  }

  /* For a given date, get the ISO week number
  *
  * Based on:
  *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
  *    https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  */
  static getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    // Add a leading zero
    weekNo = ("0" + (weekNo)).slice(-2);
    return weekNo;
  }

}

export class GeneralUtil {
  static calculateColor = (input, minMax) => {
    if (!input) {
      return 0;
    }

    const dataMax = minMax[1];
    let percentage = (input / dataMax);
    if (input > dataMax) {
      percentage = 1;
    }
    // We want to limit opacity to 80% of total.
    percentage = percentage * 0.8;

    let baseColour = "#42a5f5"; // Primary Main
    let opacityVal = Math.floor(255 * percentage);
    let opacityHex = ("0" + opacityVal.toString(16)).slice(-2);
    //console.log("input:" + input + ", percent:" + percentage + ", opacity:" + opacityVal + ", hex:" + opacityHex);
    return baseColour + opacityHex;
  }
}
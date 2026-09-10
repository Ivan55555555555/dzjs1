const moment = require('moment');
const today = moment();

function getCurrentDay() {
  const dayName = today.format('dddd');
  console.log(dayName);
}

function getCurrentMonth() {
  const monthName = today.format('MMMM');
  console.log(monthName);
}

function getCurrentYear() {
  const year = today.format('YYYY');
  console.log(year);
}

getCurrentDay();
getCurrentMonth();
getCurrentYear();
(function(w) {

  const schedule = w.schedule;

  function getWeekNumber (date) {
    const d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  }

  function getYesterday(day) {
    if (day) return day - 1;
    return 6;
  }

  function StringToMs(string) {
    const time = string.split(':');
    const hours = ~~time[0] * 60 * 60;
    const minutes = ~~time[1] * 60;
    return (hours + minutes) * 1000;
  }

  function isWorkingNight(yesterday, todayInMs) {
    if(!yesterday.start) return false;
    const dayMs = 24 * 60 * 60 * 1000;
    const yesterdayEndTime = StringToMs(yesterday.end);
    return yesterdayEndTime - (todayInMs + dayMs) >= 0;
  }

  function isWorking(date = Date.now()) {
    const now = new Date(date); // '2016-05-14 10:10'
    const week = (getWeekNumber(now) % 2) ? 'odd' : 'even';
    const day = now.getDay();
    const hoursMinutes = now.getHours() +':'+ now.getMinutes();
    const todayInMs = StringToMs(hoursMinutes);
    const today = schedule[week][day];
    const yesterday = schedule[week][getYesterday(day)];

    console.log('Week:', week, ', day:', day, ', time:', hoursMinutes);

    if (isWorkingNight(yesterday, todayInMs)) return true;
    if (!today.start) return false;

    const start = StringToMs(today.start);
    const end = StringToMs(today.end);

    return todayInMs >= start && todayInMs <= end;
  }

  w.isWorking = isWorking;
})(window);

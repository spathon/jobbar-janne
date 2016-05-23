# jobbar-janne

### Exampe schedule
Name the file alphabetically lower than `isWorking.js`  
End times that happen after 24:00 just add the hours to 24 e.g 02:00 = 27:00
```js
(function(w) {
  w.schedule = {
    even: {
      '1': { start: '22:00', end: '27:00' },
      '2': {},
      '3': {},
      '4': { start: '05:30', end: '12:20' },
      '5': {},
      '6': { start: '12:00', end: '25:00' },
      '0': { start: '10:00', end: '11:00' }
    },
    odd: {
      '1': {},
      '2': { start: '22:00', end: '27:00' },
      '3': {},
      '4': { start: '05:30', end: '12:20' },
      '5': { start: '12:00', end: '25:00' },
      '6': {},
      '0': { start: '10:00', end: '11:00' }
    }
  };
})(window);
```

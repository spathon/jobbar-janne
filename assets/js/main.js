(function(d, w) {

  const answer = w.isWorking();
  const heading = d.getElementById('answer');

  heading.textContent = answer ? 'Ja' : 'Nej';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  }
})(document, window);

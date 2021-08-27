import React from 'react';

export default function ButtonCalendar() {
  var gapi = window.gapi;
  var API_KEY = 'AIzaSyBfkwj9QWFYa02ZeH5d2qqrRnEv7f-TD-M';
  var CLIENT_ID =
    '843113615203-pim5k8uv0clq20p98jaq1hhnu273nso5.apps.googleusercontent.com';
  var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const setReminder = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('bam!'));
      // console.log(gapi.auth2.getAuthInstance());

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Absensi!',
            location: 'Home',
            description: 'Budayakan Disiplin dengan Presensi!',
            start: {
              dateTime: '2020-08-27T09:00:00-07:00',
              timeZone: 'Asia/Jakarta',
            },
            end: {
              dateTime: '2020-08-28T17:00:00-07:00',
              timeZone: 'Asia/Jakarta',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <button
      onClick={setReminder}
      className="bg-apps-primary px-4 py-2 mt-8 rounded-lg text-white ">
      Remind me Tomorrow
    </button>
  );
}

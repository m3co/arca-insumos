'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'select',
      module: 'Supplies',
    });

    client.emit('data', {
      query: 'subscribe',
      module: 'Supplies'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'Supplies') {
        action = supplies[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar Supplies');
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);

'use strict';
((io) => {
  var client = io();
  var ProjectId = location.search.match(/\d+$/);
  client.on('connect', () => {
    console.log('connection');

    if (ProjectId) {
      client.emit('data', {
        query: 'select',
        module: 'viewSupplies1',
        project: ProjectId
      });
    }

    client.emit('data', {
      query: 'select',
      module: 'Projects',
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'viewSupplies1') {
        action = supplies[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar viewSupplies1');
        }
      } else if (query == 'select' && data.module == 'Projects') {
        window.projects.doselect(data.row);
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);

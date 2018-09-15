'use strict';
((io) => {
  var client = io();
  var params = new URLSearchParams(window.location.search);
  var ProjectId = params.get('ProjectId');
  var type = params.get('type') || '';
  var level = Number(params.get('level') || 1);
  client.on('connect', () => {
    console.log('connection');

    if (ProjectId) {
      const req = {
        query: 'select',
        module: 'fnViewSuppliesLevel',
        project: ProjectId,
        level: level
      };
      if (type) { req.type = type; }
      client.emit('data', req);
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
      if (data.module == 'fnViewSuppliesLevel') {
        action = supplies[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar fnViewSuppliesLevel');
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

'use strict';
(() => {

  const fields = [
    'id',
    'description',
    'cost',
    'type',
    'unit'
  ];

  const header = ['', 'Descripcion', 'Costo', 'Tipo', 'Unidad'];

  window.supplies = setupTable({
    module: 'Supplies',
    header: header,
    fields: fields,
    actions: [],
    validations: [],
    idkey: 'id',
  });

})();

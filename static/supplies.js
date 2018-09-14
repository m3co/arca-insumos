'use strict';
(() => {

  const fields = [
    'AAUId', 'SupplyId',
    'description',
    'cost',
    'type',
    'unit'
  ];

  const header = ['APU', 'Insumo', 'Descripcion', 'Costo', 'Tipo', 'Unidad'];

  window.supplies = setupTable({
    module: 'Supplies',
    header: header,
    fields: fields,
    actions: [],
    validations: [],
    idkey: 'id',
  });

})();

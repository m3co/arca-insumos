'use strict';
(() => {

  const fields = [
    {
      key: 'AAUId',
      readonly: true
    },
    {
      key: 'SupplyId',
      readonly: true
    },
    {
      key: 'description',
      readonly: true
    },
    {
      key: 'cost',
      name: 'cost',
      reflectidkey: 'SupplyId',
      idkey: 'id',
      excludeFields: ['qop']
    },
    {
      key: 'type',
      readonly: true
    },
    {
      key: 'Quantity',
      call: (selection) => {
        selection.text(d => {
          return (Number(d.qop || 0) * Number(d.quantity || 0)).toFixed(2);
        });
      }
    },
    {
      key: 'unit',
      readonly: true
    },
    {
      key: 'PartialCost',
      call: (selection) => {
        selection.text(d => {
          return Number((Number(d.cost || 0) * Number(d.qop || 0) * Number(d.quantity || 0)).toFixed(0)).toLocaleString();
        });
      }
    }
  ];

  const header = ['APU', 'Insumo', 'Descripcion', 'Costo', 'Tipo', 'Cantidad', 'Unidad', 'Valor Parcial'];

  window.supplies = setupTable({
    module: 'Supplies',
    header: header,
    fields: fields,
    actions: [],
    validations: [],
    idkey: 'id',
  });

})();

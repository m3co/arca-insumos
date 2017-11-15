
namespace eval fnSuppliesByLevel1 {
  variable rows
  variable frame
  variable project
  array set rows {}

  proc open { space id } {
    variable frame $space
    variable project $id
    array set event [list \
      query select \
      module fnSuppliesByLevel1 \
      from fnSuppliesByLevel1 \
      project $id
    ]

    pack [labelframe $frame.level1 -text "Capitulo"] -side left
    pack [labelframe $frame.description -text "Descripcion"] -side left
    pack [labelframe $frame.quantity -text "Cantidad"] -side left
    pack [labelframe $frame.unit -text "Unidad"] -side left
    pack [labelframe $frame.type -text "Tipo"] -side left
    pack [labelframe $frame.cost -text "Valor Unitario"] -side left
    pack [labelframe $frame.partial -text "Costo Total"] -side left
    chan puts $MAIN::chan [array get event]
  }

  proc 'do'update { resp } {
    variable frame
    variable project
    upvar $resp response
    array set row [deserialize $response(row)]
    variable rows
    array set rows [list $row(id) $response(row)]

    set id "[regsub -all {[.]} $row(level1) "_"]_$row(id)"
    foreach param [list id description type unit] {
      set fr $frame.$param.$id
      if { [winfo exists $fr] == 0 } {
        return
      }
      if { $param == "id" } {
        $fr.label configure -text $row($param)
      } else {
        array set rowsupply [deserialize $response(row)]
        array set conf [list \
          from Supplies \
          module Supplies \
          idkey id \
          frame $fr \
          key $param \
        ]
        labelentry::setup [array get conf] [array get rowsupply]
      }
    }
    foreach param [list quantity cost partial] {
      set fr $frame.$param.$id
      if { $param == "cost" } {
        array set rowsupply [deserialize $response(row)]
        array set conf [list \
          from Supplies \
          module Supplies \
          idkey id \
          frame $fr \
          key $param \
          currency true \
          dollar true \
        ]
        labelentry::setup [array get conf] [array get rowsupply]
      } elseif { $param == "partial" } {
        $fr.label configure -text "\$[format'currency $row($param)]"
      } else {
        $fr.label configure -text "[format'currency $row($param)]"
      }
    }
  }

  proc 'do'insert { resp } {
    upvar $resp response
    array set row [deserialize $response(row)]

    if { $row(project) != $project } {
      return
    }
    'do'select response
  }

  proc 'do'select { resp } {
    variable frame
    upvar $resp response
    array set row [deserialize $response(row)]
    variable rows
    array set rows [list $row(id) $response(row)]

    set id "[regsub -all {[.]} $row(level1) "_"]_$row(id)"
    foreach param [list level1 description type unit] {
      set fr $frame.$param.$id
      pack [frame $fr] -fill x -expand true
      if { $param == "id" } {
        pack [label $fr.label -text $row($param)] -side left
      } else {
        array set rowsupply [deserialize $response(row)]
        array set conf [list \
          from Supplies \
          module Supplies \
          idkey id \
          frame $fr \
          key $param \
        ]
        labelentry::setup [array get conf] [array get rowsupply]
      }
    }
    foreach param [list quantity] {
      set fr $frame.$param.$id
      pack [frame $fr] -fill x -expand true
      pack [label $fr.label -text "[format'currency $row($param)]"] \
        -side right
    }
    foreach param [list partial cost] {
      set fr $frame.$param.$id
      pack [frame $fr] -fill x -expand true
      if { $param == "cost" } {
        array set rowsupply [deserialize $response(row)]
        array set conf [list \
          from Supplies \
          module Supplies \
          idkey id \
          frame $fr \
          key $param \
          currency true \
          dollar true \
        ]
        labelentry::setup [array get conf] [array get rowsupply]
      } else {
        pack [label $fr.label -text "\$[format'currency $row($param)]"] \
          -side right
      }
    }
  }

}

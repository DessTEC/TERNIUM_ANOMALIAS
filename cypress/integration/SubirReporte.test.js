describe("Pruebas de subir un reporte", () => {
    it("Se sube un reporte", () => {
        //Subir el archivo
        cy.visit("/dashboard/subir");
        const fixtureFile = 'inputCat.csv';
        cy.get('input[type="file"]').attachFile(fixtureFile);
        cy.get("#configurar").click()
        cy.wait(10000)
        cy.url().should('eq', 'http://localhost:3000/dashboard/subir/parametros')

        //Configurar columnas
        // cy.get('ul[data-rbd-droppable-id="subidos"]>li').each(($element, index, list) => {
        //     cy.get($element).drag('ul[data-rbd-droppable-id="externos"]')
        // })
        // const dataTransfer = new DataTransfer();
        // cy.get('li[data-rbd-draggable-id="C_ID_PERMISO_CIRCULACION"]').trigger("dragstart", {
        //     dataTransfer
        // });

        // cy.get('ul[data-rbd-droppable-id="externos"]').trigger("drop", {
        //     dataTransfer
        // });

        const dataTransfer = new DndSimulatorDataTransfer()

        cy.get('li[data-rbd-draggable-id="C_ID_PERMISO_CIRCULACION"]')
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart', { dataTransfer })
        .trigger('drag', {})

        cy.get('ul[data-rbd-droppable-id="externos"]')
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer })
        .trigger('dragend', { dataTransfer })
        .trigger('mouseup', { which: 1 })

        //cy.get('li[data-rbd-draggable-id="C_ID_PERMISO_CIRCULACION"]').drag('ul[data-rbd-droppable-id="externos"]', {force: true})
        
    })
})


function DndSimulatorDataTransfer() {
    this.data = {}
  }
  
  DndSimulatorDataTransfer.prototype.dropEffect = "move"
  DndSimulatorDataTransfer.prototype.effectAllowed = "all"
  DndSimulatorDataTransfer.prototype.files = []
  DndSimulatorDataTransfer.prototype.items = []
  DndSimulatorDataTransfer.prototype.types = []
  
  DndSimulatorDataTransfer.prototype.clearData = function(format) {
    if(format) {
      delete this.data[format]
  
      const index = this.types.indexOf(format)
      delete this.types[index]
      delete this.data[index]
    } else {
      this.data = {}
    }
  }
  
  DndSimulatorDataTransfer.prototype.setData = function(format, data) {
    this.data[format] = data
    this.items.push(data)
    this.types.push(format)
  }
  
  DndSimulatorDataTransfer.prototype.getData = function(format) {
    if(format in this.data) {
      return this.data[format]
    }
  
    return ""
  }
  
  DndSimulatorDataTransfer.prototype.setDragImage = function(img, xOffset, yOffset) {
    // since simulation doesn"t replicate the visual
    // effects, there is no point in implementing this
  }
document.addEventListener('DOMContentLoaded', () => {

  new Cleave('#telefone', {
    phone: true,
    phoneRegionCode: '{country}'
  });

})

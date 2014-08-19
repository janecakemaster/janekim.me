(function() {

  var nav = document.querySelector('nav'),
  label = nav.querySelector('.label');

  function displayLabel(e) {
    if (e.target.id) {
      // e.target.classList.add('bounce');
      label.innerHTML = e.target.id;
    }
    else {
      label.innerHTML = '';
    }
  }

  nav.addEventListener('mouseover', displayLabel, false);

}());

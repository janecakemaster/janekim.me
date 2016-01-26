{
  const nav = document.querySelector('nav');
  const label = nav.querySelector('.label');

  function displayLabel(e) {
    if (e.target.getAttribute('data-label')) {
      label.innerHTML = e.target.getAttribute('data-label');
    }
  }

  nav.addEventListener('mouseover', displayLabel, false);
}

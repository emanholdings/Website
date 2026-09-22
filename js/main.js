// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Project filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        projectCards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
        });
      });
    });
  }

  // Contact form (static — no backend yet).
  // To go live: replace the fetch() below with your form endpoint
  // (e.g. Formspree, Netlify Forms, or a mailto/API of your choice).
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      status.className = '';

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email and message.';
        status.className = 'error';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'error';
        return;
      }

      // No backend is wired up yet — fall back to opening the user's email client.
      var propertyType = form.querySelector('#propertyType') ? form.querySelector('#propertyType').value : '';
      var phone = form.querySelector('#phone') ? form.querySelector('#phone').value : '';
      var subject = encodeURIComponent('Energy assessment request from ' + name + (propertyType ? ' (' + propertyType + ')' : ''));
      var bodyLines = [message, '', 'Name: ' + name, 'Email: ' + email];
      if (phone) bodyLines.push('Phone: ' + phone);
      if (propertyType) bodyLines.push('Property type: ' + propertyType);
      var body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = 'mailto:' + BRAND.email + '?subject=' + subject + '&body=' + body;

      status.textContent = 'Opening your email client to send this through...';
      status.className = 'success';
    });
  }
});

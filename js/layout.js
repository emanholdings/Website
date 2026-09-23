// Renders the shared header and footer from BRAND (js/brand.js) into the
// <header id="site-header"> and <footer id="site-footer"> placeholders that
// every page includes. This is what keeps nav links, the logo and the
// business name in one place instead of duplicated across every HTML file.

var NAV_ITEMS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'commercial.html', label: 'Commercial', key: 'commercial' },
  { href: 'residential.html', label: 'Residential', key: 'residential' },
  { href: 'battery-storage.html', label: 'Battery Storage', key: 'battery' },
  { href: 'ev-charging.html', label: 'EV Charging', key: 'ev' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'contact.html', label: 'Book an Assessment', key: 'contact' }
];

// Eman Holdings icon mark (images/eman-holdings-icon.png), cropped from
// the supplied logo artwork — same ring/starburst motif the future
// Chartered Energy emblem uses, just wordmarked for now. To rebrand,
// swap this file (and images/eman-holdings-logo.png, used on the Home
// hero) for the new artwork; no HTML/CSS changes needed.
function brandLogoMark() {
  return '<img class="mark" src="images/eman-holdings-icon.png" alt="">';
}

function renderHeader(activeKey) {
  var links = NAV_ITEMS.map(function (item) {
    var cls = item.key === activeKey ? ' class="active"' : '';
    return '<a href="' + item.href + '"' + cls + '>' + item.label + '</a>';
  }).join('');

  return (
    '<div class="container nav-wrap">' +
      '<a href="index.html" class="logo">' + brandLogoMark() +
        '<span class="brand-name">' + BRAND.name.toUpperCase() + '</span>' +
      '</a>' +
      '<nav class="nav-links">' + links + '</nav>' +
      '<div class="nav-cta"><a href="contact.html" class="btn btn-primary btn-sm">Book a Free Energy Assessment</a></div>' +
      '<button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>' +
    '</div>'
  );
}

function renderFooter() {
  return (
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<a href="index.html" class="logo">' + brandLogoMark() +
            '<span class="brand-name">' + BRAND.name.toUpperCase() + '</span></a>' +
          '<p>Engineering-led solar and battery design for homes and businesses across ' + BRAND.regions + '.</p>' +
        '</div>' +
        '<div class="footer-col"><h4>Company</h4><ul>' +
          '<li><a href="about.html">About</a></li>' +
          '<li><a href="commercial.html">Commercial</a></li>' +
          '<li><a href="residential.html">Residential</a></li>' +
          '<li><a href="contact.html">Book an Assessment</a></li>' +
        '</ul></div>' +
        '<div class="footer-col"><h4>What We Do</h4><ul>' +
          '<li><a href="commercial.html">Commercial Solar &amp; Battery</a></li>' +
          '<li><a href="residential.html">Residential Solar &amp; Battery</a></li>' +
          '<li><a href="battery-storage.html">Battery Storage</a></li>' +
          '<li><a href="ev-charging.html">EV Charging</a></li>' +
        '</ul></div>' +
        '<div class="footer-col"><h4>Contact</h4><ul>' +
          '<li><a href="' + BRAND.phoneHref + '">' + BRAND.phone + '</a></li>' +
          '<li><a href="mailto:' + BRAND.email + '">' + BRAND.email + '</a></li>' +
          '<li>' + BRAND.address.street + ', ' + BRAND.address.suburb + ' ' + BRAND.address.state + ' ' + BRAND.address.postcode + '</li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; <span id="year"></span> ' + BRAND.name + '. All rights reserved.</span>' +
        '<span><a href="complaints.html">Complaints Procedure</a></span>' +
      '</div>' +
    '</div>'
  );
}

function injectLocalBusinessSchema() {
  var schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.name,
    email: BRAND.email,
    telephone: BRAND.phoneHref.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.suburb,
      addressRegion: BRAND.address.state,
      postalCode: BRAND.address.postcode,
      addressCountry: 'AU'
    },
    areaServed: BRAND.regions,
    url: window.location.origin + '/'
  };
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function () {
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  var activeKey = document.body.getAttribute('data-page') || '';
  if (headerEl) headerEl.innerHTML = renderHeader(activeKey);
  if (footerEl) footerEl.innerHTML = renderFooter();
  injectLocalBusinessSchema();
  document.querySelectorAll('[data-brand-name]').forEach(function (el) {
    el.textContent = BRAND.name;
  });
  document.querySelectorAll('[data-brand-email]').forEach(function (el) {
    el.textContent = BRAND.email;
    if (el.tagName === 'A') el.href = 'mailto:' + BRAND.email;
  });
  document.querySelectorAll('[data-brand-phone]').forEach(function (el) {
    el.textContent = BRAND.phone;
    if (el.tagName === 'A') el.href = BRAND.phoneHref;
  });
  document.querySelectorAll('[data-brand-regions]').forEach(function (el) {
    el.textContent = BRAND.regions;
  });
  document.querySelectorAll('[data-brand-address]').forEach(function (el) {
    el.textContent = BRAND.address.street + ', ' + BRAND.address.suburb + ' ' + BRAND.address.state + ' ' + BRAND.address.postcode;
  });
});

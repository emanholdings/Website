// Single source of truth for business name and contact details.
// When the business name changes (Eman Holdings -> Chartered Energy or
// Engineered Power Solutions), update ONLY this file. Every page pulls
// its header, footer and brand references from here via layout.js.
var BRAND = {
  name: 'Eman Holdings',
  // Set to 'Solutions Designed by Engineers' when relaunching as
  // Chartered Energy — do not display publicly under Eman Holdings
  // until instructed.
  tagline: '',
  // Current contact email. Note (2026-09-22): plan to switch this to a
  // domain-based address (e.g. ian@emanholdings.com.au, or
  // ian@charteredenergy.com.au after rebrand) once set up — update here only.
  email: 'ieman@me.com',
  phone: '0467 440 953',
  phoneHref: 'tel:+61467440953',
  address: {
    street: '402/16 Jamieson Street',
    suburb: 'Cheltenham',
    state: 'VIC',
    postcode: '3192'
  },
  // Service area wording — expand here when the advertised area grows.
  regions: 'Melbourne, Victoria',
  founder: {
    name: 'Ian Eman',
    firstName: 'Ian',
    credentials: 'Chartered Professional Engineer · RPEQ · RPEV'
  }
};

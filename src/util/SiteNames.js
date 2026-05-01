// Map of site ID keys to display names.
// To add or update a site, add/edit an entry here.
const SITE_NAMES = {
  'BK1': 'Bokkemanskloof',
  'CN1': 'Constantia Nek',
  'HH1': 'Harbour Heights',
  'KR1': 'Kenrock Estate',
  'LD1': 'Llandudno',
  'NG1': 'Nooitgedacht',
  'NS1': 'Northshore',
  'MD1': 'Meadows',
  'OK1': 'Northoaks',
  'SE3': 'Scott Estate',
  'VK1': 'Victorskloof',
};

export function getSiteDisplayName(key) {
  return SITE_NAMES[key] || key;
}

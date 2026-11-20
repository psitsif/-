// Asset helper to resolve local images dynamically both in dev and production (Vite / GitHub Pages)
const assetModules = import.meta.glob(
  '../assets/**/*.{png,jpg,jpeg,webp,svg,gif,ico,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true, import: 'default' }
);

export function resolveAsset(path) {
  if (!path || typeof path !== 'string') return path;

  // External or data URLs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // If pointing to backend uploads
  if (path.startsWith('/uploads/') || path.startsWith('uploads/')) {
    const cleanUpload = path.startsWith('/') ? path : `/${path}`;
    const envUrl = import.meta.env?.VITE_API_URL;
    if (envUrl) {
      return envUrl.trim().replace(/\/$/, '') + cleanUpload;
    }
    return cleanUpload;
  }

  // Normalize path variations to match keys in assetModules:
  // Keys in assetModules look like: '../assets/logos/senseoriginal.png'
  let rel = path;
  if (rel.startsWith('/src/assets/')) {
    rel = '../assets/' + rel.slice('/src/assets/'.length);
  } else if (rel.startsWith('src/assets/')) {
    rel = '../assets/' + rel.slice('src/assets/'.length);
  } else if (rel.startsWith('/assets/')) {
    rel = '../assets/' + rel.slice('/assets/'.length);
  } else if (rel.startsWith('assets/')) {
    rel = '../assets/' + rel.slice('assets/'.length);
  }

  if (assetModules[rel]) {
    return assetModules[rel];
  }

  // Fallback: match by file name (case-insensitive)
  const fileName = path.split('/').pop().toLowerCase();
  for (const [key, val] of Object.entries(assetModules)) {
    if (key.toLowerCase().endsWith('/' + fileName)) {
      return val;
    }
  }

  return path;
}

export function resolveItemAssets(item) {
  if (!item || typeof item !== 'object') return item;
  const clone = { ...item };

  if (clone.logo) {
    clone.logo = resolveAsset(clone.logo);
  }
  if (clone.image) {
    clone.image = resolveAsset(clone.image);
  }
  if (Array.isArray(clone.photos)) {
    clone.photos = clone.photos.map(p => resolveAsset(p));
  }

  return clone;
}

export function resolveListAssets(list) {
  if (!Array.isArray(list)) return [];
  return list.map(resolveItemAssets);
}

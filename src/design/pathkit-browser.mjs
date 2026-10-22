export const pathKitOptions = () => ({ locateFile: (file) => new URL(`${file}?v=1.0.0`, globalThis.location.href).href });

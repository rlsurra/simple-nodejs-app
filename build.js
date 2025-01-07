const fs = require('fs');
const path = require('path');

// Directorios de origen y destino
const srcDir = path.resolve(__dirname);
const distDir = path.resolve(__dirname, 'dist');

// Crear el directorio dist si no existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copiar el archivo index.js
fs.copyFileSync(path.join(srcDir, 'index.js'), path.join(distDir, 'index.js'));
console.log('Archivo index.js copiado.');

// Copiar la carpeta views
const copyDirectory = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const srcPath = path.join(source, file);
    const destPath = path.join(destination, file);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath); // Recursión para subdirectorios
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Archivo copiado: ${srcPath} -> ${destPath}`);
    }
  });
};

// Copiar package.json y package-lock.json
['package.json', 'package-lock.json'].forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(distDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Archivo copiado: ${srcPath} -> ${destPath}`);
  }
});

// Copiar la carpeta views
copyDirectory(path.join(srcDir, 'views'), path.join(distDir, 'views'));

console.log('Build completado.');

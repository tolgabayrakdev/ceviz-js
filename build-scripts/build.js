import fs from 'fs';
import path from 'path';
import { minify } from 'terser';

// Kaynak ve hedef dizinler
const sourceDir = './src';
const outputDir = './dist';

// `src` klasöründeki tüm dosyaları oku
fs.readdirSync(sourceDir).forEach(file => {
  const filePath = path.join(sourceDir, file);
  const outputFilePath = path.join(outputDir, file.replace('.js', '.min.js'));

  // Sadece .js dosyalarını işleme
  if (file.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf8');

    // Minify et
    minify(code)
      .then(result => {
        if (result.error) {
          console.error(`Minification failed for ${file}:`, result.error);
        } else {
          // Minify edilmiş dosyayı yaz
          fs.writeFileSync(outputFilePath, result.code);
          console.log(`${file} başarıyla minify edildi!`);
        }
      })
      .catch(err => {
        console.error(`Minification error for ${file}:`, err);
      });
  }
});

# CevizJS - Basit JSON Veritabanı Kütüphanesi

CevizJS, JSON dosyasında veri saklayan basit bir veritabanı kütüphanesidir. Tek bir dosya ile çalışır ve verilerinizi JSON formatında saklar.

## Özellikler
- **Şema Oluşturma**: `createSchema(schemaName)` ile şema oluşturun.
- **Veri Ekleme**: `create(schemaName, data)` ile veri ekleyin.
- **Veri Alma**: `getAll(schemaName)` ile tüm verileri alın.
- **Veri Güncelleme**: `update(schemaName, id, data)` ile veriyi güncelleyin.
- **Veri Silme**: `delete(schemaName, id)` ile veri silin.
- **Veri Sıralama**: `sortBy(schemaName, field, ascending)` ile verileri sıralayın.



## Kullanım

```javascript
const CevizJS = require('cevizjs');
const db = new CevizJS('database.json');

// Şema Oluşturma
db.createSchema('fruits');

// Veri Ekleme
db.create('fruits', { name: 'Apple', color: 'Red' });

db.findById('fruits', 1)

db.update('fruits', 1, { color: 'Green' });


Bu yapıyı kullanarak, **CevizJS** kütüphanenizin temel fonksiyonlarını oluşturabilir ve kullanıcılar için kolayca erişilebilir hale getirebilirsiniz.







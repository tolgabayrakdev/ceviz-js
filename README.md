# CevizJS

**CevizJS** basit, taşınabilir ve kolay kullanımlı bir JSON veritabanı
kütüphanesidir. Tek bir dosya kullanarak verilerinizi saklayabilir,
sorgulayabilir, güncelleyebilir ve yedekleyebilirsiniz. Özellikle küçük projeler
ve kişisel kullanım için idealdir.

---

## Özellikler

- **Taşınabilir ve Basit**: Verilerinizi tek bir JSON dosyasında saklar.
- **Auto-increment ID**: Veritabanındaki her öğeye otomatik olarak artan bir ID
  atar.
- **CRUD İşlemleri**: Veriyi oluşturma, okuma, güncelleme ve silme işlemlerini
  kolayca yapabilirsiniz.
- **Sorgulama ve Filtreleme**: Belirli kriterlere göre veri sorgulama (filter).
- **Veri Sıralama**: Verileri belirli bir alana göre artan veya azalan şekilde
  sıralama.
- **Yedekleme ve Geri Yükleme**: Veritabanınızı yedekleyip, ihtiyaç duyduğunuzda
  geri yükleyebilirsiniz.
- **Şema Tabanlı Yapı**: Her veri kümesi için bir şema oluşturabilirsiniz.

---

## Kurulum

**CevizJS**, NPM üzerinden kolayca yüklenebilir:

```js
npm install cevizjs

import CevizJS from 'cevizjs';
const db = new CevizJS('mydatabase.json');

await db.createSchema('fruits', {
  name: { type: 'string' },
  color: { type: 'string' },
});

await db.create('fruits', { name: 'Apple', color: 'Red' });
await db.create('fruits', { name: 'Banana', color: 'Yellow' });

const fruits = await db.getAll('fruits');
console.log(fruits);
```

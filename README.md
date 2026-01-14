# 🎯 Kim Milyoner Olmak İster - Quiz Oyunu

"Kim Milyoner Olmak İster" tarzında interaktif bilgi yarışması oyunu! Kendi sorularınızı ekleyin ve özelleştirin. Ses efektleri ve skor sistemiyle gerçek yarışma deneyimi.

## 📸 Ekran Görüntüleri

<p align="center">
  <img src="images/image.png" alt="Ana Sayfa" width="45%">
  <img src="images/image2.png" alt="Oyun Ekranı" width="45%">
</p>

## 💡 Proje Hikayesi

Bu proje, **yapay zeka destekli geliştirme araçları** kullanılarak **hiçbir kod bilgisi olmadan** 2024 yılında geliştirilmiştir. O dönemde LLM tabanlı kodlama asistanları yeni yeni yaygınlaşmaya başlamıştı ve bu proje, yapay zeka ile sohbet ederek tam bir web uygulaması geliştirmenin mümkün olduğunu göstermiştir.

**🌟 Öne Çıkan Yönler:**
- Tamamen sohbet tabanlı yapay zeka kullanarak geliştirilmiştir
- Geleneksel programlama eğitimi gerektirmemiştir
- Modern web teknolojilerini başarıyla entegre etmiştir
- Ses sistemleri, animasyonlar ve kullanıcı deneyimi üzerine odaklanmıştır

Bu, yapay zeka destekli yazılım geliştirmenin potansiyelini gösteren güzel bir örnektir!

## ✨ Özellikler

- 🎵 **5 farklı ses efekti** (giriş müziği, soru başlangıcı, doğru/yanlış cevap sesleri)
- 📊 **Skor sistemi** ve liderlik tablosu (localStorage ile kalıcı)
- 🎲 **Rastgele soru seçimi** - Her oyun farklı sorularla
- ⚙️ **Ayarlanabilir soru sayısı** - İstediğiniz kadar soru veya tümü
- 📝 **Kolay soru ekleme** - Programlama bilgisi gerektirmez!
- 📱 **Responsive tasarım** - Mobil ve tablet uyumlu
- 🎨 **Modern arayüz** - Gradyan renkler, animasyonlar ve profesyonel tasarım
- 🏆 **Yarışma modu** - Arkadaşlarınızla rekabet edin

## 🚀 Kurulum

1. Projeyi indirin:
```bash
git clone https://github.com/gunhanmehmetakif/kim-milyoner-oyunu.git
```

2. `index.html` dosyasını herhangi bir tarayıcıda açın
3. Oyuna başlayın!

**NOT:** Sunucu kurulumuna gerek yok, direkt çalışır!

## 🎮 Nasıl Oynanır?

1. **Ana menüden** "Başla" butonuna tıklayın
2. **Her soruyu** okuyup doğru şıkkı seçin
3. **Puanınızı** görün ve liderlik tablosuna kaydedin
4. **Tekrar oynayın** ve skorunuzu geliştirin!

## 📝 Kendi Sorularınızı Ekleyin!

**Hiçbir programlama bilgisine gerek yok!** `questions.js` dosyasını düzenleyerek istediğiniz konuda sorular ekleyebilirsiniz:

- 📚 Ders çalışma için (Biyoloji, Tarih, Matematik, Fizik...)
- 🎉 Eğlence için (Genel Kültür, Spor, Film, Müzik...)
- 🏢 İş görüşmeleri için (Mesleki sorular)
- 👨‍👩‍👧‍👦 Aile eğlencesi için

### Soru Sayısını Ayarlama

Dosyanın başında:
```javascript Örneği

```javascript
{
    soru: "Türkiye'nin başkenti neresidir?",
    cevaplar: ["İstanbul", "Ankara", "İzmir", "Bursa"],
    doğru: "B"  // A, B, C veya D
}
```

**🎓 Adım adım kılavuz:** `SORULAR-NASIL-EKLENIR.txt` dosyasında her şey açıklanmış!
    doğru: "B"  // A, B, C veya D
}
```

Detaylı açıklama için `SORULAR-NASIL-EKLENIR.txt` dosyasına bakın.

## 📁 Dosya Yapısı

```
├── index.html              # Ana HTML dosyası
├── script.js               # Oyun mantığı
├── style.css               # Stil dosyası
├── questions.js            # Sorular (kolayca düzenlenebilir)
├── SORULAR-NASIL-EKLENIR.txt  # Kullanıcı kılavuzu
├── images/                 # Görseller
└── sounds/                 # Ses dosyaları
    ├── girisSesi.mp3
    ├── soruBaslangicSesi.mp3
    ├── dogruCevapSesi.mp3
    ├── yanlisCevapSesi.mp3
    └── sonSorudakiDogruCevapSesi.mp3
```

## 🛠️ Teknolojiler

- HTML5
- CSS3 (Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- HTML5 Audio API
- LocalStorage

## 🎯 Oyun Özellikleri

- ✅ 33 örnek soru ile başlayın (istediğiniz konuda sorular ekleyebilirsiniz!)
- ✅ Rastgele soru sıralaması
- ✅ Zamanlayıcı sistemi
- ✅ Skor kayıt sistemi
- ✅ Top 10 liderlik tablosu
- ✅ Profesyonel ses efektleri
- ✅ Yumuşak animasyonlu geçişler
- ✅ **Her türlü konu için kullanılabilir** (Tarih, Matematik, Genel Kültür, vb.)

## 📱 Tarayıcı Desteği

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobil tarayıcılar

## 🤝 Katkıda Bulunma

1. Projeyi fork'layın
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Sorularınız için Issue açabilirsiniz!

---

⭐ Beğendiyseniz yıldız atmayı unutmayın!

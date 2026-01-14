// SORULAR - Bu dosyayı düzenleyerek yeni sorular ekleyebilirsiniz
// Detaylı açıklama için "SORULAR-NASIL-EKLENIR.txt" dosyasına bakın

// ============================================
// SORU SAYISI AYARI
// ============================================
// Oyunda kaç soru sorulacağını buradan ayarlayabilirsiniz:
// - Normal değer: 10, 15, 20 gibi bir sayı girin
// - TÜM soruları sormak için: 0 veya -1 yazın
const SORU_SAYISI = 10;
// ============================================

const Questions = [
    {
        soru: "Hücre zarının temel işlevi nedir?",
        cevaplar: ["Hücreyi desteklemek", "Hücre içine giren ve çıkan maddeleri kontrol etmek", "Hücrenin hareket teşvikini sağlamak", "Protein sentezlemek"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangileri bir sürüngen değildir?",
        cevaplar: ["Yılan", "Timsah", "Kurbağa", "Kertenkele"],
        doğru: "C"
    },
    {
        soru: "Aşağıdakilerden hangileri tek hücreliddir?",
        cevaplar: ["Solucan", "Amip", "Sinek", "Karayosunu"],
        doğru: "B"
    },
    {
        soru: "Bir hücrede hangisinin olması onun bitki hücresi olduğunu gösterir?",
        cevaplar: ["Hücre çeperi", "Loroplast", "Nişasta", "Sentrozom"],
        doğru: "C"
    },
    {
        soru: "Böceklerin kaç bacağı vardır?",
        cevaplar: ["4", "6", "8", "40"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangisi fotosentez yapmaz?",
        cevaplar: ["Alg", "Çam ağacı", "Şapkalı mantar", "Gül bitkisi"],
        doğru: "C"
    },
    {
        soru: "Hangisi omurgalı bir canlıdır?",
        cevaplar: ["Deniz anası", "Midye", "Kaplumbağa", "Yengeç"],
        doğru: "C"
    },
    {
        soru: "Gözün görme ile ilgili kısmı hangisidir?",
        cevaplar: ["Kornea", "Retina", "Tulumcuk", "Kesecik"],
        doğru: "B"
    },
    {
        soru: "Aşağıdaki canlılardan hangisinde kemikten bir iskelet yoktur?",
        cevaplar: ["Köpek balığı", "Hamsi", "Serçe", "Balina"],
        doğru: "A"
    },
    {
        soru: "Hangisi kalbe kirli kan getiren damardır?",
        cevaplar: ["Üst ana toplar damar", "Aort", "Akciğer toplar damarı", "Akciğer atar damarı"],
        doğru: "A"
    },
    {
        soru: "Kanın sıvı kısmına ne isim verilir?",
        cevaplar: ["Alyuvar", "Plazma", "Akyuvar", "Trombosit"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangisi memeliler sınıfından bir canlı değildir?",
        cevaplar: ["Yunus", "Balina", "Yarasa", "Penguen"],
        doğru: "D"
    },
    {
        soru: "Hangisi sadece hayvan hücre zarında bulunan zara dayanıklılık veren lipittir?",
        cevaplar: ["Kolesterol", "Glikoz", "Aminoasit", "Enzim"],
        doğru: "A"
    },
    {
        soru: "DNA'nın ikili sarmal yapısının açıklayan bilim insanları hangileridir?",
        cevaplar: ["Ian Wilmut", "Watson ve Crick", "Robert Hooke ve Avery", "Charles Darwin ve Lamark"],
        doğru: "B"
    },
    {
        soru: "Bir DNA sarmalında 2000 Adenin nükleotidi varsa kaç Timin nükleotidi bulunur?",
        cevaplar: ["1000", "3000", "2000", "4000"],
        doğru: "C"
    },
    {
        soru: "Mikroorganizmalara karşı koruyucu olarak üretilen proteinlere ne denir?",
        cevaplar: ["Bağışıklık", "Antijen", "Antikor", "Lenfosit"],
        doğru: "C"
    },
    {
        soru: "Bir hayvansal hücrede yağların sindiriminin yapıldığı organel hangisidir?",
        cevaplar: ["Lizozom", "Ribozom", "Golgi", "Endoplazmik retikulum"],
        doğru: "A"
    },
    {
        soru: "2N=46 kromozonlu bir insanın karaciğer hücresindeki kromozon sayısı kaçtır?",
        cevaplar: ["23", "46", "92", "184"],
        doğru: "B"
    },
    {
        soru: "Aşağıdaki enzimlerden hangisi incebağırsaktan salgılanmaz?",
        cevaplar: ["Enteropeptidaz", "Lipaz", "Maltaz", "Dekstrinaz"],
        doğru: "B"
    },
    {
        soru: "Belirli bir bölgede yaşayan tek bir türe ait canlı topluluğu anlamına gelen kelime hangisidir?",
        cevaplar: ["Komünite", "Habitat", "Niş", "Popülasyon"],
        doğru: "D"
    },
    {
        soru: "Fotosentez işlemi sırasında hangi gaz ortamında salınır?",
        cevaplar: ["Karbon dioksit", "Azot", "Oksijen", "Hidrojen"],
        doğru: "C"
    },
    {
        soru: "DNA'nın ana işlevi nedir?",
        cevaplar: ["Hücre bölünmesini sağlamak", "Genetik bilgiyi depolamak", "Protein üretimi", "Savunma"],
        doğru: "B"
    },
    {
        soru: "Aşağıdakilerden hangisinin mitoz bölünmesi sonucu oluşur?",
        cevaplar: ["Gamet hücreleri", "Kök hücreleri", "Vücut hücreleri", "Sperm ve yumurta hücreleri"],
        doğru: "C"
    },
    {
        soru: "Hangi organ sistemi vücutta oksijen taşınmasını sağlar?",
        cevaplar: ["Sindirim sistemi", "Dolaşım sistemi", "Solunum sistemi", "Boşaltım sistemi"],
        doğru: "C"
    },
    {
        soru: "Aşağıdakilerden hangisi bir bakteri tarafından yapılamaz?",
        cevaplar: ["Yoğurdun mayalanması", "Hamurun mayalanması", "Kemosentezle besin üretilmesi", "Fotosentezle besin üretilmesi"],
        doğru: "B"
    },
    {
        soru: "Midenin etrafını hangisi örter?",
        cevaplar: ["Periton", "Plevra", "Pseudepod", "Perikard"],
        doğru: "A"
    },
    {
        soru: "Bir insanda bacağın diz altında, arka kısmında bulunan kemiğin adı nedir?",
        cevaplar: ["Baldır", "Pazı", "Köprücük", "Tırnakçık"],
        doğru: "A"
    },
    {
        soru: "Bir insan vücudunda amonyağın üreye çevrildiği organ hangisidir?",
        cevaplar: ["Kalp", "Bağırsak", "Böbrek", "Karaciğer"],
        doğru: "D"
    },
    {
        soru: "Fotosentezde hangisi üretilemez?",
        cevaplar: ["Karbondioksit", "Glikoz", "Oksijen", "Vitamin"],
        doğru: "A"
    },
    {
        soru: "Enzimlerin üretildiği organel hangisidir?",
        cevaplar: ["Golgi", "Ribozom", "Lizozom", "Koful"],
        doğru: "B"
    },
    {
        soru: "Aşağıdaki canlılardan hangisi konjugasyon yapar ve bu sırada canlı sayısı artar?",
        cevaplar: ["Bakteri", "Paramecium", "Amip", "Sığırcık kuşu"],
        doğru: "B"
    },
    {
        soru: "Aşağıdaki canlılardan hangisinin vücudu tüylerle örtülüdür?",
        cevaplar: ["Kuzu", "Güvercin", "Maymun", "Köpek"],
        doğru: "B"
    },
    {
        soru: "Fosil bilimine ne denir?",
        cevaplar: ["Paleontoloji", "Fizyoloji", "Zooloji", "Taksonomi"],
        doğru: "A"
    }
];

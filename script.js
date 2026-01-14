// Sorular questions.js dosyasından yüklenecek (global değişken olarak)
// Questions değişkeni questions.js dosyasında tanımlı

let currentQuestionIndex = -1;
let countdown;
let timeLeft = 30;
let isExtended = false;
let playerScore = 0;
let startTime;
let endTime;

// Ses elementlerini tanımla
const sounds = {
    giris: new Audio('sounds/girisSesi.mp3'),
    soruBaslangic: new Audio('sounds/soruBaslangicSesi.mp3'),
    dogruCevap: new Audio('sounds/dogruCevapSesi.mp3'),
    yanlisCevap: new Audio('sounds/yanlisCevapSesi.mp3'),
    sonSoruDogru: new Audio('sounds/sonSorudakiDogruCevapSesi.mp3')
};

// Ses dosyaları yüklenme durumunu kontrol et
console.log('🎵 SES SİSTEMİ BAŞLATILIYOR...');

// Global Ana Sayfaya Dön fonksiyonu
window.goToHomePage = function() {
    console.log('🏠 🎉 GLOBAL FONKSIYON ÇALIŞTI - Ana sayfaya dönülüyor!');
    
    // İlk oyun flag'ini sıfırla
    isFirstGameStart = true;
    
    // Tüm sesleri durdur
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    
    // Tüm container'ları gizle
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('info-column').style.display = 'none';
    
    // Ana menüyü göster
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('mainMenu').innerHTML = '<h1>Hoş Geldiniz!</h1><button class="menuButton" id="start-game">Oyuna Başla</button>';
    
    // Skor tablosunu göster ve skorları yükle
    const scoreBoard = document.getElementById('score-board');
    scoreBoard.style.display = 'block';
    scoreBoard.classList.remove('hidden');
    scoreBoard.classList.add('visible');
    
    console.log('📊 Skor tablosu gösteriliyor...');
    console.log('Skor tablosu display:', window.getComputedStyle(scoreBoard).display);
    
    // Skorları yeniden yükle
    loadAndDisplayScores();
    console.log('✅ Skorlar yeniden yüklendi');
    
    // Start game butonunu bağla
    const newStartButton = document.getElementById('start-game');
    if (newStartButton) {
        newStartButton.addEventListener('click', startGame);
        console.log('✅ Start-game butonu yeniden bağlandı');
    }
};

console.log('✅ Global goToHomePage fonksiyonu tanımlandı');
Object.keys(sounds).forEach(soundName => {
    const sound = sounds[soundName];
    sound.addEventListener('loadeddata', () => {
        console.log(`✅ ${soundName} yüklendi`);
    });
    sound.addEventListener('error', (e) => {
        console.error(`❌ ${soundName} yüklenemedi:`, e);
    });
});
console.log('Tüm ses dosyaları yüklenmeye çalışılıyor...');
console.log('Ses dosyaları:', Object.keys(sounds));

// Restart-game butonu için
document.getElementById('restart-game').addEventListener('click', startGame);

// İlk tıklama kontrolü için global değişken
let isFirstGameStart = true;

function startGame() {
    // Sorular yüklenmediyse uyar
    if (!Questions || Questions.length === 0) {
        alert('Sorular yüklenemedi! questions.js dosyasının var olduğundan emin olun.');
        return;
    }
    
    // İlk oyun başlangıcında giriş sesini çal ve bekle
    if (isFirstGameStart) {
        isFirstGameStart = false;
        console.log('🔊 Ana menü - Giriş sesi çalınıyor...');
        
        sounds.giris.play()
            .then(() => console.log('✅ Giriş sesi çalıyor'))
            .catch(e => console.log('❌ Giriş sesi hatası:', e));
        
        // Giriş sesi bittikten sonra oyunu başlat
        setTimeout(() => {
            console.log('🎮 Oyun başlatılıyor...');
            startGameActual();
        }, 2000);
        return;
    }
    
    // Normal oyun başlatma
    startGameActual();
}

function startGameActual() {
    
    currentQuestionIndex = -1;
    playerScore = 0;
    // SORU_SAYISI değişkenini kontrol et: 0 veya negatifse tüm soruları kullan
    const soruSayisi = (SORU_SAYISI <= 0) ? Questions.length : SORU_SAYISI;
    selectedQuestions = getRandomQuestions(Questions, soruSayisi);
    console.log(`Oyun başlıyor: ${soruSayisi} soru seçildi (Toplam: ${Questions.length} soru)`);
    document.getElementById('player-score').textContent = '0';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('info-column').style.display = 'block';
    document.getElementById('score-board').style.display = 'none'; // Skor tablosunu gizle
    document.getElementById('mainMenu').style.display = 'block';
    
    showNextQuestion();
    hideElement(document.getElementById('score-board'));
    resetTime();
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResult(true, playerScore);
        return;
    }
    const question = selectedQuestions[currentQuestionIndex];
    
    console.log('=== SORU GÖSTERİLİYOR ===');
    console.log('Soru No:', currentQuestionIndex + 1);
    
    // Tüm sesleri durdur (önceki sesin bitmesini bekleme)
    console.log('Tüm sesler durduruluyor...');
    Object.keys(sounds).forEach(soundName => {
        const sound = sounds[soundName];
        if (!sound.paused) {
            console.log(`  ✖️ ${soundName} sesi durduruluyor (playing: ${!sound.paused})`);
        }
        sound.pause();
        sound.currentTime = 0;
    });
    
    // HER SORUDA soru başlangıç sesi çal (giriş sesi sadece ana menüde)
    console.log(`🔊 SORU ${currentQuestionIndex + 1} - Soru başlangıç sesi çalınıyor...`);
    sounds.soruBaslangic.play()
        .then(() => console.log('✅ Soru başlangıç sesi başarıyla çalıyor'))
        .catch(e => console.error('❌ Soru başlangıç sesi çalma hatası:', e));
    
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.innerHTML = `<h2>${question.soru}</h2>`;
    question.cevaplar.forEach((answer, i) => {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(65 + i) + ") " + answer;
        button.className = 'answerButton';
        button.onclick = () => checkAnswer(i, question.doğru);
        mainMenu.appendChild(button);
    });
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    mainMenu.appendChild(feedback);
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.id = 'next-question';
    nextQuestionButton.className = 'menuButton';
    nextQuestionButton.textContent = 'Sonraki Soru';
    nextQuestionButton.style.display = 'none';
    nextQuestionButton.onclick = () => showNextQuestion();
    mainMenu.appendChild(nextQuestionButton);
    resetTime();
}

function checkAnswer(selected, correct) {
    clearInterval(countdown);
    
    console.log('=== CEVAP SEÇİLDİ ===');
    console.log('Seçilen:', String.fromCharCode(65 + selected));
    console.log('Doğru:', correct);
    
    // Soru başlangıç ve giriş seslerini durdur
    console.log('⏸️ Soru sesleri durduruluyor...');
    if (!sounds.soruBaslangic.paused) {
        console.log('  - soruBaslangic sesi durduruldu');
    }
    sounds.soruBaslangic.pause();
    sounds.soruBaslangic.currentTime = 0;
    
    if (!sounds.giris.paused) {
        console.log('  - giris sesi durduruldu');
    }
    sounds.giris.pause();
    sounds.giris.currentTime = 0;
    
    const answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach((button, index) => {
        button.disabled = true; // Tüm butonları devre dışı bırak
        const isCorrect = String.fromCharCode(65 + index) === correct;
        
        if (isCorrect) {
            button.classList.add('correct'); // Doğru cevabı yeşil yap
        }
        
        if (index === selected && !isCorrect) {
            button.classList.add('wrong'); // Yanlış seçilen cevabı kırmızı yap
        }
    });

    const feedback = document.getElementById('feedback');
    if (String.fromCharCode(65 + selected) === correct) {
        console.log('✅ DOĞRU CEVAP!');
        feedback.textContent = "Doğru!";
        feedback.style.color = "green";
        playerScore += 10;
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('next-question').style.display = 'block';
        
        // Son soru mu kontrol et
        if (currentQuestionIndex === selectedQuestions.length - 1) {
            console.log('🎉 SON SORU - Özel kutlama sesi çalınıyor...');
            // Son sorunun doğru cevabı için özel ses
            sounds.sonSoruDogru.play()
                .then(() => console.log('✅ Son soru doğru sesi çalıyor'))
                .catch(e => console.error('❌ Son soru sesi hatası:', e));
        } else {
            console.log('🔊 Normal doğru cevap sesi çalınıyor...');
            // Normal doğru cevap sesi
            sounds.dogruCevap.play()
                .then(() => console.log('✅ Doğru cevap sesi çalıyor'))
                .catch(e => console.error('❌ Doğru cevap sesi hatası:', e));
        }
    } else {
        console.log('❌ YANLIŞ CEVAP!');
        feedback.textContent = "Yanlış!";
        feedback.style.color = "red";
        
        console.log('🔊 Yanlış cevap sesi çalınıyor...');
        // Yanlış cevap sesi
        sounds.yanlisCevap.play()
            .then(() => console.log('✅ Yanlış cevap sesi çalıyor'))
            .catch(e => console.error('❌ Yanlış cevap sesi hatası:', e));
        
        setTimeout(() => showResult(false, playerScore), 2000);
    }
}


function resetTime() {
    clearInterval(countdown);
    timeLeft = 30;
    isExtended = false;
    document.getElementById('ask-friend').disabled = false;
    startCountdown();
}

function startCountdown() {
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateCountdown();
        } else {
            clearInterval(countdown);
            showResult(false, playerScore);
        }
    }, 1000);
}

function updateCountdown() {
    const countdownText = document.getElementById('countdown-text');
    const countdownCircle = document.getElementById('countdown-circle').querySelector('circle');
    countdownText.textContent = timeLeft > 0 ? timeLeft : '';
    const totalDuration = isExtended ? 90 : 30;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (timeLeft / totalDuration) * circumference;
    countdownCircle.style.strokeDashoffset = offset;
}

function extendTime() {
    if (!isExtended) {
        timeLeft += 30;
        isExtended = true;
        document.getElementById('ask-friend').disabled = true;
        updateCountdown();
    }
}

// Oyun bittiğinde veya bir skor kaydedildiğinde skorları güncelleyen fonksiyon
function showResult(isWin, score) {
    // Önce tüm sesleri durdur
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    
    setTimeout(function() {
        const resultContainer = document.getElementById('result-container');
        const resultMessage = document.getElementById('result-message');
        const finalScore = document.getElementById('final-score');
        
        // Ana menü ve bilgi sütununu gizle
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('info-column').style.display = 'none';
        
        showElement(document.getElementById('score-board'));
        showSaveScoreOption(score); // Bu fonksiyonun çağrısını ekleyin

        resultMessage.textContent = isWin ? "Tebrikler, Kazandınız!" : "Üzgünüz, Kaybettiniz!";
        finalScore.textContent = score;
        resultContainer.style.display = 'block';
        
        console.log('🎯 Sonuç ekranı gösteriliyor...');

        // Sadece yeni bir skor olduğunda skor kaydetme seçeneğini göster
        if (isWin) {
            showSaveScoreOption(score);
        }

        document.getElementById('restart-game').onclick = function() {
            console.log('🔄 Baştan başla butonuna tıklandı');
            startGame();
        };

        const goHomeButton = document.getElementById('go-home');
        console.log('🔍 go-home butonu kontrol ediliyor...');
        console.log('Buton:', goHomeButton);
        
        if (goHomeButton) {
            console.log('✅ Buton bulundu, multiple event listener ekleniyor...');
            
            // Her türlü event'i dene
            goHomeButton.onclick = function(e) {
                console.log('🏠 ONCLICK ÇALIŞTI!', e);
                window.goToHomePage();
            };
            
            goHomeButton.addEventListener('click', function(e) {
                console.log('🏠 ADDEVENTLISTENER CLICK ÇALIŞTI!', e);
                window.goToHomePage();
            }, true);
            
            goHomeButton.addEventListener('mousedown', function(e) {
                console.log('🏠 MOUSEDOWN event!', e);
            });
            
            goHomeButton.addEventListener('mouseup', function(e) {
                console.log('🏠 MOUSEUP event!', e);
            });
            
            console.log('✅ Tüm event listener\'lar eklendi');
            console.log('Buton display:', window.getComputedStyle(goHomeButton).display);
            console.log('Buton visibility:', window.getComputedStyle(goHomeButton).visibility);
            console.log('Buton pointer-events:', window.getComputedStyle(goHomeButton).pointerEvents);
        } else {
            console.error('❌ go-home butonu bulunamadı!');
        }
    }, 3000);
}


function loadAndDisplayScores() {
    const highScoresList = document.getElementById('high-score-list');
    // localStorage'dan skorları çek, eğer yoksa boş bir dizi ata
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Skor listesini temizle
    highScoresList.innerHTML = '';

    // Her bir skor için bir <li> elementi oluştur ve bu elemente skor bilgisini ekle
    scores.forEach(score => {
        const scoreElement = document.createElement('li');
        // Burada `score.name` ve `score.score` kullanarak metni düzgün bir şekilde oluşturuyoruz
        scoreElement.textContent = `${score.name}: ${score.score}`;
        highScoresList.appendChild(scoreElement);
    });
}


// Oyun bittiğinde veya bir skor kaydedildiğinde skorları güncelleyen fonksiyon
function saveScore(newScore) {
    // localStorage'dan skorları çek, eğer yoksa boş bir dizi ata
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Oyuncunun adını kontrol et ve skoru güncelle veya ekle
    const existingIndex = scores.findIndex(score => score.name === newScore.name);
    if (existingIndex !== -1) {
        // Eğer mevcut skor yeni skordan düşükse, güncelle
        if (scores[existingIndex].score < newScore.score) {
            scores[existingIndex].score = newScore.score;
        }
    } else {
        // Yeni skoru listeye ekle
        scores.push(newScore);
    }

    // Skorları büyükten küçüğe doğru sırala
    scores.sort((a, b) => b.score - a.score);

    // Eğer skor listesi 10'dan fazla elemana sahipse, en düşük skoru (son elemanı) sil
    if (scores.length > 10) {
        scores.pop(); // En düşük skoru (son elemanı) sil
    }

    // Güncellenmiş skor listesini localStorage'a kaydet
    localStorage.setItem('highScores', JSON.stringify(scores));

    // Skorları yeniden yükle ve göster
    loadAndDisplayScores();
}




// Sayfa yüklendiğinde skorları yükle ve göster
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayScores();
    
    // Start-game butonunu bağla
    console.log('🎉 Sayfa yüklendi - Oyuna Başla butonu hazır');
    document.getElementById('start-game').addEventListener('click', startGame);
});

// "Ana Sayfaya Dön" butonu işlevselliği artık showResult içinde tanımlı
document.getElementById('save-score').addEventListener('click', function() {
    const playerName = document.getElementById('player-name').value.trim();
    const score = parseInt(document.getElementById('final-score').textContent);

    if (!playerName) {
        alert("Lütfen adınızı girin.");
        return;
    }

    // Mevcut skorları yükle
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Aynı isimle olan skoru bul
    const existingScoreIndex = scores.findIndex(s => s.name === playerName);

    if (existingScoreIndex >= 0) {
        // Eğer yeni skor daha yüksekse güncelle
        if (scores[existingScoreIndex].score < score) {
            scores[existingScoreIndex].score = score;
        }
    } else {
        // Yeni skoru ekle
        scores.push({ name: playerName, score: score });
    }

    // Skorları büyükten küçüğe sırala
    scores.sort((a, b) => b.score - a.score);

    // En iyi 10 skoru sakla
    const topScores = scores.slice(0, 10);

    // Skorları localStorage'a kaydet
    localStorage.setItem('highScores', JSON.stringify(topScores));

    // Skorları yeniden yükle ve göster
    loadAndDisplayScores();

    // İsim ve skor kaydedildikten sonra input alanını temizle
    document.getElementById('player-name').value = '';
});

function showSaveScoreOption(playerScore) {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    let isScoreHighEnough = false;

    if (scores.length < 10) {
        isScoreHighEnough = true;
    } else {
        // En düşük skoru bulmak için skorları küçükten büyüğe sıralayın
        scores.sort((a, b) => a.score - b.score);
        const lowestHighScore = scores[0].score; // En düşük skor, sıralı listede ilk sırada olacaktır.
        if (playerScore > lowestHighScore) {
            isScoreHighEnough = true;
        }
    }

    const saveScoreMessage = document.getElementById('save-score-message');
    const saveScoreContainer = document.getElementById('save-score-container');

    if (isScoreHighEnough) {
        saveScoreMessage.textContent = "Tebrikler! Yüksek skorlar listesine girebilirsiniz.";
        saveScoreContainer.style.display = 'block';
    } else {
        saveScoreMessage.textContent = "Maalesef yüksek skorlar listesine giremediniz.";
        saveScoreContainer.style.display = 'none';
    }
}


function hideElement(element) {
    element.classList.remove('visible');
    element.classList.add('hidden');
}

// Elementi gösterme fonksiyonu
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}
window.onload = function() {
    var scoreBoard = document.getElementById('score-board');
    var scoreBoardHeight = scoreBoard.scrollHeight + 'px';
    scoreBoard.style.height = scoreBoardHeight;
}

let selectedQuestions = []; // Seçilen soruları saklamak için boş bir dizi

function startGame() {
    currentQuestionIndex = -1;
    playerScore = 0;
    document.getElementById('player-score').textContent = '0';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('info-column').style.display = 'block';
    document.getElementById('score-board').style.display = 'none'; // Skor tablosunu gizle
    // SORU_SAYISI değişkenini kontrol et: 0 veya negatifse tüm soruları kullan
    const soruSayisi = (SORU_SAYISI <= 0) ? Questions.length : SORU_SAYISI;
    selectedQuestions = getRandomQuestions(Questions, soruSayisi);
    console.log(`Oyun başlıyor: ${soruSayisi} soru seçildi (Toplam: ${Questions.length} soru)`);
    showNextQuestion();
    hideElement(document.getElementById('score-board'));
    resetTime();
}

// ESKİ showNextQuestion fonksiyonu silindi - yukarıdaki log'lu versiyon kullanılıyor

function getRandomQuestions(sourceArray, neededElements) {
    const shuffled = [...sourceArray].sort(() => 0.5 - Math.random()); // Diziyi karıştır
    return shuffled.slice(0, neededElements); // İlk 'neededElements' sayıda elemanı al
}
// 10. soru şıklarının seçilmesini dinle
var options10 = document.querySelectorAll('#question-10 input[type="radio"]');
options10.forEach(function(option) {
    option.addEventListener('change', function() {
        if (this.checked) {
            // Doğru seçenek işaretlendiğinde
            if (this.value === "true") {
                // Sonraki soru butonuna otomatik tıkla
                document.querySelector('#next-question-btn').click();
            }
        }
    });
});
// Skor kaydetme ve isim yazma işlevlerini sola taşı
function saveScore(newScore) {
    // Fonksiyon içeriği burada...
}

function showSaveScoreOption(score) {
    // Fonksiyon içeriği burada...
}
document.addEventListener('DOMContentLoaded', function() {
    var startGameButton = document.getElementById('start-game');
    if (startGameButton) {
        startGameButton.addEventListener('click', startGame);
    } else {
        console.log('Start game button not found');
    }
});
function showResult(isWin, playerScore) {
    // Oyun sonucunu gösteren diğer işlemler...
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const finalScore = document.getElementById('final-score');

    // Sonuç mesajını ve skoru ayarla
    resultMessage.textContent = isWin ? "Tebrikler, Kazandınız!" : "Üzgünüz, Kaybettiniz!";
    finalScore.textContent = playerScore;

    // Sonuç ekranını göster
    resultContainer.style.display = 'block';

    // Skor kaydetme seçeneğini gösterme kontrolü
    showSaveScoreOption(playerScore);
}
// Ses sistemi artık başlangıçta yükleniyor ve gerektiğinde çalıştırılıyor

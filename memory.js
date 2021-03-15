//chytamy na wejscie wszystkie rekordy a po wyborze poziomu dajemy to do bestScore
var bs_latwy = $("#bs_latwy").text();
var bs_sredni = $("#bs_sredni").text();
var bs_trudny = $("#bs_trudny").text();
var bestScore;
//do jakiego folderu z kartami nalezy zajrzec, bez sensu wiem
var img;
var liczbaKart;
var lvl;

//wybor poziomu trudnosci
$("#wybor #p1").click(function () {
    bestScore = bs_latwy;
    lvl = "dwunóg";
    level = "latwy" /*do php*/
    liczbaKart = 16;
    img = 'img';
    $('#wybor').html("");
    buduj();
    $('.board').css('visibility', 'visible');
});

$("#wybor #p2").click(function () {
    bestScore = bs_sredni;
    lvl = "magister";
    level = "sredni" /*do php*/
    liczbaKart = 24;
    img = 'img2';
    $('#wybor').html("");
    buduj();
    $('.board').css('width', '900px')
    $('.board').css('visibility', 'visible');

});

$("#wybor #p3").click(function () {
    bestScore = bs_trudny;
    lvl = "gieniusz";
    level = "trudny" /*do php*/
    liczbaKart = 30;
    img = 'img3';
    $('#wybor').html("");
    buduj();
    $('.board').css('width', '900px')
    $('h1').css('margin-bottom', '0')
    $('.board').css('visibility', 'visible');
});

var divy = "";

function buduj() {
    zostalo = liczbaKart / 2;

    for (i = 1; i <= liczbaKart; i++) {
        divy = divy + '<div class="card" id="k' + i + '"></div>';
    }

    divy = divy + '<div class="score">Tura: 0</div>'

    $('.board').html(divy);

    if (liczbaKart == 16) { cardss = ["k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png", "k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png"]; }

    if (liczbaKart == 24) { cardss = ["k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png", "k9.png", "k10.png", "k11.png", "k12.png", "k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png", "k9.png", "k10.png", "k11.png", "k12.png"]; }

    if (liczbaKart == 30) { cardss = ["k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png", "k9.png", "k10.png", "k11.png", "k12.png", "k13.png", "k14.png", "k15.png", "k1.png", "k2.png", "k3.png", "k4.png", "k5.png", "k6.png", "k7.png", "k8.png", "k9.png", "k10.png", "k11.png", "k12.png", "k13.png", "k14.png", "k15.png"]; }
    losuj();

    //dajemy restart do tytulu
    $('#rest').click(function () {
        window.location.reload()
    });
}


//karty po kolei
var cardss = [];

//karty polosowane(zaraz beda)
var cards = [];

//losowanie
function losuj() {
    var ileJeszcze = liczbaKart;

    for (i = 0; i <= liczbaKart - 1; i++) {
        var los = Math.floor(Math.random() * ileJeszcze);
        cards.push(cardss[los]);
        cardss.splice(los, 1,);
        ileJeszcze--;
    }
    for (i = 1; i <= liczbaKart; i++) {
        document.getElementById('k' + i).setAttribute("onclick", "odslon(" + i + ")");
        //document.getElementById('k'+i).addEventListener("click", function() {proba(i);});
    }
}


var zostalo;
var oneVisible = false;
var turn = 0;
var widoczna;
var lock = false;
var smiechWaldka = new Audio('sounds/smiechWaldka.mp3');

function odslon(nr) {
    if (($('#k' + nr).css('opacity')) != 0 && lock == false & widoczna != nr) {
        var obraz = "url(" + img + "/" + cards[nr - 1] + ")";
        $('#k' + nr).css('background-image', obraz);
        $('#k' + nr).addClass('cardA');

        //blokujemy mozliwosc odkrycia nastepnej karty
        lock = true;

        //pierwsza karta
        if (oneVisible == false) {
            oneVisible = true;
            widoczna = nr;
            lock = false;
        }

        //druga karta
        else {
            //para
            if (cards[widoczna - 1] == cards[nr - 1]) {
                if (cards[nr - 1] == "k5.png" || cards[widoczna - 1] == "k5.png") smiechWaldka.play();
                setTimeout(function () { schowaj(widoczna, nr) }, 700);
            }
            //pudło
            else {
                setTimeout(function () { odwroc(widoczna, nr) }, 1200);
            }
            turn++;
            $('.score').html("Tura: " + turn);
            oneVisible = false;
        }
    }
}

function odwroc(nr1, nr2) {
    $('#k' + nr1).css('background-image', 'url(img/kk2.jpg)');
    $('#k' + nr1).removeClass('cardA');

    $('#k' + nr2).css('background-image', 'url(img/kk2.jpg)');
    $('#k' + nr2).removeClass('cardA');
    lock = false;
    widoczna = null;
}

function schowaj(nr1, nr2) {

    $("#k" + nr1).css("opacity", "0");
    $("#k" + nr2).css("opacity", "0");
    lock = false;

    zostalo--;


    //Game Over
    if (zostalo == 0) {
        var tortory;

        if (turn == 22 || turn == 23 || turn == 24 || turn == 32 || turn == 33 || turn == 34 || turn == 42 || turn == 43 || turn == 44 || turn == 52 | turn == 53 || turn == 54 || turn == 62 || turn == 63 || turn == 64 || turn == 72 || turn == 73 || turn == 74 || turn == 82 || turn == 83) tortory = "tury";
        else tortory = "tur";

        $('h1').css('margin-bottom', 'auto');

        //Czy to nowy rekord?
        if (turn < bestScore) {
            $('header').html('<h1>Pamięciówka</h1>');
            $('.board').html('<h2>Ukończyłeś poziom ' + lvl + ' w ' + turn + " " + tortory + '</h2> <h2>NOWY REKORD!!!</h2> <form action ="zapisz_wynik.php" method="post"> <input type="text" name="score" value="' + turn + '" style="visibility: hidden"> <br/> <input type="text" name="level" value="' + level + '" style="visibility: hidden"> <br/><input type="submit" value="Jeszcze raz?" id="peh"></form>');
        } else {
            $('.board').html('<h2>Ukończyłeś poziom ' + lvl + ' w ' + turn + " " + tortory + '</h2> </br> <h3>Najlepszy wynik: ' + bestScore + '</h3> <input type="submit" value="Jeszcze raz?" onClick="window.location.reload()" id="peh">');
        }
    }
}

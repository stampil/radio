$(document).ready(function () {
    player_principal.changeSrc(mp3s[inc_music++%mp3s.length]);
    player_secondaire.changeSrc(mp3s[inc_music++%mp3s.length]);
    player_principal.play(random_duration);
});
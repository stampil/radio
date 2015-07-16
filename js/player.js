function Player(id){
    this.p = document.getElementById(id);
    this.timeControl = null;

 
    
    this.getLabelMp3 = function(){
        var tab = this.p.src.split('/');
        return unescape(tab[tab.length-1]);
    };
    
    this.changeSrc = function(src){
        this.p.src = src;
        this.p.load();
        console.log('changeSrc',id,src);
        
    };
    
    this.play = function(time){
        console.log('play '+this.p.src, time);
        this.p.currentTime=time || 0;
        this.p.play();
        this.timeControl = setInterval(this.timeInterval,300);
    };
    
    this.timeInterval = function(){
        var percent =  parseInt(Math.floor(this.p.currentTime/this.p.duration*100));
        $('title').text( percent+'% '+this.getLabelMp3());

        switch(percent){
            case 100:
            case 0:
                this.p.volume=0;
                break;
            case 99:
                this.p.volume=0.2;
                this.next();
                break;
            case 1:
                this.p.volume=0.2;
                break;
            case 98:
            case 2:
                this.p.volume=0.5;
                break;
            default:
                this.p.volume = 1;
        }
        if(this.p.currentTime == this.p.duration){
            //switch
        }
    }.bind(this);
    
    this.stop = function(){
        this.p.pause();
        clearInterval(this.timeControl);
    };
    
    this.next = function(){
        player_secondaire.play();
        setTimeout(function(){
            var time_ecoule = player_secondaire.getCurrentTime();
            player_secondaire.stop();
            player_principal.changeSrc(player_secondaire.getSrc());
            player_principal.play(time_ecoule);
            player_secondaire.changeSrc('mp3/'+mp3s[inc_music++%mp3s.length]+'.mp3');
        }.bind(this),3000);
        
    };
    
    this.getCurrentTime = function (){
        return this.p.currentTime;
    };
    
    this.getSrc = function(){
        return this.p.src;
    };
    
}

var player_principal = new Player('audio1');
var player_secondaire = new Player('audio2');
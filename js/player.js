function Player(id){
    this.p = document.getElementById(id);
    this.timeControl = null;
    this.stop_demand = false;
    this.play_demand = false;
    this.flag_next = false;


 
    
    this.getLabelMp3 = function(){
        var tab = this.p.src.split('/');
        return unescape(tab[tab.length-1]);
    };
    
    this.changeSrc = function(src){
        this.p.src = src;
        this.p.load();
        console.log('changeSrc',src, id);
        
    };
    
    this.play = function(time){
        this.killTimeControl();

        this.p.volume = 0;
        this.play_demand = true;
        
        this.p.play();
        
        if(!time) time = 0;

        setTimeout(function(){
            this.p.currentTime = time;
        }.bind(this),200);

        this.flag_next = false;
        this.timeControl = setInterval(this.timeInterval,300);
    };
    
    this.timeInterval = function(){

        var percent =  parseInt(Math.floor(this.p.currentTime/this.p.duration*100));
        if(!isNaN(percent)){
            $('title').text( percent+'% '+' '+this.p.volume+ ' '+ id+' ' +this.getLabelMp3());
        }

        if(this.stop_demand){
            this.p.volume = Math.max(0,(this.p.volume*10 -1)/10);
            //console.log('stop demand '+this.getLabelMp3(), this.p.currentTime, this.p.volume, id);
            if(this.p.volume==0){
                this.p.pause();
                this.killTimeControl();               
                this.stop_demand = false;
                console.log('stop ok '+this.getLabelMp3(), tthis.p.currentTime, this.p.volume, id);
                this.changeSrc(mp3s[inc_music++%mp3s.length]);
            }
        }
        
        if(this.play_demand){
             this.p.volume = Math.min(1,(this.p.volume*10 +1)/10);
                //console.log('play demand '+this.getLabelMp3(), this.p.currentTime, this.p.volume, id);
                if(this.p.volume==1){
                    this.play_demand = false;
                    console.log('play ok '+this.getLabelMp3(), this.p.currentTime, this.p.volume, id);
                }
        }
        
        if(percent>=97 && !this.flag_next){
            this.flag_next = true;
            this.next();
        }
    }.bind(this);
    
    this.stop = function(){
        
        this.stop_demand = true;
        
        return this.p.currentTime;
    };
    
    this.killTimeControl = function(){
        if(!this.timeControl) return;
        clearInterval(this.timeControl);
        this.timeControl = null;
    };
    
    this.next = function(){
        console.log('next appelé par', id);
        if(id=="audio1"){
            player_secondaire.play();
            this.stop();
        }
        else{
            player_principal.play();
            this.stop();
        }    
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
new Vue({
    el: '#app',
    data: {
        show: false,
        hitMax: 10,
        specialHitMax: 15,
        userHP: 50,
        monsterHP: 50,
        userBar: {
            width: 50 + '%'
        },
        monsterBar: {
            width: 50 + '%'
        },
        special: 3
    },
    watch: {
        userHP: function() {
            this.userBar.width = this.userHP + '%'
        },
        monsterHP: function() {
            this.monsterBar.width = this.monsterHP + '%'
        }
    },
    methods: {
        random: function(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        startGame: function() {
            this.show = true,
            this.userHP = 100;
            this.monsterHP = 100;
        },
        attack: function() {
            this.userHP -= this.random(this.hitMax); // Monster attack
            this.monsterHP -= this.random(this.hitMax); // User attack
            if (this.special < 3) {
                this.special++;
            }
        },
        specialAttack: function() {
            if (this.special > 0) {
                this.monsterHP -= this.random(this.specialHitMax); // User attack
                this.userHP -= this.random(this.hitMax); // Monster attack
            }
            if (this.special > 0) {
                this.special--;
            } else {
                alert("You are out of 'Special Attacks'!");
                this.userHP -= this.random(this.specialHitMax);
            }
        }
    }
});
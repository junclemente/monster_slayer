new Vue({
    el: '#app',
    data: {
        show: false,
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
            var userHit = this.random(10);
            var monsterHit = this.random(10);
            this.userHP -= userHit;
            this.monsterHP -= monsterHit;
            // this.userBar.width = this.userHP + '%';
            // this.monsterBar.width = this.monsterHP + '%';
        },
        specialAttack: function() {
            var monsterHit = this.random(10);
            if (this.special > 0) {
                var userHit = this.random(15);
            } else {
                var userHit = 0;
            }
            this.userHP -= userHit;
            this.monsterHP = monsterHit;
        }
    }
});
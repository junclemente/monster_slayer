new Vue({
    el: '#app',
    data: {
        show: false,
        hitMax: 10,
        specialHitMax: 15,
        minHeal: 5,
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
            // User attacks
            var attackVal = this.random(this.hitMax);
            this.monsterHP -= this.random(this.hitMax);
            console.log('User attacks with ', attackVal, 'HP!');

            // Monster attacks
            this.userHP -= attackVal;
            console.log('Monster attacks with ', attackVal, 'HP!');
            attackVal = this.random(this.hitMax);
            if (this.special < 3) {
                this.special++;
            }
        },
        specialAttack: function() {
            // User attacks with Special
            var attack = 0;
            if (this.special > 0) {
                this.special--;
            } else {
                alert("You are out of 'Special Attacks'!");
                attack = this.random(this.specialHitMax);
                this.userHP -= attack;
                console.log('Monster attacks with special: ', attack);
            }
            if (this.special > 0) {
                attack = this.random(this.specialHitMax);
                this.monsterHP -= attack;
                console.log('User attacks: ', attack);
                attack = this.random(this.hitMax);
                this.userHP -= attack;
                console.log('Monster attacks: ', attack);
            }
        },
        heal: function() {
            this.userHP += this.random(this.hitMax) + this.minHeal;
            console.log('healed');

            var $$ = this;
            setTimeout(function() {
                $$.userHP -= $$.random($$.specialHitMax);
                console.log('attacked');
            }, 500);
        }
    }
});
new Vue({
    el: '#app',
    data: {
        // Constants
        hitMax: 10, // maximum hit HP
        specialHitMax: 15,  // maximum special hit HP
        specialMax: 3,  // max use of special attack in a row
        minHealHP: 3,  // min heal HP
        healMax: 2,  // max use of heal in a row
        maxHP: 100,  // max HP possible

        //
        show: false,
        userHP: 50,
        monsterHP: 50,
        userBar: {
            width: 50 + '%'
        },
        monsterBar: {
            width: 50 + '%'
        },
        special: 3,
        heal: 2,
        attackList: []
    },
    watch: {
        userHP: function() {
            this.userBar.width = this.userHP + '%'
            if (this.userHP <= 0) {
                alert('You have lost this battle!');
                this.show = false;
            }
        },
        monsterHP: function() {
            this.monsterBar.width = this.monsterHP + '%';
            if (this.monsterHP <=0) {
                alert('Congratulations! You defeated the monster!');
                this.show = false;
            }
        }
    },
    methods: {
        startGame: function() {
            // Initialize Game Start Values
            this.show = true,
            this.userHP = this.maxHP;
            this.monsterHP = this.maxHP;
            this.attackList = [];
            this.special = this.specialMax;
            this.heal = this.healMax;
        },
        random: function(max) {
            // return Math.floor(Math.random() * Math.floor(max)) + 1;
            return Math.floor(Math.random() * max) + 1;
        },
        pushToList: function(val) {
            this.attackList.push(val);
        },
        attack: function() {
            var attack = {};
            attack['user'] = this.random(this.hitMax);
            attack['monster'] = this.random(this.hitMax);

            this.monsterHP -= attack['user'];
            this.userHP -= attack['monster'];

            // Special attack regen
            if (this.special < this.specialMax) {
                this.special++;
            }

            if (this.heal < this.healMax) {
                this.heal++;
            }

            this.pushToList(attack);
        },
        specialAttack: function() {
            var attack = {}
            if (this.special > 0) {
                this.special--;
                attack['user'] = this.random(this.specialHitMax);
                attack['monster'] = this.random(this.hitMax);
            } else {
                attack['user'] = 0;
                attack['monster'] = this.random(this.specialHitMax);
            }

            this.monsterHP -= attack['user'];
            this.userHP -= attack['monster']

            this.pushToList(attack);
        },
        healing: function() {
            var healing = {};
            if (this.heal > 0) {
                this.heal--;
                healing['heal'] =  this.random(this.hitMax) + this.minHealHP;
            } else {
                healing['heal'] = 0;
            }

            healing['monster'] = this.random(this.specialHitMax);

            if ((this.userHP + healing['heal']) >= 100) {
                this.userHP = this.maxHP;
            } else {
                this.userHP += healing['heal'];
            }

            var $$ = this;
            setTimeout(function() {
                $$.userHP -= healing['monster'];
            }, 500);

            this.pushToList(healing);
        }
    }
});
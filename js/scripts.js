new Vue({
    el: '#app',
    data: {
        // Constants
        hitMax: 10,
        specialHitMax: 15,
        specialMax: 3,
        minHealHP: 3,
        healMax: 2,

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
        },
        monsterHP: function() {
            this.monsterBar.width = this.monsterHP + '%'
        }
    },
    methods: {
        startGame: function() {
            // Initialize Game Start Values
            this.show = true,
            this.userHP = 100;
            this.monsterHP = 100;
            this.attackList = [];
            this.special = 3;
            this.heal = 2;
        },
        random: function(max) {
            return Math.floor(Math.random() * Math.floor(max));
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

            this.userHP += healing['heal'];

            var $$ = this;
            setTimeout(function() {
                $$.userHP -= healing['monster'];
            }, 500);

            // this.userHP -= heal['monster']


            this.pushToList(healing);
        }
    }
});
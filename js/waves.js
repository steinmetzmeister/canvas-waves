Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.randomFloat = function(min, max) {
    return Math.random() * (max - min) + min;
}

var Wave = function() {
    this.shuffle();
}
Wave.prototype = {
    shuffle: function() {
        this.color = this.randomRgb();

        this.angle = Math.randomInt(0, 359);
        this.startAngle = Math.randomInt(0, 359);

        this.speed = Math.randomFloat(-0.01, 0.01);
        this.velocity = Math.randomFloat(-0.01, 0.01);
    },

    randomRgb: function() {
        return rgb = 'rgb(' 
            + Math.randomInt(128, 255) + ',' 
            + Math.randomInt(128, 255) + ',' 
            + Math.randomInt(128, 255) + ')';
    },

    map: function(val, low1, high1, low2, high2)
    {
        return low2 + (high2 - low2) * (val - low1) / (high1 - low1);
    },

    display: function() {
        this.angle = this.startAngle;
        this.startAngle += 0.01;

        for (var x = 0; x < canvas.width; x += 2)
        {
            var y = this.map(Math.sin(this.angle), -1, 1, 0, canvas.height - 1);

            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 1, 1);

            this.angle += this.velocity;
        }
    }
}
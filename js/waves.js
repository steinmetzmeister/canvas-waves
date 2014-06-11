Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.randomFloat = function(min, max) {
    return (Math.random() * (max - min)) + min;
}

var Wave = function() {
    this.shuffle();
}
Wave.prototype = {
    shuffle: function() {
        this.color = this.randomRgb(128, 255);

        this.angle = Math.randomInt(0, 359);
        this.startAngle = Math.randomInt(0, 359);
        this.velocity = Math.randomFloat(-0.025, 0.025);

        var height = Math.randomInt(canvas.height * 0.25, canvas.height * 0.75);

        this.waveStart = canvas.height / 2 - height / 2;
        this.waveEnd = canvas.height / 2 + height / 2;
    },

    randomRgb: function(min, max) {
        return rgb = 'rgb(' 
            + Math.randomInt(min, max) + ',' 
            + Math.randomInt(min, max) + ',' 
            + Math.randomInt(min, max) + ')';
    },

    map: function(val, low1, high1, low2, high2)
    {
        return low2 + (high2 - low2) * (val - low1) / (high1 - low1);
    },

    display: function() {
        this.angle = this.startAngle;
        this.startAngle += 0.01;

        for (var x = 0; x < canvas.width; x += 1)
        {
            var y = this.map(Math.sin(this.angle), -1, 1, this.waveStart, this.waveEnd);

            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 1, 1);

            this.angle += this.velocity;
        }
    }
}
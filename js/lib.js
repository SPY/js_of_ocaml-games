var ACTORS = {
    RECT: 1,
    GROUP: 2,
    TEXTURE: 3
};

(function(win) {
function Actor(type) {
    this.type = type;
}

Actor.prototype = {
    render: function() {
        throw new Error('Not implemented');
    }
}

function rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

rect.prototype = new Actor(ACTORS.RECT);

rect.prototype.render = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function group() {
    this.childs = [];
}

group.prototype = new Actor(ACTORS.GROUP);

group.prototype.addChild = function(child) {
    this.childs.push(child);
}

group.prototype.render = function(ctx) {
    this.childs.forEach(function(child) {
        child.render(ctx);
    });
}

function texture(x, y, w, h, url) {
    rect.call(this, x, y, w, h);
    this.url = url;
    this.img = typeof Image != 'undefined' ? new Image() : {};
    this.img.src = url;
    this.img.onload = function() { Render.render() }
}

texture.prototype = new Actor(ACTORS.TEXTURE);

texture.prototype.render = function(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

function createContext() {
    if (typeof window != 'undefined') {
        var canvas = window.document.createElement('canvas');
        canvas.setAttribute('width', 800);
        canvas.setAttribute('height', 600);
        window.document.body.appendChild(canvas);
        return canvas.getContext('2d');
    }
    else {
        return {
            clearRect: console.log.bind(console, 'clear'),
            fillRect: console.log.bind(console, 'fillRect: at (%d, %d) w: %d h: %d'),
            drawImage: console.log.bind(console, 'drawImage: %s at (%d, %d) w: %d h: %d')
        }
    }
}

var Render = {
    currentId: 1,
    actors: {},
    ctx: undefined,
    // public
    getById: function(id) {
        return this.actors[id];
    },
    removeById: function(id) {
        delete this.actors[id];
    },
    addActor: function(actor) {
        var id = this.currentId++;
        this.actors[id] = actor;
        return id;
    },
    render: function() {
        if (this.ctx == null) {
            this.ctx = createContext();
        }
        this.ctx.clearRect(0, 0, 800, 600);
        this.getById(root).render(this.ctx);
    }
};


win.create_rect = function create_rect(x, y, w, h) {
    return Render.addActor(new rect(x, y, w, h));
}

win.create_group = function create_group() {
    return Render.addActor(new group());
}

win.create_texture = function create_texture(x, y, w, h, url) {
    return Render.addActor(new texture(x, y, w, h, url));
}

win.add_to_group = function add_to_group(groupId, actorId) {
    var group = Render.getById(groupId);
    var actor = Render.getById(actorId);
    if (group && actor) {
        group.addChild(actor);
    }
}

win.tick = function tick() {
    Render.render();
}

var root = win.root = win.create_group();

})(typeof window != 'undefined' ? window : global);

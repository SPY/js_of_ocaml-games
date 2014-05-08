var rect1 = new rect(10, 10, 50, 30);
var rect2 = new rect(400, 200, 120, 140);
var rect3 = new rect(350, 100, 85, 65);

var img_url = 'http://www.gravatar.com/avatar/7a6ce775ed081e738f0a175c754f9e8c?rating=PG&size=50&default=';
var img = new texture(150, 200, 100, 100, img_url);
var g = new group();
g.addChild(rect2);
g.addChild(rect3);

Render.addActor(rect1);
Render.addActor(img);
Render.addActor(g);

Render.render();

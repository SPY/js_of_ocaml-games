var rect1 = create_rect(10, 10, 50, 30);
add_to_group(root, rect1);
var rect2 = create_rect(400, 200, 120, 140);
var rect3 = create_rect(350, 100, 85, 65);

var img_url = 'http://www.gravatar.com/avatar/7a6ce775ed081e738f0a175c754f9e8c?rating=PG&size=50&default=';
var img = create_texture(150, 200, 100, 100, img_url);
add_to_group(root, img);
var g = create_group();
add_to_group(g, rect2);
add_to_group(g, rect3);
add_to_group(root, g);

tick();

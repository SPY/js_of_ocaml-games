open Lib
open Js

class actor (actor_id: actor_id) = object
  val id = actor_id
  method id = id
end

class rect x y width height = object
  inherit actor (create_rect x y width height) as super
end

class texture x y width height url = object
  inherit actor (create_texture x y width height url) as super
end

class group = object
  inherit actor (create_group ()) as super
  method add_child (actor: actor) =
    add_to_group super#id actor#id
end

let root = object
  inherit group
  inherit actor root
  method render = tick ()
end

let scene () =
  let rect1 = new rect 10 10 50 30 in
  let rect2 = new rect 400 200 120 140 in
  let rect3 = new rect 350 100 85 65 in
  let img_url = "http://www.gravatar.com/avatar/7a6ce775ed081e738f0a175c754f9e8c?rating=PG&size=50&default=" in
  let img = new texture 150 200 100 100 img_url in
  let group = new group in
  root#add_child rect1;
  root#add_child img;
  group#add_child rect2;
  group#add_child rect3;
  root#add_child (group :> actor);
  root#render

let () = 
  scene ()

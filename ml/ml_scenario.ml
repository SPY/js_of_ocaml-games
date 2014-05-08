open Lib

let scene () =
  let rect1 = create_rect 10 10 50 30 in
  let rect2 = create_rect 400 200 120 140 in
  let rect3 = create_rect 350 100 85 65 in
  let img_url = "http://www.gravatar.com/avatar/7a6ce775ed081e738f0a175c754f9e8c?rating=PG&size=50&default=" in
  let img = create_texture 150 200 100 100 img_url in
  let group = create_group () in
  add_to_group root rect1;
  add_to_group root img;
  add_to_group group rect2;
  add_to_group group rect3;
  add_to_group root group;
  tick ()

let () = 
  scene ()

open Js

type actor_id = int

let number_of_int i =
  number_of_float (float_of_int i)

let create_rect (x: int) (y: int) (width: int) (height: int) : actor_id = 
  Unsafe.fun_call (Unsafe.variable "create_rect") [|
                    Unsafe.inject (number_of_int x);
                    Unsafe.inject (number_of_int y);
                    Unsafe.inject (number_of_int width);
                    Unsafe.inject (number_of_int height)
                   |]

let create_group () : actor_id =
  Unsafe.fun_call (Unsafe.variable "create_group") [| |]

let create_texture (x: int) (y: int) (width: int) (height: int) (url: string) : actor_id = 
  Unsafe.fun_call (Unsafe.variable "create_texture") [|
                    Unsafe.inject (number_of_int x);
                    Unsafe.inject (number_of_int y);
                    Unsafe.inject (number_of_int width);
                    Unsafe.inject (number_of_int height);
                    Unsafe.inject (string url)
                   |]

let add_to_group (group_id: actor_id) (actor_id: actor_id) : unit =
  Unsafe.fun_call (Unsafe.variable "add_to_group") [|
                    Unsafe.inject (number_of_int group_id);
                    Unsafe.inject (number_of_int actor_id)
                  |]

let tick () : unit =
  Unsafe.fun_call (Unsafe.variable "tick") [| |]

let root: actor_id = Unsafe.variable "root"

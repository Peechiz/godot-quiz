export type QuestionType = 'multiple-choice' | 'code-fill' | 'debug' | 'scenario';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Lesson = 'L01' | 'L02' | 'L03' | 'L04' | 'L05' | 'advanced';

export interface Question {
  id: number;
  type: QuestionType;
  difficulty: Difficulty;
  lesson: Lesson;
  title: string;
  question: string;
  /** For code questions, this is the code snippet shown */
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  /** Fun flavor text shown after answering */
  funFact?: string;
}

export const questions: Question[] = [
  // =========================================================================
  // EASY (Questions 1-5)
  // =========================================================================
  {
    id: 1,
    type: 'multiple-choice',
    difficulty: 'easy',
    lesson: 'L01',
    title: 'Root of All Movement',
    question:
      "In Godot's Scene Tree, which node type would you use as the root of a 2D character that needs to move and detect collisions?",
    options: [
      'Node2D',
      'CharacterBody2D',
      'Area2D',
      'StaticBody2D',
    ],
    correctAnswer: 1,
    explanation:
      'CharacterBody2D is designed specifically for player or NPC characters that need to move around the world and collide with other physics bodies. Node2D has no built-in physics, Area2D detects overlaps but does not collide, and StaticBody2D cannot move.',
    funFact:
      'In Godot 3 this node was called KinematicBody2D. The rename to CharacterBody2D in Godot 4 was one of the most debated changes during the migration!',
  },
  {
    id: 2,
    type: 'code-fill',
    difficulty: 'easy',
    lesson: 'L02',
    title: 'Connect the Dots',
    question:
      'Complete this signal connection so the button calls your handler when pressed.',
    codeSnippet: `func _ready():
    $Button.___("pressed", _on_button_pressed)

func _on_button_pressed():
    print("Clicked!")`,
    options: [
      'connect',
      'emit',
      'signal',
      'bind',
    ],
    correctAnswer: 0,
    explanation:
      'The connect() method links a signal on one node to a callable (method) on another. emit() fires a signal, "signal" is a keyword for declaring signals, and bind() attaches extra arguments to a callable.',
    funFact:
      'In Godot 4 you can also connect signals with the shorthand: $Button.pressed.connect(_on_button_pressed). Both styles work!',
  },
  {
    id: 3,
    type: 'multiple-choice',
    difficulty: 'easy',
    lesson: 'L01',
    title: 'Tree Traversal',
    question:
      'Which built-in callback function is called once when a node first enters the Scene Tree?',
    options: [
      'func _process(delta):',
      'func _ready():',
      'func _init():',
      'func _enter_tree():',
    ],
    correctAnswer: 1,
    explanation:
      '_ready() is called once after the node and all its children have entered the tree and are ready. _process() runs every frame, _init() runs when the object is constructed (before entering the tree), and _enter_tree() runs every time the node enters the tree, not just the first time.',
    funFact:
      '_ready() is guaranteed to be called after all of a node\'s children are ready, which makes it perfect for initialization code that references child nodes.',
  },
  {
    id: 4,
    type: 'scenario',
    difficulty: 'easy',
    lesson: 'L04',
    title: 'Invisible Boundaries',
    question:
      'You need enemies to detect when a player enters their aggro range but NOT physically block the player. Which node setup would you use?',
    options: [
      'CharacterBody2D with CollisionShape2D',
      'Area2D with CollisionShape2D',
      'StaticBody2D with CollisionShape2D',
      'RigidBody2D with CollisionShape2D',
    ],
    correctAnswer: 1,
    explanation:
      'Area2D detects overlapping bodies and areas without creating any physical collision response. It is perfect for triggers, aggro zones, and pickup items. The other body types all participate in physics collision and would block the player.',
    funFact:
      'Area2D can also detect the player leaving the zone via the body_exited signal -- handy for de-aggro logic!',
  },
  {
    id: 5,
    type: 'multiple-choice',
    difficulty: 'easy',
    lesson: 'L03',
    title: 'Scene Instancing 101',
    question:
      'What does the preload() function do when used with a .tscn file?',
    options: [
      'It creates a new instance of the scene and adds it to the tree',
      'It loads the scene resource at compile time so it is available immediately at runtime',
      'It connects all the signals defined in the scene',
      'It duplicates an existing node in the tree',
    ],
    correctAnswer: 1,
    explanation:
      'preload() loads a resource during script compilation, making it available instantly when the script runs. It does NOT create an instance -- you still need to call .instantiate() and add_child() to put the scene into the tree.',
    funFact:
      'preload() is evaluated at compile time, so the path must be a string literal. If you need to build the path dynamically at runtime, use load() instead.',
  },

  // =========================================================================
  // MEDIUM (Questions 6-10)
  // =========================================================================
  {
    id: 6,
    type: 'debug',
    difficulty: 'medium',
    lesson: 'L03',
    title: 'Phantom Enemy',
    question:
      'This code should spawn an enemy when called, but nothing appears in the game. What is wrong?',
    codeSnippet: `var enemy_scene = preload("res://scenes/enemy.tscn")

func spawn_enemy():
    var enemy = enemy_scene
    add_child(enemy)`,
    options: [
      'preload should be load for .tscn files',
      'You must call enemy_scene.instantiate() to create a node from the packed scene',
      'add_child() requires a position argument',
      'The variable should be declared with @onready',
    ],
    correctAnswer: 1,
    explanation:
      'preload() returns a PackedScene resource, not a node. You must call .instantiate() on it to create an actual node that can be added to the tree. Without instantiate(), you are trying to add a Resource as a child, which will cause an error.',
    funFact:
      'In Godot 3, the method was called .instance() instead of .instantiate(). If you see old tutorials using .instance(), that is the Godot 3 syntax!',
  },
  {
    id: 7,
    type: 'code-fill',
    difficulty: 'medium',
    lesson: 'L02',
    title: 'Signal Dispatch',
    question:
      'Fill in the blank to correctly declare and emit a custom signal when the player takes damage.',
    codeSnippet: `___ health_changed(new_health: int)

var health: int = 100

func take_damage(amount: int):
    health -= amount
    health_changed.___(health)`,
    options: [
      'signal / emit',
      'var / call',
      'signal / connect',
      'func / fire',
    ],
    correctAnswer: 0,
    explanation:
      'In Godot 4 GDScript, custom signals are declared with the "signal" keyword and emitted by calling .emit() on the signal. The declaration "signal health_changed(new_health: int)" defines the signal, and "health_changed.emit(health)" fires it with the current health value.',
    funFact:
      'Signals in Godot implement the Observer pattern. They let nodes communicate without hard-coupling them together -- a cornerstone of clean game architecture.',
  },
  {
    id: 8,
    type: 'scenario',
    difficulty: 'medium',
    lesson: 'L05',
    title: 'Invincibility Frames',
    question:
      'You want your player to become temporarily invincible after taking damage (i-frames). Which approach best accomplishes this in Godot?',
    options: [
      'Disable the player\'s CollisionShape2D permanently after the first hit',
      'Use a Timer node: on damage, set an "is_invincible" flag to true, start the Timer, and reset the flag in the Timer\'s timeout signal',
      'Remove the player from the scene tree and re-add them after a delay',
      'Change the player\'s collision layer to 0 and never change it back',
    ],
    correctAnswer: 1,
    explanation:
      'A Timer-based invincibility flag is the standard pattern. When the player takes damage you set is_invincible = true and start a short Timer. In the timeout callback you set is_invincible = false. Your damage function checks the flag before applying damage. This keeps the player visible and in the tree.',
    funFact:
      'Classic NES games like Mega Man and Castlevania used i-frames extensively. The flickering sprite effect was actually a rendering trick to show the player they were temporarily safe!',
  },
  {
    id: 9,
    type: 'debug',
    difficulty: 'medium',
    lesson: 'L04',
    title: 'The Silent Collision',
    question:
      'The Area2D should print a message when the player enters, but nothing happens. The collision layers and masks are set correctly. What is wrong?',
    codeSnippet: `extends Area2D

func _ready():
    body_entered.connect(_on_body_entered)

func _on_body_entered(body):
    if body.name == "Player":
        print("Player detected!")`,
    options: [
      'body_entered should be area_entered',
      'The Area2D is missing a CollisionShape2D child node',
      'connect() is not a valid method in Godot 4',
      'The body parameter should be typed as CharacterBody2D',
    ],
    correctAnswer: 1,
    explanation:
      'An Area2D will not detect anything without a CollisionShape2D (or CollisionPolygon2D) child that defines its detection region. The code itself is syntactically correct, but at runtime the area has no shape, so no overlap events will ever fire.',
    funFact:
      'Godot actually shows a warning icon in the editor when a physics body or area is missing a collision shape. Always check the Scene dock for yellow warning triangles!',
  },
  {
    id: 10,
    type: 'multiple-choice',
    difficulty: 'medium',
    lesson: 'L05',
    title: 'Damage Pipeline',
    question:
      'You are building a health system where enemies have varying amounts of health and armor. Armor should reduce incoming damage before it is applied to health. Which design best follows Godot best practices?',
    options: [
      'Store health and armor in global variables and modify them from any script',
      'Create a HealthComponent node with exported health and armor variables, a take_damage(amount) method that accounts for armor, and a signal for when health changes',
      'Put the health logic inside _process() so it runs every frame',
      'Use AnimationPlayer to animate the health value down on each hit',
    ],
    correctAnswer: 1,
    explanation:
      'A reusable HealthComponent node encapsulates the logic cleanly. Exported variables let you configure health and armor per-enemy in the Inspector. The take_damage() method centralizes damage calculation, and a signal notifies the UI or other systems when health changes. This is composable and re-usable across different enemy types.',
    funFact:
      'The "component" pattern (small, focused nodes you attach to entities) is one of the most powerful architectural techniques in Godot. Many professional Godot games use HitboxComponent, HurtboxComponent, and HealthComponent nodes.',
  },

  // =========================================================================
  // HARD (Questions 11-15)
  // =========================================================================
  {
    id: 11,
    type: 'debug',
    difficulty: 'hard',
    lesson: 'advanced',
    title: 'The Dangling Reference',
    question:
      'This bullet spawner sometimes crashes with "Invalid call. Nonexistent function on a previously freed instance." What is the bug?',
    codeSnippet: `extends Node2D

var bullets: Array[CharacterBody2D] = []

func _process(delta):
    for bullet in bullets:
        bullet.position += bullet.direction * bullet.speed * delta
        if bullet.position.x > 1200:
            bullet.queue_free()

func spawn_bullet():
    var b = preload("res://bullet.tscn").instantiate()
    add_child(b)
    bullets.append(b)`,
    options: [
      'preload should not be called inside a function',
      'queue_free() frees the node, but the array still holds a reference to it. On the next frame, iterating the array accesses a freed object.',
      'CharacterBody2D cannot be moved by setting position directly',
      'The bullets array type annotation is wrong',
    ],
    correctAnswer: 1,
    explanation:
      'queue_free() marks the node for deletion at the end of the frame, but the reference in the bullets array is never removed. On subsequent frames, the loop tries to access properties on a freed instance and crashes. You must also remove the bullet from the array, for example by iterating in reverse and using erase(), or by connecting the bullet\'s tree_exited signal to clean up the reference.',
    funFact:
      'The is_instance_valid() function can check whether a reference points to a freed object. It is a lifesaver when debugging dangling reference bugs in Godot!',
  },
  {
    id: 12,
    type: 'scenario',
    difficulty: 'hard',
    lesson: 'advanced',
    title: 'Hitbox / Hurtbox Architecture',
    question:
      'You are implementing a melee combat system. The player\'s sword swing should damage enemies, and enemy attacks should damage the player. Both sides need independent collision detection. Which architecture would you use?',
    options: [
      'Give every character a single Area2D that handles both dealing and receiving damage',
      'Use separate Hitbox (Area2D) and Hurtbox (Area2D) nodes on each character, placed on different collision layers. When a Hitbox overlaps a Hurtbox, the Hurtbox\'s owner takes damage.',
      'Use raycasts from each character to detect hits every frame',
      'Check distance between all characters in _process() and apply damage when they are close enough',
    ],
    correctAnswer: 1,
    explanation:
      'The Hitbox/Hurtbox pattern uses two separate Area2D nodes per character. Hitboxes represent attacks (sword swings, projectiles) and Hurtboxes represent vulnerable areas. They are placed on separate collision layers so a character\'s own hitbox never triggers its own hurtbox. This pattern is clean, scalable, and used by most 2D action games built in Godot.',
    funFact:
      'The Hitbox/Hurtbox pattern originates from fighting game development. In games like Street Fighter, developers visualize hitboxes in red and hurtboxes in green during debug mode -- you can do the same in Godot by toggling visible collision shapes!',
  },
  {
    id: 13,
    type: 'code-fill',
    difficulty: 'hard',
    lesson: 'L04',
    title: 'Layer Mastery',
    question:
      'Complete this code so the player\'s hurtbox only detects collisions with objects on physics layer 3 (enemy attacks), and nothing else.',
    codeSnippet: `extends Area2D

func _ready():
    # Clear all collision layers -- this node should not BE on any layer
    collision_layer = ___
    # Set the mask so we only DETECT layer 3
    collision_mask = ___`,
    options: [
      '0 / 4',
      '3 / 0',
      '0 / 3',
      '1 / 3',
    ],
    correctAnswer: 0,
    explanation:
      'Collision layers and masks are bitmasks. Layer 3 is represented by bit 3, which has the integer value 4 (2 to the power of 2, since layers are 1-indexed but bits are 0-indexed: layer 1 = bit 0 = value 1, layer 2 = bit 1 = value 2, layer 3 = bit 2 = value 4). Setting collision_layer to 0 means this node is not on any layer itself. Setting collision_mask to 4 means it only scans for objects on layer 3.',
    funFact:
      'Godot supports up to 32 collision layers. A common convention is: Layer 1 = World, Layer 2 = Player, Layer 3 = Enemies, Layer 4 = Pickups. You can name them in Project Settings > Layer Names > 2D Physics.',
  },
  {
    id: 14,
    type: 'multiple-choice',
    difficulty: 'hard',
    lesson: 'advanced',
    title: 'Boss Fight State Machine',
    question:
      'You are building a boss with three phases: Idle, Charging, and Attacking. The boss should transition between phases based on a timer and player proximity. What is the best architecture?',
    options: [
      'Use a long chain of if/elif statements in _process() checking boolean flags for each phase',
      'Create three separate scenes and switch between them by removing and adding child nodes',
      'Implement a state machine using an enum for states and a match statement in _process(), with dedicated functions for each state\'s behavior and transitions',
      'Use AnimationPlayer callbacks to drive all boss logic',
    ],
    correctAnswer: 2,
    explanation:
      'A state machine with an enum and match statement is the cleanest pattern for multi-phase bosses. Each state has its own logic function, and transitions are explicit. This avoids tangled boolean spaghetti, keeps each phase self-contained, and makes it easy to add new phases later. Example: enum State { IDLE, CHARGING, ATTACKING } and match current_state: State.IDLE: idle_behavior(delta).',
    funFact:
      'Godot also has a built-in AnimationTree with a StateMachine mode that can handle state transitions visually. For complex AI, some developers combine a code-based state machine for logic with AnimationTree for animation blending.',
  },
  {
    id: 15,
    type: 'scenario',
    difficulty: 'hard',
    lesson: 'L05',
    title: 'Damage Number Popups',
    question:
      'You want floating damage numbers to appear above enemies when they take a hit, rise upward, and fade out. The numbers should work for any enemy in the game. What is the best implementation strategy?',
    options: [
      'Create the Label node in code every time inside the enemy script, animate it with a Tween, and free it when done',
      'Pre-place a Label on every enemy and toggle its visibility',
      'Create a DamageNumber scene (Label + AnimationPlayer) and, from a global DamageNumbers manager or the enemy\'s take_damage() function, instantiate it at the enemy\'s position, play the animation, and queue_free() on animation finish',
      'Use the _draw() function to render text directly every frame',
    ],
    correctAnswer: 2,
    explanation:
      'A dedicated DamageNumber scene with a Label and AnimationPlayer is the most maintainable approach. The AnimationPlayer handles the rise and fade animation, and the scene frees itself when the animation finishes (via the animation_finished signal). Instantiating it as a separate scene keeps it decoupled from the enemy -- any entity in the game can spawn damage numbers without duplicating code.',
    funFact:
      'A pro tip: add the damage number as a child of the level root (not the enemy) so it stays in place if the enemy moves. Use global_position to place it at the enemy\'s location at the moment of impact!',
  },
];

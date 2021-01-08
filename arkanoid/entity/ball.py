from entity.base_entity import Entity
from assets import BALL_RESOURCE
from constants import WIDTH, HEIGHT, BALL_WIDTH
import random


class Ball(Entity):

    def __init__(self, initial_position_x, initial_position_y, absolute_vertical_velocity,
                 maximum_initial_absolute_horizontal_velocity, ball_out_of_area_callback):
        super().__init__(initial_position_x, initial_position_y, BALL_RESOURCE, True)
        self.y_velocity = 0
        self.x_velocity = 0
        self.absolute_vertical_velocity = absolute_vertical_velocity
        self.maximum_initial_absolute_horizontal_velocity = maximum_initial_absolute_horizontal_velocity
        self.ball_out_of_area_callback = ball_out_of_area_callback

    def restart(self):
        super().restart()
        self.y_velocity = 0
        self.x_velocity = 0

    def move_to(self, x, y):
        self.x = x
        self.y = y

    def start_moving(self):
        self.y_velocity = -self.absolute_vertical_velocity
        self.x_velocity = random.randint(-self.maximum_initial_absolute_horizontal_velocity, self.maximum_initial_absolute_horizontal_velocity)

    def make_move(self):
        self.x += self.x_velocity
        self.y += self.y_velocity

        if self.y >= HEIGHT and self.y_velocity > 0:
            self.ball_out_of_area_callback()
        elif self.y < 0 and self.y_velocity < 0:
            self.y_velocity *= -1
        elif (self.x + BALL_WIDTH) > WIDTH and self.x_velocity > 0:
            self.x_velocity *= -1
        elif self.x < 0 and self.x_velocity < 0:
            self.x_velocity *= -1

    def paddle_collision(self, x_velocity_offset):
        if self.y_velocity > 0:
            self.y_velocity = -self.y_velocity
            self.x_velocity += x_velocity_offset

    def brick_collision(self, collision_point, brick):
        collision_happened = False
        if brick.left_collision(collision_point, self.x_velocity, self.y_velocity) or brick.right_collision(collision_point, self.x_velocity, self.y_velocity):
            collision_happened = True
            self.x_velocity *= -1
        if brick.top_collision(collision_point, self.x_velocity, self.y_velocity) or brick.bottom_collision(collision_point, self.x_velocity, self.y_velocity):
            collision_happened = True
            self.y_velocity *= -1
        return collision_happened


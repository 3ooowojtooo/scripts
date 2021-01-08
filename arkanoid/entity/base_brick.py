from entity.base_entity import Entity
from assets import *


class Brick(Entity):

    def __init__(self, initial_position_x, initial_position_y, resource, strength):
        super().__init__(initial_position_x, initial_position_y, resource, True)
        self.initial_strength = strength
        self.strength = self.initial_strength

    def restart(self):
        super().restart()
        self.strength = self.initial_strength

    def hit(self):
        if self.strength >= 1:
            self.strength -= 1
            self.change_resource()
        if self.strength == 0:
            self.visible = False
        return 1

    def change_resource(self):
        if self.strength == 3:
            self.resource = RED_BRICK_RESOURCE
        elif self.strength == 2:
            self.resource = YELLOW_BRICK_RESOURCE
        elif self.strength == 1:
            self.resource = GREEN_BRICK_RESOURCE

    def get_score(self):
        return self.strength

    def get_collision_rectangle(self, ball_x_velocity, ball_y_velocity):
        left = self.x + abs(ball_x_velocity)
        right = self.x + self.get_width() - abs(ball_x_velocity)
        top = self.y + abs(ball_y_velocity)
        bottom = self.y + self.get_height() - abs(ball_y_velocity)
        return left, right, top, bottom

    def left_collision(self, collision_point, ball_x_velocity, ball_y_velocity):
        left, _, _, _ = self.get_collision_rectangle(ball_x_velocity, ball_y_velocity)
        x, _ = collision_point
        return x <= left and ball_x_velocity > 0

    def right_collision(self, collision_point, ball_x_velocity, ball_y_velocity):
        _, right, _, _ = self.get_collision_rectangle(ball_x_velocity, ball_y_velocity)
        x, _ = collision_point
        return x >= right and ball_x_velocity < 0

    def top_collision(self, collision_point, ball_x_velocity, ball_y_velocity):
        _, _, top, _ = self.get_collision_rectangle(ball_x_velocity, ball_y_velocity)
        _, y = collision_point
        return y <= top and ball_y_velocity > 0

    def bottom_collision(self, collision_point, ball_x_velocity, ball_y_velocity):
        _, _, _, bottom = self.get_collision_rectangle(ball_x_velocity, ball_y_velocity)
        _, y = collision_point
        return y >= bottom and ball_y_velocity < 0

import pygame
from assets import PADDLE_RESOURCE
from entity.base_entity import Entity
from constants import WIDTH


class Paddle(Entity):

    def __init__(self, initial_position_x, initial_position_y, horizontal_velocity, x_bounce_factor):
        super().__init__(initial_position_x, initial_position_y, PADDLE_RESOURCE, True)
        self.initial_position_x = initial_position_x
        self.initial_position_y = initial_position_y
        self.horizontal_velocity = horizontal_velocity
        self.x_bounce_factor = x_bounce_factor

    def handle_keys(self, keys):
        if keys[pygame.K_LEFT]:
            new_position_x = self.x - self.horizontal_velocity
            if new_position_x >= 0:
                self.x = new_position_x
        if keys[pygame.K_RIGHT]:
            new_position_x = self.x + self.horizontal_velocity
            if new_position_x + self.resource.get_width() <= WIDTH:
                self.x = new_position_x

    def compute_x_velocity_offset(self, collision_point):
        paddle_center_x = self.x + self.get_width() / 2
        collision_distance = collision_point[0] - paddle_center_x
        collision_factor = collision_distance / self.get_width() * 2
        return collision_factor * self.x_bounce_factor

import pygame
from assets import PADDLE_RESOURCE
from entity.base_entity import Entity
from constants import WIDTH


class Paddle(Entity):

    def __init__(self, initial_position_x, initial_position_y, horizontal_velocity):
        super().__init__(initial_position_x, initial_position_y, PADDLE_RESOURCE)
        self.horizontal_velocity = horizontal_velocity

    def handle_keys(self, keys):
        if keys[pygame.K_LEFT]:
            new_position_x = self.x - self.horizontal_velocity
            if new_position_x >= 0:
                self.x = new_position_x
        if keys[pygame.K_RIGHT]:
            new_position_x = self.x + self.horizontal_velocity
            if new_position_x + self.resource.get_width() <= WIDTH:
                self.x = new_position_x

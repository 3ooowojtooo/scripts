import pygame


class Entity:

    def __init__(self, initial_position_x, initial_position_y, resource):
        self.x = initial_position_x
        self.y = initial_position_y
        self.resource = resource
        self.mask = pygame.mask.from_surface(self.resource)

    def draw(self, window):
        window.blit(self.resource, (self.x, self.y))
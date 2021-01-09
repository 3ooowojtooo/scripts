import math

import pygame


class Entity:

    def __init__(self, initial_position_x, initial_position_y, resource, visible):
        self.initial_position_x = initial_position_x
        self.initial_position_y = initial_position_y
        self.x = initial_position_x
        self.y = initial_position_y
        self.initial_resource = resource
        self.resource = resource
        self.mask = pygame.mask.from_surface(self.resource)
        self.initial_visible = visible
        self.visible = visible

    def restart(self):
        self.x = self.initial_position_x
        self.y = self.initial_position_y
        self.resource = self.initial_resource
        self.visible = self.initial_visible

    def draw(self, window):
        if self.visible:
            window.blit(self.resource, (self.x, self.y))

    def get_width(self):
        return self.resource.get_width()

    def get_height(self):
        return self.resource.get_height()

    def collide(self, obj):
        offset_x = int(obj.x - self.x)
        offset_y = int(obj.y - self.y)
        overlap_mask = self.mask.overlap_mask(obj.mask, (offset_x, offset_y))
        intersection_point = None
        biggest_distance = None
        width, height = overlap_mask.get_size()
        for i in range(width):
            for j in range(height):
                if overlap_mask.get_at((i, j)) != 0:
                    x, y = self.x + i, self.y + j
                    center_x, center_y = self.x + self.get_width() / 2, self.y + self.get_height() / 2
                    distance = math.sqrt(pow(center_x - x, 2) + pow(center_y - y, 2))
                    if biggest_distance is None or distance > biggest_distance:
                        biggest_distance = distance
                        intersection_point = (x, y)
        if intersection_point is not None:
            print(intersection_point)
        return intersection_point

    def contains_point(self, point):
        x, y = point[0], point[1]
        contains_x = self.x <= x <= (self.x + self.get_width())
        contains_y = self.y <= y <= (self.y + self.get_height())
        return contains_x and contains_y

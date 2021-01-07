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
        overlap_offset_point = self.mask.overlap(obj.mask, (offset_x, offset_y))
        if overlap_offset_point is not None:
            return self.x + overlap_offset_point[0], self.y + overlap_offset_point[1]
        return None

    def contains_point(self, point):
        x, y = point[0], point[1]
        contains_x = x >= self.x and x <= (self.x + self.get_width())
        contains_y = y >= self.y and y <= (self.y + self.get_height())
        return contains_x and contains_y
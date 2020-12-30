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
            return True
        return False

    def change_resource(self):
        if self.strength == 3:
            self.resource = RED_BRICK_RESOURCE
        elif self.strength == 2:
            self.resource = YELLOW_BRICK_RESOURCE
        elif self.strength == 1:
            self.resource = GREEN_BRICK_RESOURCE

    def get_score(self):
        return self.strength
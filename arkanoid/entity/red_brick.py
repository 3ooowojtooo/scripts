from entity.base_brick import Brick
from assets import RED_BRICK_RESOURCE


class RedBrick(Brick):

    def __init__(self, initial_position_x, initial_position_y):
        super().__init__(initial_position_x, initial_position_y, RED_BRICK_RESOURCE, 3)
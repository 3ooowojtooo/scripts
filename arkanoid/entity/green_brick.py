from entity.base_brick import Brick
from assets import GREEN_BRICK_RESOURCE


class GreenBrick(Brick):

    def __init__(self, initial_position_x, initial_position_y):
        super().__init__(initial_position_x, initial_position_y, GREEN_BRICK_RESOURCE, 1)
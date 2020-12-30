from entity.base_brick import Brick
from assets import YELLOW_BRICK_RESOURCE


class YellowBrick(Brick):

    def __init__(self, initial_position_x, initial_position_y):
        super().__init__(initial_position_x, initial_position_y, YELLOW_BRICK_RESOURCE, 2)

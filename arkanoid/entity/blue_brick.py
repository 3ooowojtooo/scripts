from entity.base_brick import Brick
from assets import BLUE_BRICK_RESOURCE


class BlueBrick(Brick):

    def __init__(self, initial_position_x, initial_position_y):
        super().__init__(initial_position_x, initial_position_y, BLUE_BRICK_RESOURCE, None)

    def hit(self):
        pass

    def change_resource(self):
        pass

    def get_score(self):
        return 0

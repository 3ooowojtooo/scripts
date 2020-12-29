from controller.base_controller import Controller
from constants import *
from entity.paddle import Paddle


class GameController(Controller):
    def __init__(self, window):
        super().__init__(window)
        self.paddle = Paddle(PADDLE_INITIAL_X_POSITION, PADDLE_INITIAL_Y_POSITION, PADDLE_HORIZONTAL_VELOCITY)
        self.lives = 5

    def handle_keys(self, keys):
        self.paddle.handle_keys(keys)

    def draw(self):
        self.paddle.draw(self.window)

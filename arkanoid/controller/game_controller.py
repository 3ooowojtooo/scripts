import pygame

from controller.base_controller import Controller
from constants import *
from entity.ball import Ball
from entity.paddle import Paddle
from util import level_builder


class GameController(Controller):
    def __init__(self, window):
        super().__init__(window)
        self.paddle = Paddle(PADDLE_INITIAL_X_POSITION, PADDLE_INITIAL_Y_POSITION, PADDLE_HORIZONTAL_VELOCITY)
        self.ball = Ball(BALL_INITIAL_X_POSITION, BALL_INITIAL_Y_POSITION, BALL_ABSOLUTE_VERTICAL_VELOCITY, self.ball_out_area)
        self.lives = INITIAL_LIVES
        self.ball_moving = False
        self.levels = level_builder.build_levels()
        self.current_level_index = 0
        self.current_level = self.levels[self.current_level_index]

    def restart(self):
        self.lives = INITIAL_LIVES
        self.ball_moving = False
        self.paddle.restart()
        self.ball.restart()
        self.current_level_index = 0
        self.current_level = self.levels[self.current_level_index]

    def handle_keys(self, keys):
        self.paddle.handle_keys(keys)
        if not self.ball_moving:
            self.ball.move_to(self.paddle.x + self.paddle.get_width() / 2 - self.ball.get_width() / 2, self.paddle.y - self.ball.get_height())
        if not self.ball_moving and keys[pygame.K_SPACE]:
            self.ball.start_moving()
            self.ball_moving = not self.ball_moving

    def draw(self):
        if self.ball_moving:
            self.ball.make_move()
        self.paddle.draw(self.window)
        self.ball.draw(self.window)
        self.current_level.draw(self.window)

    def ball_out_area(self):
        self.lives -= 1
        if self.lives == 0:
            print("Lose")
        else:
            self.ball_moving = False
            self.paddle.restart()
            self.ball.restart()
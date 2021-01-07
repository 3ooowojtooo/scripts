import pygame

from constants import *
from controller.base_controller import Controller
from entity.ball import Ball
from entity.paddle import Paddle
from util import level_builder
from assets import GAME_LABELS_FONT


class GameController(Controller):
    def __init__(self, window, pause_callback, lose_callback, win_callback):
        super().__init__(window)
        self.paddle = Paddle(PADDLE_INITIAL_X_POSITION, PADDLE_INITIAL_Y_POSITION, PADDLE_HORIZONTAL_VELOCITY, PADDLE_BOUNCE_X_FACTOR)
        self.ball = Ball(BALL_INITIAL_X_POSITION, BALL_INITIAL_Y_POSITION, BALL_ABSOLUTE_VERTICAL_VELOCITY,
                         BALL_ABSOLUTE_MAXIMUM_INITIAL_HORIZONTAL_VELOCITY, self.ball_out_area)
        self.lives = INITIAL_LIVES
        self.points = 0
        self.ball_moving = False
        self.levels = level_builder.build_levels()
        self.current_level_index = 0
        self.current_level = self.levels[self.current_level_index]
        self.current_level_points = 0
        self.lives_label = None
        self.points_label = None
        self.level_label = None
        self.pause_callback = pause_callback
        self.lose_callback = lose_callback
        self.win_callback = win_callback

    def restart(self):
        self.lives = INITIAL_LIVES
        self.points = 0
        self.ball_moving = False
        self.paddle.restart()
        self.ball.restart()
        self.current_level_index = 0
        self.current_level = self.levels[self.current_level_index]
        self.current_level_points = 0
        for level in self.levels:
            level.restart()

    def handle_keys(self, keys, enter_keydown):
        self.paddle.handle_keys(keys)
        if not self.ball_moving:
            self.ball.move_to(self.paddle.x + self.paddle.get_width() / 2 - self.ball.get_width() / 2, self.paddle.y - self.ball.get_height())
        if not self.ball_moving and keys[pygame.K_SPACE]:
            self.ball.start_moving()
            self.ball_moving = not self.ball_moving
        if keys[pygame.K_ESCAPE]:
            self.pause_callback()

    def draw(self):
        if self.ball_moving:
            self.ball.make_move()
            self.check_ball_paddle_collision()
            self.check_bricks_collision()
        self.paddle.draw(self.window)
        self.ball.draw(self.window)
        self.current_level.draw(self.window)
        self.draw_labels()

    def draw_labels(self):
        lives_text = LIVES_LABEL + str(self.lives)
        self.lives_label = GAME_LABELS_FONT.render(lives_text, 1, GAME_LABELS_COLOR)
        points_text = POINTS_LABEL + str(self.points)
        self.points_label = GAME_LABELS_FONT.render(points_text, 1, GAME_LABELS_COLOR)
        level_text = LEVEL_LABEL + str(self.current_level_index + 1)
        self.level_label = GAME_LABELS_FONT.render(level_text, 1, GAME_LABELS_COLOR)
        lives_pos_x = GAME_LABELS_MARGIN
        lives_pos_y = WIDTH - GAME_LABELS_MARGIN - self.lives_label.get_height()
        self.window.blit(self.lives_label, (lives_pos_x, lives_pos_y))
        points_pos_x = WIDTH / 2 - self.points_label.get_width() / 2
        points_pos_y = WIDTH - GAME_LABELS_MARGIN - self.points_label.get_height()
        self.window.blit(self.points_label, (points_pos_x, points_pos_y))
        level_pos_x = WIDTH - GAME_LABELS_MARGIN - self.level_label.get_width()
        level_pos_y = WIDTH - GAME_LABELS_MARGIN - self.level_label.get_height()
        self.window.blit(self.level_label, (level_pos_x, level_pos_y))

    def check_ball_paddle_collision(self):
        collision_point = self.ball.collide(self.paddle)
        if collision_point is not None:
            x_velocity_offset = self.paddle.compute_x_velocity_offset(collision_point)
            self.ball.paddle_collision(x_velocity_offset)

    def check_bricks_collision(self):
        for brick in self.current_level.bricks:
            if brick.visible:
                collision_point = self.ball.collide(brick)
                if collision_point is not None and brick.contains_point(collision_point):
                    collision_happened = self.ball.brick_collision(collision_point, brick)
                    if collision_happened:
                        points = brick.hit()
                        self.points_scored(points)
                    break

    def points_scored(self, points):
        if points > 0:
            self.points += points
            self.current_level_points += points
            if self.current_level_points == self.current_level.max_score:
                self.next_level()

    def next_level(self):
        self.current_level_points = 0
        if (self.current_level_index + 1) < len(self.levels):
            self.current_level_index += 1
            self.current_level = self.levels[self.current_level_index]
            self.ball_moving = False
            self.paddle.restart()
            self.ball.restart()
        else:
            self.win_callback(self.points)

    def ball_out_area(self):
        self.lives -= 1
        if self.lives == 0:
            self.lose_callback(self.points)
        else:
            self.ball_moving = False
            self.paddle.restart()
            self.ball.restart()
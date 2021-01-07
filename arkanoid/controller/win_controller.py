import pygame

from controller.base_controller import Controller
from assets import *
from constants import *


class WinController(Controller):
    def __init__(self, window, continue_callback):
        super().__init__(window)
        self.continue_callback = continue_callback
        self.title_label = None
        self.score_label = None
        self.continue_label = None
        self.points_scored = 0

    def restart(self):
        self.title_label = None
        self.score_label = None
        self.continue_label = None
        self.points_scored = 0

    def set_points(self, points):
        self.points_scored = points

    def handle_keys(self, keys):
        if keys[pygame.K_RETURN]:
            self.continue_callback()

    def draw(self):
        self.title_label = WIN_TITLE_FONT.render(WIN_TITLE, 1, WIN_TITLE_COLOR)
        title_x = WIDTH / 2 - self.title_label.get_width() / 2
        self.window.blit(self.title_label, (title_x, WIN_TITLE_Y_POSITION))
        score_text = WIN_SCORE_TEXT + str(self.points_scored)
        self.score_label = WIN_LABEL_FONT.render(score_text, 1, WIN_LABELS_COLOR)
        score_x = WIDTH / 2 - self.score_label.get_width() / 2
        score_y = WIN_TITLE_Y_POSITION + self.title_label.get_height() + WIN_LABELS_TOP_MARGIN
        self.window.blit(self.score_label, (score_x, score_y))
        self.continue_label = WIN_LABEL_FONT.render(WIN_CONTINUE_TEXT, 1, WIN_LABELS_COLOR)
        continue_x = WIDTH / 2 - self.continue_label.get_width() / 2
        continue_y = score_y + self.score_label.get_height() + WIN_LABELS_TOP_MARGIN
        self.window.blit(self.continue_label, (continue_x, continue_y))

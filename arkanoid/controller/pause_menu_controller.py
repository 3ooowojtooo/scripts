import pygame
from controller.base_controller import Controller
from assets import *
from constants import *


class PauseMenuController(Controller):

    def __init__(self, window, resume_game_callback, exit_callback):
        super().__init__(window)
        self.resume_game_callback = resume_game_callback
        self.exit_callback = exit_callback
        self.selected_item = 0
        self.item_max_index = 1
        self.title_label = None
        self.resume_label = None
        self.exit_label = None

    def restart(self):
        self.selected_item = 0
        self.title_label = None
        self.resume_label = None
        self.exit_label = None

    def handle_keys(self, keys, enter_keydown):
        if keys[pygame.K_UP] and self.selected_item > 0:
            self.selected_item -= 1
        if keys[pygame.K_DOWN] and self.selected_item < self.item_max_index:
            self.selected_item += 1
        if enter_keydown:
            if self.selected_item == 0:
                self.resume_game_callback()
            elif self.selected_item == 1:
                self.exit_callback()

    def draw(self):
        self.title_label = PAUSE_MENU_TITLE_FONT.render(PAUSE_TITLE, 1, PAUSE_TITLE_COLOR)
        title_x_position = WIDTH / 2 - self.title_label.get_width() / 2
        self.window.blit(self.title_label, (title_x_position, PAUSE_TITLE_Y_POSITION))
        if self.selected_item == 0:
            self.resume_label = MENU_ITEM_FONT_SELECTED.render(PAUSE_MENU_RESUME_ITEM_TEXT, 1, MENU_ITEM_COLOR)
            self.exit_label = MENU_ITEM_FONT.render(PAUSE_MENU_EXIT_ITEM_TEXT, 1, MENU_ITEM_COLOR)
        elif self.selected_item == 1:
            self.resume_label = MENU_ITEM_FONT.render(PAUSE_MENU_RESUME_ITEM_TEXT, 1, MENU_ITEM_COLOR)
            self.exit_label = MENU_ITEM_FONT_SELECTED.render(PAUSE_MENU_EXIT_ITEM_TEXT, 1, MENU_ITEM_COLOR)
        resume_item_x = WIDTH / 2 - self.resume_label.get_width() / 2
        resume_item_y = PAUSE_TITLE_Y_POSITION + self.title_label.get_height() + PAUSE_MENU_ITEM_TOP_MARGIN
        self.window.blit(self.resume_label, (resume_item_x, resume_item_y))
        exit_item_x = WIDTH / 2 - self.exit_label.get_width() / 2
        exit_item_y = resume_item_y + self.resume_label.get_height() + PAUSE_MENU_ITEM_TOP_MARGIN
        self.window.blit(self.exit_label, (exit_item_x, exit_item_y))

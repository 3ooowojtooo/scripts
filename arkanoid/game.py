from assets import *
from constants import *
import pygame

from controller.game_controller import GameController
from controller.main_menu_controller import MainMenuController
from game_status import GameStatus


class Game:

    def __init__(self):
        self.running = True
        self.window = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.mainMenuController = MainMenuController(self.window, self.start_game, self.exit_game)
        self.gameController = GameController(self.window)
        self.gameStatus = GameStatus.MAIN_MENU

    def start_game(self):
        self.gameStatus = GameStatus.RUNNING

    def exit_game(self):
        quit()

    def run(self):
        while self.running:
            self.tick_fps()
            self.handle_keys()
            self.redraw()

    def tick_fps(self):
        self.clock.tick(FPS)

    def handle_keys(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                quit()

        keys = pygame.key.get_pressed()
        if self.gameStatus == GameStatus.MAIN_MENU:
            self.mainMenuController.handle_keys(keys)
        elif self.gameStatus == GameStatus.RUNNING:
            self.gameController.handle_keys(keys)

    def redraw(self):
        self.window.blit(BACKGROUND_RESOURCE, (0, 0))
        if self.gameStatus == GameStatus.MAIN_MENU:
            self.mainMenuController.draw()
        elif self.gameStatus == GameStatus.RUNNING:
            self.gameController.draw()
        pygame.display.update()

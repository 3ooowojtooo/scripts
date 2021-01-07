from assets import *
from constants import *
import pygame

from controller.game_controller import GameController
from controller.lose_controller import LoseController
from controller.main_menu_controller import MainMenuController
from controller.pause_menu_controller import PauseMenuController
from controller.win_controller import WinController
from game_status import GameStatus


class Game:

    def __init__(self):
        self.running = True
        self.window = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.mainMenuController = MainMenuController(self.window, self.start_game, self.exit_game)
        self.pauseMenuController = PauseMenuController(self.window, self.resume_game, self.exit_to_main_menu)
        self.gameController = GameController(self.window, self.pause_game, self.game_lost, self.game_won)
        self.loseController = LoseController(self.window, self.game_over)
        self.winController = WinController(self.window, self.game_over)
        self.gameStatus = GameStatus.MAIN_MENU

    def start_game(self):
        self.gameStatus = GameStatus.RUNNING

    def exit_game(self):
        quit()

    def pause_game(self):
        self.gameStatus = GameStatus.PAUSE

    def resume_game(self):
        self.gameStatus = GameStatus.RUNNING

    def exit_to_main_menu(self):
        self.gameStatus = GameStatus.MAIN_MENU
        self.gameController.restart()
        self.pauseMenuController.restart()

    def game_lost(self, points_scored):
        self.gameStatus = GameStatus.LOSE
        self.loseController.set_points(points_scored)

    def game_won(self, points_scored):
        self.gameStatus = GameStatus.WIN
        self.winController.set_points(points_scored)

    def game_over(self):
        self.gameStatus = GameStatus.MAIN_MENU
        self.gameController.restart()
        self.winController.restart()
        self.loseController.restart()

    def run(self):
        while self.running:
            self.tick_fps()
            self.handle_keys()
            self.redraw()

    def tick_fps(self):
        self.clock.tick(FPS)

    def handle_keys(self):
        enter_keydown = False
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                quit()
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                enter_keydown = True

        keys = pygame.key.get_pressed()

        if self.gameStatus == GameStatus.MAIN_MENU:
            self.mainMenuController.handle_keys(keys, enter_keydown)
        elif self.gameStatus == GameStatus.RUNNING:
            self.gameController.handle_keys(keys, enter_keydown)
        elif self.gameStatus == GameStatus.PAUSE:
            self.pauseMenuController.handle_keys(keys, enter_keydown)
        elif self.gameStatus == GameStatus.LOSE:
            self.loseController.handle_keys(keys, enter_keydown)
        elif self.gameStatus == GameStatus.WIN:
            self.winController.handle_keys(keys, enter_keydown)

    def redraw(self):
        self.window.blit(BACKGROUND_RESOURCE, (0, 0))
        if self.gameStatus == GameStatus.MAIN_MENU:
            self.mainMenuController.draw()
        elif self.gameStatus == GameStatus.RUNNING:
            self.gameController.draw()
        elif self.gameStatus == GameStatus.PAUSE:
            self.pauseMenuController.draw()
        elif self.gameStatus == GameStatus.LOSE:
            self.loseController.draw()
        elif self.gameStatus == GameStatus.WIN:
            self.winController.draw()
        pygame.display.update()

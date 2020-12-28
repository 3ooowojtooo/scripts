from assets import *
from constants import *
import pygame

from entity.paddle import Paddle


class Game:

    def __init__(self):
        self.running = True
        self.window = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.paddle = Paddle(PADDLE_INITIAL_X_POSITION, PADDLE_INITIAL_Y_POSITION, PADDLE_HORIZONTAL_VELOCITY)

    def run(self):
        while self.running:
            self.tick_fps()
            self.handle_events()
            self.redraw()

    def tick_fps(self):
        self.clock.tick(FPS)

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                quit()

        keys = pygame.key.get_pressed()
        self.paddle.handle_keys(keys)

    def redraw(self):
        self.window.blit(BACKGROUND_RESOURCE, (0, 0))
        self.paddle.draw(self.window)
        pygame.display.update()

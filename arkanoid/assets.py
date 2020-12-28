import os
import pygame
from constants import WIDTH, HEIGHT

PADDLE_RESOURCE = pygame.image.load(os.path.join("assets", "paddle.png"))
BALL_RESOURCE = pygame.image.load(os.path.join("assets", "ball.png"))
RED_BRICK_RESOURCE = pygame.image.load(os.path.join("assets", "red_brick.png"))
YELLOW_BRICK_RESOURCE = pygame.image.load(os.path.join("assets", "yellow_brick.png"))
GREEN_BRICK_RESOURCE = pygame.image.load(os.path.join("assets", "green_brick.png"))
BLUE_BRICK_RESOURCE = pygame.image.load(os.path.join("assets", "blue_brick.png"))
BACKGROUND_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "background.png")), (WIDTH, HEIGHT))
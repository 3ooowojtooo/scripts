import os
import pygame
from constants import *

pygame.font.init()

PADDLE_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "paddle.png")), (PADDLE_WIDTH, PADDLE_HIGH))
BALL_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "ball.png")), (BALL_WIDTH, BALL_HEIGHT))
RED_BRICK_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "red_brick.png")), (BRICK_WIDTH, BRICK_HEIGHT))
YELLOW_BRICK_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "yellow_brick.png")), (BRICK_WIDTH, BRICK_HEIGHT))
GREEN_BRICK_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "green_brick.png")), (BRICK_WIDTH, BRICK_HEIGHT))
BLUE_BRICK_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "blue_brick.png")), (BRICK_WIDTH, BRICK_HEIGHT))
BACKGROUND_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "background.png")), (WIDTH, HEIGHT))
LOGO_RESOURCE = pygame.transform.scale(pygame.image.load(os.path.join("assets", "logo.png")), (LOGO_WIDTH, LOGO_HEIGHT))

MENU_ITEM_FONT = pygame.font.SysFont("arial", 25)
MENU_ITEM_FONT_SELECTED = pygame.font.SysFont("arial", 25, True, False)
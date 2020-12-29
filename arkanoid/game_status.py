from enum import Enum


class GameStatus(Enum):
    MAIN_MENU = 0
    RUNNING = 1
    PAUSE = 2
    LOSE = 3
    WIN = 4

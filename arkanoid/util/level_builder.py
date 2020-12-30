from os import listdir, path
from constants import BRICK_HEIGHT, BRICK_WIDTH, BRICKS_AMOUNT_PER_LINE, MAX_LINES_OF_BRICKS_AMOUNT
from entity.blue_brick import BlueBrick
from entity.green_brick import GreenBrick
from entity.red_brick import RedBrick
from entity.yellow_brick import YellowBrick
from model.level import Level

LEVELS_DIRECTORY_PATH = path.join("assets", "levels")


def build_levels():
    levels = []
    level_number = 1
    for level_file in list_level_files():
        level_file_path = path.join(LEVELS_DIRECTORY_PATH, level_file)
        levels.append(build_level(level_file_path, level_number))
        level_number += 1
    return levels


def list_level_files():
    return listdir(LEVELS_DIRECTORY_PATH)


def build_level(file_path, level_number):
    file = open(file_path, 'r')
    lines = []
    for line in file:
        lines.append(line.strip())
    if len(lines) > MAX_LINES_OF_BRICKS_AMOUNT:
        raise ValueError("Too many brick lines declared in file " + str(file_path))
    bricks = []
    for i in range(len(lines)):
        bricks.extend(build_bricks_for_line(lines[i], i))
        i += 1
    return Level(bricks, level_number)


def build_bricks_for_line(line, line_number):
    if len(line) > BRICKS_AMOUNT_PER_LINE:
        raise ValueError("Too many bricks declared in line_number " + str(line_number))
    bricks = []
    for i in range(len(line)):
        character = line[i]
        bricks.append(build_brick(character, i, line_number))
        i += 1
    return bricks


def build_brick(character, number_in_line, line_number):
    brick_x = number_in_line * BRICK_WIDTH
    brick_y = line_number * BRICK_HEIGHT
    if character == '0':
        return BlueBrick(brick_x, brick_y)
    elif character == '1':
        return GreenBrick(brick_x, brick_y)
    elif character == '2':
        return YellowBrick(brick_x, brick_y)
    elif character == '3':
        return RedBrick(brick_x, brick_y)
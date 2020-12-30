from entity.base_entity import Entity
from assets import BALL_RESOURCE
from constants import WIDTH, HEIGHT, BALL_WIDTH


class Ball(Entity):

    def __init__(self, initial_position_x, initial_position_y, absolute_vertical_velocity, ball_out_of_area_callback):
        super().__init__(initial_position_x, initial_position_y, BALL_RESOURCE, True)
        self.y_velocity = 0
        self.x_velocity = 0
        self.absolute_vertical_velocity = absolute_vertical_velocity
        self.ball_out_of_area_callback = ball_out_of_area_callback

    def restart(self):
        super().restart()
        self.y_velocity = 0
        self.x_velocity = 0

    def move_to(self, x, y):
        self.x = x
        self.y = y

    def start_moving(self):
        self.y_velocity = -self.absolute_vertical_velocity
        self.x_velocity = 5

    def make_move(self):
        new_pos_x = self.x + self.x_velocity
        new_pos_y = self.y + self.y_velocity

        if new_pos_y >= HEIGHT and self.y_velocity > 0:
            self.ball_out_of_area_callback()
        elif new_pos_y < 0 and self.y_velocity < 0:
            self.top_wall_collision(new_pos_x)
        elif (new_pos_x + BALL_WIDTH) > WIDTH and self.x_velocity > 0:
            self.right_wall_collision(new_pos_y)
        elif new_pos_x < 0 and self.x_velocity < 0:
            self.left_wall_collision(new_pos_y)
        else:
            self.x = new_pos_x
            self.y = new_pos_y

    def top_wall_collision(self, new_pos_x):
        self.y_velocity = -self.y_velocity
        self.x = new_pos_x
        self.y = self.y_velocity - self.y

    def left_wall_collision(self, new_pos_y):
        self.x_velocity = -self.x_velocity
        self.y = new_pos_y
        self.x = self.x_velocity - self.x

    def right_wall_collision(self, new_pos_y):
        self.x_velocity = -self.x_velocity
        self.y = new_pos_y
        self.x = WIDTH - self.x + WIDTH + self.x_velocity - BALL_WIDTH

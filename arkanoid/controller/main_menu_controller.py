from assets import *
from controller.base_controller import Controller


class MainMenuController(Controller):

    def __init__(self, window, start_game_callback, exit_callback):
        super().__init__(window)
        self.selected_item = 0
        self.item_max_index = 1
        self.start_game_label = None
        self.exit_label = None
        self.start_game_callback = start_game_callback
        self.exit_callback = exit_callback

    def handle_keys(self, keys):
        if keys[pygame.K_UP] and self.selected_item > 0:
            self.selected_item -= 1
        if keys[pygame.K_DOWN] and self.selected_item < self.item_max_index:
            self.selected_item += 1
        if keys[pygame.K_RETURN]:
            if self.selected_item == 0:
                self.start_game_callback()
            elif self.selected_item == 1:
                self.exit_callback()

    def draw(self):
        logo_x_position = WIDTH / 2 - LOGO_RESOURCE.get_width() / 2
        self.window.blit(LOGO_RESOURCE, (logo_x_position, LOGO_Y_POSITION))
        if self.selected_item == 0:
            self.start_game_label = MENU_ITEM_FONT_SELECTED.render(START_GAME_LABEL, 1, MENU_ITEM_COLOR)
            self.exit_label = MENU_ITEM_FONT.render(EXIT_LABEL, 1, MENU_ITEM_COLOR)
        elif self.selected_item == 1:
            self.start_game_label = MENU_ITEM_FONT.render(START_GAME_LABEL, 1, MENU_ITEM_COLOR)
            self.exit_label = MENU_ITEM_FONT_SELECTED.render(EXIT_LABEL, 1, MENU_ITEM_COLOR)
        start_game_item_x = WIDTH / 2 - self.start_game_label.get_width() / 2
        start_game_item_y = LOGO_Y_POSITION + LOGO_RESOURCE.get_height() + MENU_ITEM_TOP_MARGIN
        self.window.blit(self.start_game_label, (start_game_item_x, start_game_item_y))
        exit_item_x = WIDTH / 2 - self.exit_label.get_width() / 2
        exit_item_y = start_game_item_y + self.start_game_label.get_height() + MENU_ITEM_TOP_MARGIN
        self.window.blit(self.exit_label, (exit_item_x, exit_item_y))
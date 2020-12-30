class Level:

    def __init__(self, bricks, number):
        self.bricks = bricks
        self.number = number
        self.max_score = compute_max_score(bricks)

    def draw(self, window):
        for brick in self.bricks:
            brick.draw(window)

def compute_max_score(bricks):
    max_score = 0
    for brick in bricks:
        max_score += brick.get_score()
    return max_score

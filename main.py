import pygame
import sys
import random

# ---------- SETUP ----------
pygame.init()

WIDTH, HEIGHT = 500, 300
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Higher or Lower")

clock = pygame.time.Clock()
FPS = 60

font_big = pygame.font.Font(None, 32)
font_small = pygame.font.Font(None, 22)

# ---------- COLORS ----------
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 200, 0)
RED = (200, 0, 0)
GRAY = (100, 100, 100)

# ---------- DATA ----------
people = [
    ("Taylor Swift", 45), ("Drake", 14), ("Kanye West", 11),
    ("Travis Scott", 12), ("The Weeknd", 20), ("Ariana Grande", 22),
    ("Billie Eilish", 18), ("Playboi Carti", 8), ("Lil Uzi Vert", 8),
    ("Bad Bunny", 28), ("Cristiano Ronaldo", 40), ("Lionel Messi", 35),
    ("IShowSpeed", 8), ("Zendaya", 17), ("Elon Musk", 50),
    ("Apple", 48), ("Minecraft", 36)
]

def get_new_pair(left):
    right = random.choice(people)
    while right == left:
        right = random.choice(people)
    return right

# ---------- BUTTONS ----------
higher_btn = pygame.Rect(280, 200, 170, 40)
lower_btn = pygame.Rect(50, 200, 170, 40)

# ---------- GAME STATE ----------
left = random.choice(people)
right = get_new_pair(left)
score = 0
result_text = ""

# ---------- GAME LOOP ----------
running = True
while running:
    clock.tick(FPS)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_pos = event.pos

            # HIGHER BUTTON
            if higher_btn.collidepoint(mouse_pos):
                if right[1] >= left[1]:
                    score += 1
                    result_text = "Correct!"
                else:
                    result_text = "Wrong!"
                    score = 0
                left = right
                right = get_new_pair(left)

            # LOWER BUTTON
            if lower_btn.collidepoint(mouse_pos):
                if right[1] <= left[1]:
                    score += 1
                    result_text = "Correct!"
                else:
                    result_text = "Wrong!"
                    score = 0
                left = right
                right = get_new_pair(left)

    # ---------- DRAW ----------
    screen.fill(BLACK)

    # Names
    left_text = font_big.render(left[0], True, WHITE)
    right_text = font_big.render(right[0], True, WHITE)
    screen.blit(left_text, (50, 60))
    screen.blit(right_text, (300, 60))

    # Labels
    vs_text = font_small.render("VS", True, GRAY)
    screen.blit(vs_text, (235, 70))

    # Buttons
    pygame.draw.rect(screen, GREEN, higher_btn)
    pygame.draw.rect(screen, RED, lower_btn)

    higher_text = font_small.render("Higher", True, WHITE)
    lower_text = font_small.render("Lower", True, WHITE)

    screen.blit(higher_text, (higher_btn.x + 55, higher_btn.y + 10))
    screen.blit(lower_text, (lower_btn.x + 60, lower_btn.y + 10))

    # Score
    score_text = font_small.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

    # Result
    result_render = font_small.render(result_text, True, WHITE)
    screen.blit(result_render, (200, 150))

    pygame.display.flip()

# ---------- EXIT ----------
pygame.quit()
sys.exit()

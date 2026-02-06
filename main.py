import pygame
import sys
import random

pygame.init()

WIDTH, HEIGHT = 500, 300
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Higher or Lower")

clock = pygame.time.Clock()
FPS = 60

font_big = pygame.font.Font(None, 32)
font_small = pygame.font.Font(None, 22)

WHITE = (255, 255, 255)
GREEN = (0, 200, 0)
RED = (200, 0, 0)
GRAY = (100, 100, 100)

# ---------- TEMP BACKGROUND (no image yet) ----------
background = pygame.Surface((WIDTH, HEIGHT))
background.fill((20, 20, 20))  # dark gray

# ---------- IMAGE LOADER ----------
def load_image(path):
    img = pygame.image.load(path)
    return pygame.transform.scale(img, (120, 120))

# ---------- PEOPLE LIST (MATCHES YOUR FILES) ----------
people = [
    ("Taylor Swift", 45, "png-clipart-taylor-swift-taylor-swift.png"),
    ("Ariana Grande", 22, "Ariana grande.jpg"),
    ("Bad Bunny", 28, "Bad Bunny.jpg"),
    ("Billie Eilish", 18, "Billie_Eilish_.jpg"),
    ("Cristiano Ronaldo", 40, "CR7.jpg"),
    ("Drake", 14, "drake.jpg"),
    ("Elon Musk", 50, "Elon Musk.jpg"),
    ("IShowSpeed", 8, "IshowSpeed.jpg"),
    ("Kanye West", 11, "kanye.jpg"),
    ("Lil Uzi Vert", 8, "Li_Uzi_Vert_(2018).jpg"),
    ("Lionel Messi", 35, "MESSI.jpg"),
    ("Minecraft", 36, "MINECRAFT.jpg"),
    ("Playboi Carti", 8, "Playboi Carti.jpg"),
    ("Travis Scott", 12, "travis scott.jpg"),
    ("The Weeknd", 20, "WeekEnd.jpg"),
    ("Zendaya", 17, "Zendaya.jpg"),
    ("Apple", 48, "APPLE LOGO.jpg")
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

            if higher_btn.collidepoint(mouse_pos):
                if right[1] >= left[1]:
                    score += 1
                    result_text = "Correct!"
                else:
                    result_text = "Wrong!"
                    score = 0
                left = right
                right = get_new_pair(left)

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
    screen.blit(background, (0, 0))

    left_text = font_big.render(left[0], True, WHITE)
    right_text = font_big.render(right[0], True, WHITE)
    screen.blit(left_text, (50, 30))
    screen.blit(right_text, (300, 30))

    left_img = load_image(left[2])
    right_img = load_image(right[2])
    screen.blit(left_img, (50, 80))
    screen.blit(right_img, (300, 80))

    vs_text = font_small.render("VS", True, GRAY)
    screen.blit(vs_text, (235, 90))

    pygame.draw.rect(screen, GREEN, higher_btn)
    pygame.draw.rect(screen, RED, lower_btn)

    higher_text = font_small.render("Higher", True, WHITE)
    lower_text = font_small.render("Lower", True, WHITE)

    screen.blit(higher_text, (higher_btn.x + 55, higher_btn.y + 10))
    screen.blit(lower_text, (lower_btn.x + 60, lower_btn.y + 10))

    score_text = font_small.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

    result_render = font_small.render(result_text, True, WHITE)
    screen.blit(result_render, (200, 150))

    pygame.display.flip()

pygame.quit()
sys.exit()

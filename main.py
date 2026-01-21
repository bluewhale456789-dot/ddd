import pygame
import sys

# --- Setup ---
pygame.init()
WIDTH, HEIGHT = 640, 480
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("My First Pygame")
clock = pygame.time.Clock()
FPS = 60

# Player (a simple rectangle)
player_size = 40
player_x = WIDTH // 2
player_y = HEIGHT // 2
player_speed = 5
player_color = (50, 200, 50)  # green

# --- Game loop ---
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Input
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] or keys[pygame.K_a]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
        player_x += player_speed
    if keys[pygame.K_UP] or keys[pygame.K_w]:
        player_y -= player_speed
    if keys[pygame.K_DOWN] or keys[pygame.K_s]:
        player_y += player_speed

    # Keep player on screen
    player_x = max(0, min(WIDTH - player_size, player_x))
    player_y = max(0, min(HEIGHT - player_size, player_y))

    # Draw
    screen.fill((30, 30, 40))  # background
    pygame.draw.rect(screen, player_color, (player_x, player_y, player_size, player_size))

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()
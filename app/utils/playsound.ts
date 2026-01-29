let click: HTMLAudioElement | null = null;

export function playClickSound() {
  if (!click) click = new Audio("/sounds/click.wav");
  click.currentTime = 0;
  click.play();
}

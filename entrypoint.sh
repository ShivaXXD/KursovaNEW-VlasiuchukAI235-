#!/bin/bash
set -e

# Запускаємо наш ініціалізаційний скрипт
/docker-init.sh

# Потім запускаємо Apache
exec apache2-foreground

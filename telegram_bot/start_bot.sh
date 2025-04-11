#!/bin/bash

# Проверка наличия переменной окружения TELEGRAM_BOT_TOKEN
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo "Ошибка: Переменная окружения TELEGRAM_BOT_TOKEN не установлена."
    echo "Установите ее перед запуском бота:"
    echo "export TELEGRAM_BOT_TOKEN='ваш_токен_бота'"
    exit 1
fi

# Запуск бота
echo "Запуск Telegram бота для игры-кликера..."
python telegram_bot.py
# Telegram Бот для Игры-Кликера

Этот бот предоставляет пользователям Telegram доступ к веб-игре Кликер через удобный интерфейс.

## Возможности

- Отправляет пользователям ссылку на игру
- Предоставляет информацию о функциях игры
- Отвечает на базовые команды
- Включает интерактивные кнопки для удобной навигации

## Команды

- `/start` - Начать использование бота и получить ссылку на игру
- `/play` - Получить прямую ссылку для игры
- `/help` - Показать список доступных команд
- `/about` - Информация о игре и разработчике

## Установка и запуск

### Требования

- Python 3.7 или выше
- Библиотека python-telegram-bot

### Установка зависимостей

```bash
pip install python-telegram-bot
```

### Настройка переменных окружения

Перед запуском бота необходимо установить переменную окружения с токеном:

```bash
export TELEGRAM_BOT_TOKEN="ваш_токен_бота"
```

### Запуск бота

```bash
python telegram_bot.py
```

## Использование

1. Найдите бота в Telegram по имени пользователя
2. Отправьте команду `/start`
3. Нажмите на кнопку "Играть", чтобы открыть игру

## Автоматический запуск

Для автоматического запуска бота на сервере можно использовать systemd, screen или PM2.

### Пример systemd сервиса

Создайте файл `/etc/systemd/system/telegram-clicker-bot.service`:

```
[Unit]
Description=Telegram Clicker Game Bot
After=network.target

[Service]
User=username
WorkingDirectory=/path/to/bot/directory
Environment="TELEGRAM_BOT_TOKEN=ваш_токен_бота"
ExecStart=/usr/bin/python3 /path/to/bot/directory/telegram_bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Затем запустите и активируйте сервис:

```bash
sudo systemctl enable telegram-clicker-bot.service
sudo systemctl start telegram-clicker-bot.service
```

## Расширение функциональности

Бот можно расширить, добавив дополнительные функции:

- Уведомления о новых обновлениях в игре
- Система рейтингов и достижений
- Интеграция с игровой экономикой
- Многоязычная поддержка
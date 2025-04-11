#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, ForceReply
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# URL вашей игры
GAME_URL = "https://ssoossTX.github.io/ssooss/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    await update.message.reply_html(
        f"Привет, {user.mention_html()}! 👋\n\n"
        f"Добро пожаловать в бот игры Кликер! Нажми на кнопку ниже, чтобы начать играть или продолжить свой прогресс.",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("🎮 Играть", url=GAME_URL)],
            [InlineKeyboardButton("ℹ️ Информация о игре", callback_data="info")]
        ])
    )

async def info_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик нажатия на кнопку 'Информация о игре'"""
    query = update.callback_query
    await query.answer()
    
    await query.message.reply_text(
        "🎮 *Кликер* - захватывающая игра, где вы можете:\n\n"
        "• Зарабатывать очки кликами\n"
        "• Улучшать свой автокликер\n"
        "• Отправляться в экспедиции\n"
        "• Открывать сундуки и получать награды\n"
        "• Коллекционировать скины и артефакты\n"
        "• Выполнять престиж для увеличения множителя очков\n\n"
        "Ваш прогресс сохраняется автоматически!",
        parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("🎮 Играть сейчас", url=GAME_URL)]
        ])
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    await update.message.reply_text(
        "Доступные команды:\n\n"
        "/start - Начать игру\n"
        "/play - Играть в кликер\n"
        "/help - Показать справку\n"
        "/about - О игре и разработчике",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("🎮 Играть сейчас", url=GAME_URL)]
        ])
    )

async def play_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /play"""
    await update.message.reply_text(
        "🎮 Нажмите на кнопку ниже, чтобы открыть игру:",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("🎮 Играть", url=GAME_URL)]
        ])
    )

async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /about"""
    await update.message.reply_text(
        "🎮 *Кликер* - игра с элементами idle и прогрессии.\n\n"
        "Разработчик: @ssoossTX\n\n"
        "Игра находится в активной разработке, следите за обновлениями!",
        parse_mode="Markdown"
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка обычных сообщений"""
    if update.message.text:
        await update.message.reply_text(
            "Привет! Используйте команду /start, чтобы начать игру или /help для получения справки.",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🎮 Играть", url=GAME_URL)]
            ])
        )

def main() -> None:
    """Запуск бота"""
    # Токен бота из переменных окружения
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        logger.error("Токен Telegram бота не найден! Убедитесь, что переменная TELEGRAM_BOT_TOKEN установлена.")
        return

    # Создаем приложение
    application = Application.builder().token(token).build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("play", play_command))
    application.add_handler(CommandHandler("about", about_command))
    
    # Обработчик для кнопок
    application.add_handler(CallbackQueryHandler(info_callback, pattern="^info$"))
    
    # Обработчик для обычных сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Запускаем бота
    logger.info("Telegram бот запущен")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
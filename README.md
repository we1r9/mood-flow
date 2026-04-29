# Mood Flow

[Веб-приложение](https://we1r9.github.io/mood-flow/), которое определяет настроение пользователя и создает на его основе персональную карточку с подходящим треком.

## О проекте

Пользователь выбирает одно из шести настроений, приложение определяет его местоположение и текущую погоду, после чего генерирует карточку с подходящим треком и сообщением.

Можно использовать утром, чтобы начать день с музыкой под подходящий вайб ᶻ 𝗓 𐰁 .ᐟ

Личный проект для практики HTML, CSS и JavaScript.

## Демо

![Главный экран](https://github.com/user-attachments/assets/53f44e68-ca0b-4f7d-9d38-9a5f76f05eb0)
<p align="center">Главный экран – выбор настроения</p>

![Карточка результата](https://github.com/user-attachments/assets/33cfc4ee-9f48-4144-a0f4-f2f922444f93)
<p align="center">Пример созданной карточки</p>

## Стек

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenStreetMap](https://img.shields.io/badge/Nominatim-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-00BFFF?style=for-the-badge&logo=cloudflare&logoColor=white)

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/we1r9/mood-flow.git
cd mood-flow
```

2. Откройте `index.html` через [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## Технические подробности

- Приложение проверяет разрешение на геолокацию через Permissions API перед запросом координат. Для определения города используется [Nominatim](https://nominatim.org/) от OpenStreetMap.

- Погода запрашивается у [Open-Meteo API](https://open-meteo.com/). Код погоды переводится в текстовое описание через локальный справочник.

## Планы

- **Spotify API** – рекомендации на основе реальных плейлистов пользователя
- **Шаринг** – возможность делиться карточками в социальных сетях
- **История карточек** – личный кабинет с карточками прошлых дней

## Контакты

- Telegram: [@we1r9](https://t.me/we1r9)
- Email: provatorovandrew@gmail.com
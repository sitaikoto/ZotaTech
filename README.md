# Тестовое задание ZotaTech

Проект представляет собой реализацию тестового задания с формой регистрации и страницей профиля.

## Использованные технологии

- React
- React Router DOM (для маршрутизации)
- Zustand (для управления состоянием)
- React Input Mask (для маски ввода телефона)

## Реализованные страницы

1. **Страница регистрации**:
   - Форма с валидацией полей
   - Маска ввода телефона
   - Сохранение данных в localStorage

2. **Страница профиля**:
   - Отображение данных пользователя
   - Защищенный маршрут (доступен только после регистрации)
   - Возможность выхода из профиля

## Инструкция по сборке и запуску

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm start
```

### Сборка для продакшн

```bash
npm run build
```

## Требования

- Node.js 14.x или выше
- npm 6.x или выше

# React subscription 

Форма подписки на email, реализованная на React с использованием React Hook Form, axios и BEM-стилизации.

## Особенности

- Валидация email (обязательное поле, корректный email)
- Асинхронная отправка email через API (`/api/subscribe`) с помощью axios и try/catch
- Сообщения об успехе и ошибке
- Стилизация по методологии BEM, сброс стилей, адаптивный дизайн
- Лёгкий рефакторинг: логика формы вынесена в отдельный компонент

3. Откройте в браузере: [http://localhost:5173](http://localhost:5173)

## Структура

- `src/SubscriptionForm.tsx` — компонент формы подписки
- `src/SubscriptionForm.css` — стили формы (BEM + reset)
- `src/App.tsx` — подключение формы в приложение

## API

POST `/api/subscribe`

```json
{
  "email": "user@example.com"
}
```

**Ответ:**
- 200 OK — успешная подписка
- 4xx/5xx — ошибка, сообщение выводится под формой

```

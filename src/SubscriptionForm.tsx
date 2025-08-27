import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

// Интерфейс для формы подписки: ожидается только email
export interface ISubscriptionFormInputs {
  email: string;
}

// ==== Styled Components ====
// Основной контейнер секции подписки
const Subscription = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

// Контейнер для содержимого и изображения
const Subscription__container = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f8fa;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  max-height: 320px;
  min-height: 200px;
  height: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
    max-width: 95vw;
    min-height: unset;
  }
`;

// Контентная часть (форма и текст)
const Subscription__content = styled.div`
  flex: 1 1 60%;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 700px) {
    padding: 24px 16px;
  }
`;

// Блок с изображением справа
const Subscription__image = styled.div`
  flex: 0 0 200px;
  width: 200px;
  height: 100%;
  margin-top: 50px;
  margin-right: 32px;
  border-radius: 0 16px 16px 0;
  min-height: 250px;
  background: url('https://cambridge.ua/app/themes/sage/resources/assets/images/newImages/shortcodes/waiting-letter/guide-kids-x3.webp')
    center/cover no-repeat;

  @media (max-width: 700px) {
    width: 100%;
    min-height: 160px;
    height: 160px;
    flex: none;
  }
`;

// Заголовок формы
const Subscription__title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 10px;
  color: #d63384;
`;

// Подзаголовок формы
const Subscription__subtitle = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #616161;
  margin-bottom: 24px;
`;

// Стилизация формы
const Subscription__form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Стилизация поля ввода email
const Subscription__input = styled.input`
  padding: 12px 16px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #a14669;
  }
  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;

// Кнопка отправки формы
const Subscription__button = styled.button`
  padding: 12px 16px;
  background: #a14669;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }
`;

// Сообщение об ошибке
const Subscription__error = styled.span`
  color: #e53935;
  font-size: 0.95rem;
  margin-top: 4px;
`;

// ==== Modal ====
// Оверлей модального окна
const Modal__overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// Контент модального окна
const Modal__content = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.2);
`;

// Заголовок модального окна
const Modal__title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #388e3c;
  margin-bottom: 16px;
`;

// Текст модального окна
const Modal__text = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 24px;
`;

// Кнопка закрытия модального окна
const Modal__button = styled.button`
  padding: 10px 20px;
  background: #a14669;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

// Внутренний компонент формы подписки
const SubscriptionFormInner: React.FC = () => {
  // Инициализация react-hook-form
  const {
    register, // регистрация полей формы
    handleSubmit, // обработчик отправки
    formState: { errors, isSubmitting }, // ошибки и статус отправки
    reset, // сброс формы
  } = useForm<ISubscriptionFormInputs>();

  // Локальные состояния для статуса, сообщения и модального окна
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<ISubscriptionFormInputs> = async (data) => {
    setStatus('idle');
    setMessage('');
    try {
      // Отправка email на тестовый API
      await axios.post('https://reqres.in/api/users', { email: data.email });
      setStatus('success');
      setMessage('Дякуємо за підписку!');
      reset(); // сбросить поля формы
      setModalOpen(true); // открыть модальное окно
    } catch (error: unknown) {
      setStatus('error');
      // Сообщение об ошибке (если есть, иначе дефолтное)
      const msg = error || 'Щось пішло не так. Спробуйте ще раз.';
      setMessage(msg as string);
    }
  };

  // JSX разметка формы
  return (
    <Subscription__content>
      {/* Заголовок и подзаголовок */}
      <Subscription__title>Як перевірити англійську?</Subscription__title>
      <Subscription__subtitle>Отримайте гайд</Subscription__subtitle>
      {/* Форма подписки */}
      <Subscription__form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Subscription__input
          type="email"
          placeholder="Email"
          autoComplete="email"
          // Валидация email через react-hook-form
          {...register('email', {
            required: 'Введіть email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введіть коректний email',
            },
          })}
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
        />
        {/* Кнопка отправки */}
        <Subscription__button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Відправка...' : 'Чекаю гайд!'}
        </Subscription__button>
      </Subscription__form>
      {/* Сообщение об ошибке валидации */}
      {errors.email && <Subscription__error>{errors.email.message}</Subscription__error>}
      {/* Сообщение об ошибке отправки */}
      {status === 'error' && <Subscription__error>{message}</Subscription__error>}

      {/* Модальное окно успеха */}
      {isModalOpen && (
        <Modal__overlay>
          <Modal__content>
            <Modal__title>Успіх!</Modal__title>
            <Modal__text>{message}</Modal__text>
            <Modal__button onClick={() => setModalOpen(false)}>Закрити</Modal__button>
          </Modal__content>
        </Modal__overlay>
      )}
    </Subscription__content>
  );
};

// Внешний компонент формы подписки (обертка)
const SubscriptionForm: React.FC = () => (
  <Subscription>
    <Subscription__container>
      <SubscriptionFormInner />
      {/* Блок с иллюстрацией */}
      <Subscription__image aria-label="Ілюстрація підписки" />
    </Subscription__container>
  </Subscription>
);

export default SubscriptionForm;

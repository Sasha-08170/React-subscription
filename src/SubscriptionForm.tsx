import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

export interface ISubscriptionFormInputs {
  email: string;
}

// Styled Components по БЭМ и адаптив
const Subscription = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

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

const Subscription__title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 10px;
  color: #d63384;
`;

const Subscription__subtitle = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #616161;
  margin-bottom: 24px;
`;

const Subscription__form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

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

const Subscription__error = styled.span`
  color: #e53935;
  font-size: 0.95rem;
  margin-top: 4px;
`;

const Subscription__success = styled.div`
  color: #388e3c;
  font-size: 1rem;
  margin-top: 8px;
`;

const SubscriptionFormInner: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ISubscriptionFormInputs>();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<ISubscriptionFormInputs> = async (data) => {
    setStatus('idle');
    setMessage('');
    try {
      await axios.post('/api/subscribe', { email: data.email });
      setStatus('success');
      setMessage('Дякуємо за підписку!');
      reset();
    } catch (error: unknown) {
      setStatus('error');
      const msg = error || 'Щось пішло не так. Спробуйте ще раз.';
      setMessage(msg as string);
    }
  };

  return (
    <Subscription__content>
      <Subscription__title>Як перевірити англійську?</Subscription__title>
      <Subscription__subtitle>Отримайте гайд</Subscription__subtitle>
      <Subscription__form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Subscription__input
          type="email"
          placeholder="Email"
          autoComplete="email"
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
        <Subscription__button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Відправка...' : 'Чекаю гайд!'}
        </Subscription__button>
      </Subscription__form>
      {errors.email && <Subscription__error>{errors.email.message}</Subscription__error>}
      {status === 'success' && <Subscription__success>{message}</Subscription__success>}
      {status === 'error' && <Subscription__error>{message}</Subscription__error>}
    </Subscription__content>
  );
};

const SubscriptionForm: React.FC = () => (
  <Subscription>
    <Subscription__container>
      <SubscriptionFormInner />
      <Subscription__image aria-label="Ілюстрація підписки" />
    </Subscription__container>
  </Subscription>
);

export default SubscriptionForm;

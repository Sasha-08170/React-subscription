import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import './SubscriptionForm.css';

export interface ISubscriptionFormInputs {
    email: string;
}

const SubscriptionFormInner: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISubscriptionFormInputs>();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const onSubmit: SubmitHandler<ISubscriptionFormInputs> = async (data) => {
        setStatus('idle');
        setMessage('');
        try {
            await axios.post('/api/subscribe', { email: data.email });
            setStatus('success');
            setMessage('Thank you for subscribing!');
            reset();
        } catch (error: any) {
            setStatus('error');
            const msg = error?.response?.data?.message || 'Something went wrong. Please try again.';
            setMessage(msg);
            alert(msg);
        }
    };

    return (
        <>
            <h2 className="subscription__title">Subscribe To Our Emails</h2>
            <p className="subscription__subtitle">Be the first to know about new collections and exclusive offers.</p>
            <form className="subscription__form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="subscription__input"
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email',
                        },
                    })}
                />
                <button className="subscription__button" type="submit">Subscribe</button>
            </form>
            {errors.email && <span className="subscription__error">{errors.email.message}</span>}
            {status === 'success' && <div className="subscription__success">{message}</div>}
            {status === 'error' && <div className="subscription__error">{message}</div>}
        </>
    );
};

const SubscriptionForm: React.FC = () => (
    <div className="subscription">
        <div className="subscription__overlay">
            <SubscriptionFormInner />
        </div>
    </div>
);

export default SubscriptionForm; 